// Replaces the phone (mobile) image of one homepage image section.
// Backs up the current homepage config first; nothing else is changed.
// node --env-file=.env.local scripts/replace-homepage-mobile-image.mjs <sectionId> <image.jpg>
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const [sectionId, file] = process.argv.slice(2)
if (!sectionId || !file) throw new Error('usage: <sectionId> <image file>')

const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'bora-honey-bucket-737759272707-ap-southeast-2-an'
const REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

await mongoose.connect(process.env.MONGODB_URI)
const col = mongoose.connection.db.collection('homepageconfigs')
const cfg = await col.findOne({})

const idx = cfg.sections.findIndex((s) => String(s._id) === sectionId)
if (idx < 0 || cfg.sections[idx].type !== 'image') throw new Error(`no image section ${sectionId}`)

const backup = `scripts/homepage-config-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
fs.writeFileSync(backup, JSON.stringify(cfg, null, 1))
console.log('backup ->', backup)

const ext = path.extname(file).toLowerCase()
const type = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' }[ext]
if (!type) throw new Error(`unsupported image type ${ext}`)

const key = `bora-honeys/homepage/${randomUUID()}${ext}`
await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: type, CacheControl: 'public, max-age=31536000' }))

const old = cfg.sections[idx].mobileImage?.url
await col.updateOne(
  { _id: cfg._id, 'sections._id': cfg.sections[idx]._id },
  { $set: { 'sections.$.mobileImage': { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }, updatedAt: new Date() } }
)
console.log(`section ${idx} mobile image: ${old} -> ${key}`)
process.exit(0)
