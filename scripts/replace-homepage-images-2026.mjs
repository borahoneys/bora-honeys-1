// Replaces the desktop + phone photos of homepage image sections.
// Backs up the current homepage config first; videos and other fields are untouched.
// node --env-file=.env.local scripts/replace-homepage-images-2026.mjs <dir> <sectionId>=<name> ...
//   uses <dir>/<name>-desktop.webp and <dir>/<name>-mobile.webp
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const [dir, ...pairs] = process.argv.slice(2)
if (!dir || pairs.length === 0) throw new Error('usage: <dir> <sectionId>=<name> ...')

const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'bora-honey-bucket-737759272707-ap-southeast-2-an'
const REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

async function upload(file) {
  const key = `bora-honeys/homepage/${randomUUID()}.webp`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: 'image/webp', CacheControl: 'public, max-age=31536000' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
}

await mongoose.connect(process.env.MONGODB_URI)
const col = mongoose.connection.db.collection('homepageconfigs')
const cfg = await col.findOne({})

const backup = `scripts/homepage-config-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
fs.writeFileSync(backup, JSON.stringify(cfg, null, 1))
console.log('backup ->', backup)

for (const pair of pairs) {
  const [sectionId, name] = pair.split('=')
  const section = cfg.sections.find((s) => String(s._id) === sectionId)
  if (!section || section.type !== 'image') throw new Error(`no image section ${sectionId}`)
  const desktopImage = await upload(path.join(dir, `${name}-desktop.webp`))
  const mobileImage = await upload(path.join(dir, `${name}-mobile.webp`))
  await col.updateOne(
    { _id: cfg._id, 'sections._id': section._id },
    { $set: { 'sections.$.desktopImage': desktopImage, 'sections.$.mobileImage': mobileImage, updatedAt: new Date() } }
  )
  console.log(`section ${sectionId} (order ${section.order}) -> ${name}: ${desktopImage.publicId}, ${mobileImage.publicId}`)
}
process.exit(0)
