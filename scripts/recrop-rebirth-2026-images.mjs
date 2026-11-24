// Re-uploads REBIRTH 2026 product images re-cropped with extra headroom (the first crop clipped heads).
// Existing products BHC-RB26001..12: files <croppedDir>/<styleCode>_<index>.jpg (index = image position).
// New-shoot products BHC-RB26013..20: files <newDir>/069A####.jpg in the group order used at creation.
// Images are replaced in place (same order/count). Only styleCode BHC-RB26* is touched.
// node --env-file=.env scripts/recrop-rebirth-2026-images.mjs <croppedDir> <newDir>
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const [croppedDir, newDir] = process.argv.slice(2)
const BUCKET = process.env.AWS_S3_BUCKET_NAME, REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })
const r = (a) => a.map(n => `069A${n}.jpg`)

const NEW = {
  'BHC-RB26013': r([6754, 6770, 6806]),
  'BHC-RB26014': r([6848, 6849, 6978]),
  'BHC-RB26015': r([6998, 7013, 7017, 7019, 7022, 7030, 7034, 7036, 7040]),
  'BHC-RB26016': r([7113, 7127, 7130, 7132, 7136, 7150, 7152, 7187]),
  'BHC-RB26017': r([7284, 7286, 7290, 7299, 7303, 7312, 7319, 7328, 7332]),
  'BHC-RB26018': r([7366, 7377, 7392, 7413, 7443, 7448, 7453, 7468, 7475]),
  'BHC-RB26019': r([7477, 7478, 7503, 7509, 7516, 7524, 7530, 7540]),
  'BHC-RB26020': r([7565, 7576, 7578, 7587, 7596, 7608, 7616]),
}

async function up(file) {
  const key = `bora-honeys/products/${randomUUID()}-${path.basename(file)}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: 'image/jpeg', CacheControl: 'public, max-age=31536000' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
}

await mongoose.connect(process.env.MONGODB_URI)
const products = mongoose.connection.db.collection('products')
const current = await products.find({ styleCode: /^BHC-RB26/ }).toArray()
fs.writeFileSync('scripts/rebirth-pre-recrop-backup.json', JSON.stringify(current, null, 1))
console.log('backed up', current.length)

for (const p of current) {
  const files = NEW[p.styleCode]
    ? NEW[p.styleCode].map(f => path.join(newDir, f))
    : p.images.map((_, i) => path.join(croppedDir, `${p.styleCode}_${String(i).padStart(2, '0')}.jpg`))
  if (files.length !== p.images.length) throw new Error(`${p.styleCode}: ${files.length} files vs ${p.images.length} images`)
  const images = []
  for (let i = 0; i < files.length; i++) images.push(fs.existsSync(files[i]) ? await up(files[i]) : p.images[i])
  const res = await products.updateOne({ _id: p._id }, { $set: { images, updatedAt: new Date() } })
  console.log(p.styleCode, images.length, 'imgs', res.modifiedCount)
}
process.exit(0)
