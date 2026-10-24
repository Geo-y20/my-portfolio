import 'server-only';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Neon object storage (S3-compatible). Production uses NEON_S3_* because
// Vercel reserves the AWS_* names; locally the AWS_* names from .env work too.
// Never log these values.
const env = (...names) => names.map((n) => process.env[n]).find(Boolean);

export const BUCKET = process.env.NEON_S3_BUCKET || 'images';

let client;
function getClient() {
  if (client) return client;
  const endpoint = env('NEON_S3_ENDPOINT', 'AWS_ENDPOINT_URL_S3');
  const accessKeyId = env('NEON_S3_ACCESS_KEY_ID', 'AWS_ACCESS_KEY_ID');
  const secretAccessKey = env('NEON_S3_SECRET_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY');
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('Object storage is not configured (set NEON_S3_ENDPOINT, NEON_S3_ACCESS_KEY_ID, NEON_S3_SECRET_ACCESS_KEY)');
  }
  client = new S3Client({
    endpoint,
    region: env('NEON_S3_REGION', 'AWS_REGION') || 'us-east-1',
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });
  return client;
}

// Signatures are pinned to the start of the current 6-hour window and valid
// for 12 hours, so every request in a window gets the same URL (cacheable by
// browsers and the CDN) and a cached redirect always has ≥ 1h of validity left.
const WINDOW_S = 6 * 60 * 60;
const EXPIRES_S = 12 * 60 * 60;
const SAFETY_S = 60 * 60;

export async function signedGetUrl(key, now = Date.now()) {
  const windowStart = Math.floor(now / 1000 / WINDOW_S) * WINDOW_S;
  const url = await getSignedUrl(getClient(), new GetObjectCommand({ Bucket: BUCKET, Key: key }), {
    expiresIn: EXPIRES_S,
    signingDate: new Date(windowStart * 1000),
  });
  const maxAge = Math.max(60, Math.floor(windowStart + EXPIRES_S - SAFETY_S - now / 1000));
  return { url, maxAge };
}
