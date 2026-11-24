// Uploads tightly-cropped REBIRTH 2026 product photos (model fills the frame) and
// swaps them into the matching products. Only touches styleCode BHC-RB26*.
// Cropped files are named <styleCode>_<index>.jpg, index = position in the product's current images.
// node --env-file=.env scripts/upload-cropped-rebirth-2026.mjs <croppedDir> <listJson>
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const [dir, listJson] = process.argv.slice(2)
const BUCKET = process.env.AWS_S3_BUCKET_NAME, REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

await mongoose.connect(process.env.MONGODB_URI)
const products = mongoose.connection.db.collection('products')
const list = JSON.parse(fs.readFileSync(listJson, 'utf8')) // [{code, images:[url,...]}] snapshot used for cropping

const current = await products.find({ styleCode: /^BHC-RB26/ }).toArray()
fs.writeFileSync('scripts/rebirth-precrop-backup.json', JSON.stringify(current, null, 1))
console.log('backed up', current.length)

async function up(file) {
  const key = `bora-honeys/products/${randomUUID()}-${path.basename(file)}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: 'image/jpeg', CacheControl: 'public, max-age=31536000' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
}

for (const p of list) {
  const cur = current.find(c => c.styleCode === p.code)
  if (!cur) continue
  // keep image order; fall back to the existing image if no cropped file (e.g. placeholders)
  const images = []
  for (let i = 0; i < cur.images.length; i++) {
    const f = path.join(dir, `${p.code}_${String(i).padStart(2, '0')}.jpg`)
    images.push(fs.existsSync(f) && cur.images[i].url === p.images[i] ? await up(f) : cur.images[i])
  }
  const r = await products.updateOne({ styleCode: p.code }, { $set: { images, updatedAt: new Date() } })
  console.log(p.code, images.length, 'imgs', r.modifiedCount)
}
process.exit(0)
