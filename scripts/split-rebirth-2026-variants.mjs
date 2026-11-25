// Splits the three REBIRTH 2026 looks that were sold as "your choice of skirt" into one product per version.
//   Look 03 Moonlight Blue   (BHC-RB26004): keeps the fish-cut photos  -> new BHC-RB26021 A-line skirt
//   Look 05 Moonlight Silver (BHC-RB26006): keeps the 13-panel photos  -> new BHC-RB26022 A-line lehenga
//   Look 09 Ozore            (BHC-RB26011): keeps the mermaid photos   -> new BHC-RB26023 A-line lehenga (new photos)
// Existing products keep their slug (no broken links); their copy is rewritten for the single version.
// New products are inserted into collection-2026 right after the product they were split from.
// Backs up every BHC-RB26* product and the collection first.
// node --env-file=.env.local scripts/split-rebirth-2026-variants.mjs <ozorePhotoDir> [--dry]
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const ozoreDir = process.argv[2]
const DRY = process.argv.includes('--dry')
const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'bora-honey-bucket-737759272707-ap-southeast-2-an'
const REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

const TAIL =
  'Every piece is handcrafted by the Bora Honeys artisans, with embellishment placed by hand and finishing that holds up close. ' +
  'Part of the REBIRTH 2026 collection, it works beautifully for weddings, receptions, sangeet, engagements and other celebrations where you want to be remembered.\n\n' +
  'Can be made to your measurements and customised on request. Please reach out to us for pricing and availability.'

const SPLITS = [
  {
    from: 'BHC-RB26004', look: 'Look 03', colour: 'Moonlight Blue',
    keep: { count: 16, name: 'Moonlight Blue Fish-Cut Couture Set', pieces: ['Embellished bralette', 'Fish-cut skirt'],
      intro: 'Moonlight Blue pairs a richly embellished bralette with a sculpted fish-cut skirt that follows the body and opens into a sweeping hem.',
      outro: 'Sleek, sculpted and made for an entrance.' },
    add: { code: 'BHC-RB26021', name: 'Moonlight Blue A-Line Couture Set', category: 'Flared Lehngas Sets', imagesFrom: 16,
      pieces: ['Embellished bralette', 'Sculpted A-line skirt'],
      intro: 'Moonlight Blue pairs a richly embellished bralette with a sculpted A-line skirt, giving the look easy volume and a beautiful swing as you move.',
      outro: 'Light on its feet, full of shine and made to dance in.',
      craft: 'Sculpted A-line silhouette designed for volume and movement' },
  },
  {
    from: 'BHC-RB26006', look: 'Look 05', colour: 'Moonlight Silver',
    keep: { count: 16, name: 'Moonlight Silver 13-Panel Couture Set', pieces: ['Structured couture top', '13-panel skirt'],
      intro: 'Moonlight Silver is all about clean structure and quiet shine. A sharply built couture top pairs with a 13-panel skirt for fluid, layered movement.',
      outro: 'Elegant, cool and effortlessly polished from every angle.' },
    add: { code: 'BHC-RB26022', name: 'Moonlight Silver A-Line Lehenga Couture Set', category: 'Flared Lehngas Sets', imagesFrom: 16,
      pieces: ['Structured couture top', 'A-line lehenga'],
      intro: 'Moonlight Silver is all about clean structure and quiet shine. A sharply built couture top pairs with a full A-line lehenga for a classic, celebratory sweep.',
      outro: 'Timeless in shape and quietly radiant from every angle.',
      craft: 'Full A-line lehenga construction for a classic celebratory sweep' },
  },
  {
    from: 'BHC-RB26011', look: 'Look 09', colour: 'Ozore',
    keep: { count: null, name: 'Ozore Mermaid Couture Set', pieces: ['Embellished blouse', 'Mermaid skirt'],
      intro: 'Ozore pairs an embellished blouse with a mermaid skirt that follows your curves and opens out at the hem.',
      outro: 'Fluid, sculpted and quietly dramatic.' },
    add: { code: 'BHC-RB26023', name: 'Ozore A-Line Lehenga Couture Set', category: 'Flared Lehngas Sets',
      photos: ['0409', '0522', '0424', '0445', '0481', '0411', '0452', '0456', '0426', '0334', '0377'].map(n => `069A${n}.jpg`),
      pieces: ['Embellished high-neck blouse', 'A-line lehenga'],
      intro: 'Ozore in its most celebratory form. A richly embellished high-neck blouse with sheer sleeves is paired with a flowing A-line lehenga for classic volume.',
      outro: 'Graceful, full and made for the big moments.',
      craft: 'Flowing A-line lehenga construction for classic volume' },
  },
]

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1)

// Copy fields that describe a single version, built from the template used for every REBIRTH product.
function copyFor(v, colour, look) {
  const n = v.pieces.length
  const description = `${v.intro}\n\nThis ${n}-piece set includes ${v.pieces.map(lower).join(', ')}. ${v.outro}\n\n${TAIL}`
  return {
    name: v.name,
    description,
    numberOfPieces: n,
    composition: v.pieces.join(', '),
    keyFeatures: [`${n} pieces: ${v.pieces.join(', ')}`, `Colour: ${colour}`, 'Handcrafted embellishment and finishing', 'Made to measure and customisable on request', `Part of the REBIRTH 2026 collection, ${look}`].join('\n'),
    silhouette: v.pieces.join('\n'),
    seo: { title: `${v.name} | REBIRTH 2026 | Bora Honeys Couture`, description: `${v.intro} Explore the ${v.name} from the REBIRTH 2026 collection by Bora Honeys Couture.` },
    searchKeywords: [v.name, `${colour} couture`, 'REBIRTH 2026', 'Bora Honeys Couture', 'designer wedding outfit', 'bridal couture'],
    imageAltText: `${v.name} from the Bora Honeys REBIRTH 2026 collection`,
  }
}

async function up(file) {
  const key = `bora-honeys/products/${randomUUID()}-${path.basename(file)}`
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(file), ContentType: 'image/jpeg', CacheControl: 'public, max-age=31536000' }))
  return { url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`, publicId: key }
}

await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const products = db.collection('products')
const collections = db.collection('collections')
const cats = Object.fromEntries((await db.collection('categories').find({}).toArray()).map(c => [c.name, c._id]))

// Validate everything before touching anything.
const plan = []
for (const s of SPLITS) {
  const src = await products.findOne({ styleCode: s.from })
  if (!src) throw new Error(`missing ${s.from}`)
  if (await products.findOne({ $or: [{ styleCode: s.add.code }, { slug: slugify(s.add.name) }] })) throw new Error(`${s.add.code} already exists`)
  if (!cats[s.add.category]) throw new Error(`missing category ${s.add.category}`)
  let keepImages = src.images, addImages = null
  if (s.add.imagesFrom != null) {
    if (src.images.length <= s.add.imagesFrom || s.keep.count !== s.add.imagesFrom) throw new Error(`${s.from}: unexpected image count ${src.images.length}`)
    keepImages = src.images.slice(0, s.keep.count)
    addImages = src.images.slice(s.add.imagesFrom)
  } else {
    for (const f of s.add.photos) if (!fs.existsSync(path.join(ozoreDir ?? '', f))) throw new Error(`missing photo ${f}`)
  }
  plan.push({ s, src, keepImages, addImages })
  console.log(`${s.from} "${src.name}" (${src.images.length} imgs) -> keep "${s.keep.name}" ${keepImages.length} imgs | new ${s.add.code} "${s.add.name}" ${addImages ? addImages.length : s.add.photos.length} imgs [${s.add.category}]`)
}
if (DRY) { console.log('dry run, nothing changed'); process.exit(0) }

const backup = `scripts/rebirth-split-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
fs.writeFileSync(backup, JSON.stringify({
  products: await products.find({ styleCode: /^BHC-RB26/ }).toArray(),
  collection: await collections.findOne({ slug: 'collection-2026' }),
}, null, 1))
console.log('backup ->', backup)

for (const { s, src, keepImages, addImages } of plan) {
  let images = addImages
  if (!images) {
    images = []
    for (let i = 0; i < s.add.photos.length; i += 4)
      images.push(...await Promise.all(s.add.photos.slice(i, i + 4).map(f => up(path.join(ozoreDir, f)))))
  }

  const { _id, createdAt, updatedAt, __v, ...base } = src
  const now = new Date()
  const doc = {
    ...base,
    ...copyFor(s.add, s.colour, s.look),
    slug: slugify(s.add.name),
    styleCode: s.add.code,
    sku: s.add.code,
    categories: [cats[s.add.category]],
    images,
    craftsmanship: (src.craftsmanship || '').split('\n').map((l, i) => (i === 3 ? s.add.craft : l)).join('\n'),
    createdAt: now,
    updatedAt: now,
  }
  const { insertedId } = await products.insertOne(doc)

  await products.updateOne({ _id: src._id }, { $set: { ...copyFor(s.keep, s.colour, s.look), images: keepImages, updatedAt: now } })

  const col = await collections.findOne({ slug: 'collection-2026' })
  const at = col.products.findIndex(id => String(id) === String(src._id))
  await collections.updateOne({ _id: col._id }, { $push: { products: { $each: [insertedId], $position: at < 0 ? col.products.length : at + 1 } }, $set: { updatedAt: now } })

  console.log(`done ${s.from} -> "${s.keep.name}" (${keepImages.length}) + ${s.add.code} "${s.add.name}" (${images.length})`)
}
process.exit(0)
