# images/ (local drop folder — gitignored)

Site media does not live in git. It lives in the Neon object-storage bucket `images`.

1. Drop files here (subfolders are fine, e.g. `projects/foo.webp`). The object key is the path relative to this folder.
2. Run `npm run media:upload`. New or changed files are uploaded (unchanged ones are skipped by ETag), and `content/media-manifest.json` is rebuilt from the bucket.
3. Objects are public on the site unless they are listed in `scripts/media-visibility.json` → `private`.

Encoded demo videos live in `media-staging/` (also gitignored) and sync the same way.
After a successful upload, files whose bucket copy matches (same checksum) are deleted from here automatically, so this folder only ever holds files that haven't been uploaded yet. Use `npm run media:upload -- --keep` to keep local copies. The bucket is the source of truth.
