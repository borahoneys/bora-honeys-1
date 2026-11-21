// Uploads REBIRTH 2026 look photos to S3 and updates matching products.
// node --env-file=.env scripts/upload-rebirth-2026.mjs
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const ROOT = 'products/SAMPLE LOW SIZE'
const BUCKET = process.env.AWS_S3_BUCKET_NAME, REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

// folder -> [styleCode, category name]
const MAP = {
  'Look 01 - Moon Gold': ['BHC-RB26002'],
  'Look 02 - Rosaline': ['BHC-RB26003'],
  'Look 03 - Moonlight Blue': ['BHC-RB26004'],
  'Look 04 - Antique Gold': ['BHC-RB26005'],
  'Look 05 - Moonlight Silver': ['BHC-RB26006', 'Straight Cut Lehngas Sets'],
  'Look 06 - Honey Gold': ['BHC-RB26007', 'Co-Ords Set'],
  'Look 07 - Gold Bronze': ['BHC-RB26008', 'Straight Cut Lehngas Sets'],
  'Look 08 - Light Gold': ['BHC-RB26009', 'Gowns'],
  'Look 09 - Ozore': ['BHC-RB26011', 'Co-Ords Set'],
  'Look 10 - Lilac Ash': ['BHC-RB26001'],
  'Look 11 - Persian Night': ['BHC-RB26012', 'Co-Ords Set'],
}
const EXTRA_CAT = { 'BHC-RB26010': 'Gowns' } // Nude Pink: no photo folder, category only

await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const products = db.collection('products')
const cats = Object.fromEntries((await db.collection('categories').find({}).toArray()).map(c => [c.name, c._id]))

const codes = [...Object.values(MAP).map(v => v[0]), ...Object.keys(EXTRA_CAT)]
const backup = await products.find({ styleCode: { $in: codes } }).toArray()
fs.writeFileSync('scripts/rebirth-backup.json', JSON.stringify(backup, null, 1))
console.log('backed up', backup.length)

async function up(file) {
  const key = `bora-honeys/products/${randomUUID()}-${path.basename(file).replace(/ copy/, '').replace(/\s+/g, '-')}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: 'image/jpeg' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
}

for (const [folder, [code, catName]] of Object.entries(MAP)) {
  const dir = path.join(ROOT, folder)
  const files = fs.readdirSync(dir).filter(f => /\.jpe?g$/i.test(f)).sort()
  const images = []
  for (let i = 0; i < files.length; i += 4)
    images.push(...await Promise.all(files.slice(i, i + 4).map(f => up(path.join(dir, f)))))
  const set = { images }
  const cur = backup.find(p => p.styleCode === code)
  if (catName && !(cur.categories?.length)) set.categories = [cats[catName]]
  const r = await products.updateOne({ styleCode: code }, { $set: set })
  console.log(folder, code, images.length, 'imgs', r.modifiedCount, catName ?? '')
}
for (const [code, name] of Object.entries(EXTRA_CAT)) {
  const r = await products.updateOne({ styleCode: code, 'categories.0': { $exists: false } }, { $set: { categories: [cats[name]] } })
  console.log(code, 'category', name, r.modifiedCount)
}
process.exit(0)
