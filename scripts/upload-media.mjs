#!/usr/bin/env node
// Sync local media to Neon object storage (S3-compatible) and rebuild
// content/media-manifest.json from what is actually in the bucket.
//
//   npm run media:upload              upload new/changed files + rebuild manifest
//   npm run media:upload -- --dry-run show what would be uploaded, write nothing
//   npm run media:upload -- --keep    don't delete local copies afterwards
//
// After a successful sync, every local file whose bucket copy has the same
// checksum (ETag) is deleted, so images/ and media-staging/ only ever hold
// files that haven't reached the bucket yet. The bucket is the source of truth.
//
// Sources (both gitignored):
//   images/         key = path relative to images/        e.g. projects/foo.webp
//   media-staging/  key = path relative to media-staging/ e.g. work/speech-ai/demo.mp4
//
// Visibility: scripts/media-visibility.json lists private keys or prefixes
// (ending in "/"). Everything else is marked public in the manifest.
import 'dotenv/config';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createReadStream, existsSync, mkdtempSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { imageSize } from 'image-size';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = [path.join(ROOT, 'images'), path.join(ROOT, 'media-staging')];
const MANIFEST = path.join(ROOT, 'content', 'media-manifest.json');
const VISIBILITY = path.join(ROOT, 'scripts', 'media-visibility.json');
const MULTIPART_THRESHOLD = 8 * 1024 * 1024;
const PART_SIZE = 8 * 1024 * 1024;
const CACHE_CONTROL = 'public, max-age=31536000, immutable';
const DRY_RUN = process.argv.includes('--dry-run');
const KEEP_LOCAL = process.argv.includes('--keep');

const env = (a, b, fallback) => process.env[a] || process.env[b] || fallback;
const config = {
  endpoint: env('NEON_S3_ENDPOINT', 'AWS_ENDPOINT_URL_S3'),
  accessKeyId: env('NEON_S3_ACCESS_KEY_ID', 'AWS_ACCESS_KEY_ID'),
  secretAccessKey: env('NEON_S3_SECRET_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY'),
  region: env('NEON_S3_REGION', 'AWS_REGION', 'us-east-1'),
  bucket: process.env.NEON_S3_BUCKET || 'images',
};
for (const k of ['endpoint', 'accessKeyId', 'secretAccessKey']) {
  if (!config[k]) {
    console.error(`Missing S3 credential: ${k} (set NEON_S3_* or AWS_* in .env)`);
    process.exit(1);
  }
}

const s3 = new S3Client({
  endpoint: config.endpoint,
  region: config.region,
  forcePathStyle: true,
  credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

const TYPES = {
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.avif': 'image/avif',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.pdf': 'application/pdf', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2', '.woff': 'font/woff',
};
const contentTypeOf = (key) => TYPES[path.extname(key).toLowerCase()] || 'application/octet-stream';
const isImage = (ct) => ct.startsWith('image/');
const isVideo = (ct) => ct.startsWith('video/');
const cleanEtag = (e) => (e || '').replace(/"/g, '');
const SKIP_NAMES = new Set(['README.md', '.gitkeep', '.DS_Store', 'Thumbs.db', 'desktop.ini']);

function walk(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else if (entry.isFile() && !SKIP_NAMES.has(entry.name)) {
      out.push({ file: full, key: path.relative(base, full).split(path.sep).join('/') });
    }
  }
  return out;
}

// ETag S3 would report for this file: plain MD5, or the multipart form
// md5(concat(partMd5s))-N when uploaded in PART_SIZE parts.
function expectedEtag(file, size) {
  const buf = readFileSync(file);
  if (size <= MULTIPART_THRESHOLD) return createHash('md5').update(buf).digest('hex');
  const parts = [];
  for (let off = 0; off < size; off += PART_SIZE) {
    parts.push(createHash('md5').update(buf.subarray(off, off + PART_SIZE)).digest());
  }
  return `${createHash('md5').update(Buffer.concat(parts)).digest('hex')}-${parts.length}`;
}

async function remoteEtag(key) {
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }));
    return cleanEtag(head.ETag);
  } catch (err) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === 'NotFound') return null;
    throw err;
  }
}

async function put(file, key, size) {
  const params = { Bucket: config.bucket, Key: key, ContentType: contentTypeOf(key), CacheControl: CACHE_CONTROL };
  if (size > MULTIPART_THRESHOLD) {
    await new Upload({ client: s3, params: { ...params, Body: createReadStream(file) }, partSize: PART_SIZE, queueSize: 4 }).done();
  } else {
    await s3.send(new PutObjectCommand({ ...params, Body: readFileSync(file), ContentLength: size }));
  }
}

function dimensions(ct, file) {
  try {
    if (isImage(ct)) {
      const { width, height } = imageSize(readFileSync(file));
      return width && height ? { width, height } : {};
    }
    if (isVideo(ct)) {
      const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file], { encoding: 'utf8' });
      const [width, height] = out.trim().split('x').map(Number);
      return width && height ? { width, height } : {};
    }
  } catch (err) {
    console.warn(`  ! could not read dimensions for ${path.basename(file)}: ${err.message}`);
  }
  return {};
}

async function download(key, dest) {
  const res = await s3.send(new GetObjectCommand({ Bucket: config.bucket, Key: key }));
  writeFileSync(dest, Buffer.from(await res.Body.transformToByteArray()));
}

async function listBucket() {
  const objects = [];
  let ContinuationToken;
  do {
    const res = await s3.send(new ListObjectsV2Command({ Bucket: config.bucket, ContinuationToken }));
    objects.push(...(res.Contents || []));
    ContinuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (ContinuationToken);
  return objects;
}

function removeEmptyDirs(dir, root) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name), root);
  }
  if (dir !== root && readdirSync(dir).length === 0) rmdirSync(dir);
}

async function main() {
  console.log(`${DRY_RUN ? '[dry run] ' : ''}Syncing media to bucket "${config.bucket}"`);
  const files = SOURCES.flatMap((dir) => walk(dir));
  const localByKey = new Map();
  let uploaded = 0, skipped = 0, uploadedBytes = 0;

  for (const { file, key } of files) {
    if (localByKey.has(key)) console.warn(`  ! duplicate key ${key} (${file}) — later file wins`);
    localByKey.set(key, file);
    const size = statSync(file).size;
    const remote = await remoteEtag(key);
    if (remote && remote === expectedEtag(file, size)) {
      skipped++;
      continue;
    }
    console.log(`  ${DRY_RUN ? 'would upload' : 'upload'} ${key} (${(size / 1024).toFixed(0)} KB)`);
    if (!DRY_RUN) await put(file, key, size);
    uploaded++;
    uploadedBytes += size;
  }

  if (DRY_RUN) {
    console.log(`\n${uploaded} to upload (${(uploadedBytes / 1e6).toFixed(2)} MB), ${skipped} unchanged. Manifest not written.`);
    return;
  }

  // Rebuild the manifest from the bucket so it reflects reality.
  const visibility = existsSync(VISIBILITY) ? JSON.parse(readFileSync(VISIBILITY, 'utf8')) : { private: [] };
  const privateRules = visibility.private || [];
  const isPrivate = (key) => privateRules.some((r) => (r.endsWith('/') ? key.startsWith(r) : key === r));
  const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')).objects || {} : {};

  const listed = (await listBucket()).sort((a, b) => (a.Key < b.Key ? -1 : a.Key > b.Key ? 1 : 0));
  const tmp = mkdtempSync(path.join(tmpdir(), 'media-'));
  const objects = {};
  let totalBytes = 0;
  try {
    for (const obj of listed) {
      const key = obj.Key;
      const etag = cleanEtag(obj.ETag);
      const contentType = contentTypeOf(key);
      const entry = { contentType, bytes: obj.Size, public: !isPrivate(key), etag };
      if (isImage(contentType) || isVideo(contentType)) {
        const prev = previous[key];
        let dims = prev && prev.etag === etag && prev.width ? { width: prev.width, height: prev.height } : null;
        if (!dims) {
          let file = localByKey.get(key);
          if (!file) {
            file = path.join(tmp, `obj${path.extname(key)}`);
            await download(key, file);
          }
          dims = dimensions(contentType, file);
        }
        Object.assign(entry, dims);
      }
      objects[key] = Object.fromEntries(Object.entries(entry).sort(([a], [b]) => a.localeCompare(b)));
      totalBytes += obj.Size;
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  writeFileSync(MANIFEST, `${JSON.stringify({ bucket: config.bucket, objects }, null, 2)}\n`);

  // Delete local copies that are verifiably in the bucket (same ETag).
  let removed = 0;
  const kept = [];
  if (!KEEP_LOCAL) {
    for (const [key, file] of localByKey) {
      const remote = objects[key];
      if (remote && remote.etag === expectedEtag(file, statSync(file).size)) {
        unlinkSync(file);
        removed++;
      } else {
        kept.push(key);
      }
    }
    for (const dir of SOURCES) removeEmptyDirs(dir, dir);
  }

  const publicCount = Object.values(objects).filter((o) => o.public).length;
  console.log(
    `\nUploaded ${uploaded} (${(uploadedBytes / 1e6).toFixed(2)} MB), skipped ${skipped} unchanged.` +
      `\nBucket: ${listed.length} objects, ${(totalBytes / 1e6).toFixed(2)} MB total, ${publicCount} public.` +
      `\nWrote ${path.relative(ROOT, MANIFEST)}` +
      (KEEP_LOCAL ? '\nKept local copies (--keep).' : `\nRemoved ${removed} local file(s) now safely in the bucket.`) +
      (kept.length ? `\nNOT removed (bucket copy didn't match): ${kept.join(', ')}` : '')
  );
}

main().catch((err) => {
  console.error(`media:upload failed: ${err.name}: ${err.message}`);
  process.exit(1);
});
