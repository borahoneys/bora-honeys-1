// Swaps every homepage / collection video for a web-optimised copy plus a poster frame.
// <dir> holds <originalBasename>.mp4 and <originalBasename>.poster.jpg for each current video
// (720x1280 H.264, faststart, no audio). Originals stay in S3, so this is reversible from the backup.
// node --env-file=.env.local scripts/replace-videos-with-optimized.mjs <dir> [--dry]
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const dir = process.argv[2]
const DRY = process.argv.includes('--dry')
const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'bora-honey-bucket-737759272707-ap-southeast-2-an'
const REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

const base = (url) => path.basename(new URL(url).pathname).replace(/\.[^.]+$/, '')

async function put(file, folder, type) {
  const key = `bora-honeys/${folder}/${randomUUID()}${path.extname(file)}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: type, CacheControl: 'public, max-age=31536000, immutable' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, key }
}

async function optimised(oldUrl, folder) {
  const b = base(oldUrl)
  const mp4 = path.join(dir, `${b}.mp4`), poster = path.join(dir, `${b}.poster.jpg`)
  if (!fs.existsSync(mp4) || !fs.existsSync(poster)) throw new Error(`missing optimised files for ${b}`)
  if (DRY) return { url: '(new)', publicId: '(new)', poster: '(new)' }
  const v = await put(mp4, folder, 'video/mp4')
  const p = await put(poster, folder, 'image/jpeg')
  return { url: v.url, publicId: v.key, poster: p.url }
}

await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const homepage = db.collection('homepageconfigs')
const collections = db.collection('collections')

const cfg = await homepage.findOne({})
const cols = await collections.find({ 'video.url': { $exists: true, $ne: null } }).toArray()

if (!DRY) {
  const file = `scripts/video-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  fs.writeFileSync(file, JSON.stringify({ homepage: cfg, collections: cols }, null, 1))
  console.log('backup ->', file)
}

for (const [i, s] of cfg.sections.entries()) {
  if (s.type !== 'video' || !s.video?.url) continue
  const v = await optimised(s.video.url, 'homepage')
  console.log(`homepage section ${i}: ${base(s.video.url)} -> ${v.url}`)
  if (!DRY) await homepage.updateOne({ _id: cfg._id, 'sections._id': s._id }, { $set: { 'sections.$.video': v, updatedAt: new Date() } })
}

for (const c of cols) {
  if (!c.video?.url) continue
  const v = await optimised(c.video.url, 'collections')
  console.log(`collection ${c.slug}: ${base(c.video.url)} -> ${v.url}`)
  if (!DRY) await collections.updateOne({ _id: c._id }, { $set: { video: v, updatedAt: new Date() } })
}
console.log(DRY ? 'dry run, nothing changed' : 'done')
process.exit(0)
