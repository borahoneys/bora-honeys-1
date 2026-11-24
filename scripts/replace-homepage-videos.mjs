// Replaces the video in each of the homepage's video sections (in order) with new files.
// Image sections and section order/buttons are untouched.
// node --env-file=.env scripts/replace-homepage-videos.mjs a.mp4 b.mp4 c.mp4
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const files = process.argv.slice(2)
const BUCKET = process.env.AWS_S3_BUCKET_NAME, REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

await mongoose.connect(process.env.MONGODB_URI)
const col = mongoose.connection.db.collection('homepageconfigs')
const cfg = await col.findOne({})
fs.writeFileSync('scripts/homepage-config-backup.json', JSON.stringify(cfg, null, 1))

const idx = cfg.sections.map((s, i) => (s.type === 'video' ? i : -1)).filter(i => i >= 0)
if (idx.length !== files.length) throw new Error(`${idx.length} video sections but ${files.length} files`)

for (let k = 0; k < idx.length; k++) {
  const key = `bora-honeys/homepage/${randomUUID()}${path.extname(files[k])}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(files[k]), ContentType: 'video/mp4', CacheControl: 'public, max-age=31536000' }))
  cfg.sections[idx[k]].video = { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
  console.log('section', idx[k], '->', key)
}
await col.updateOne({ _id: cfg._id }, { $set: { sections: cfg.sections, updatedAt: new Date() } })
console.log('done')
process.exit(0)
