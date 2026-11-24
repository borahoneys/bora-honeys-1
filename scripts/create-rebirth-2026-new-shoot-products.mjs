// Creates new REBIRTH 2026 products from the "new shoot" photo set (Drive folder), grouped by look,
// copy written in the same style as the existing REBIRTH products, piece lists from the
// "Bora Honeys Rebirth 2026 Enlarged Photos" PDF. Adds them to the collection-2026 products list.
// node --env-file=.env scripts/create-rebirth-2026-new-shoot-products.mjs <croppedDir> [--dry]
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const dir = process.argv[2]
const DRY = process.argv.includes('--dry')
const BUCKET = process.env.AWS_S3_BUCKET_NAME, REGION = process.env.AWS_REGION
const s3 = new S3Client({ region: REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })

const range = (a) => a.map(n => `069A${n}.jpg`)

const GROUPS = [
  {
    code: 'BHC-RB26013', name: 'Silver Sculpted Shoulder Couture Set', colour: 'Moonlight Silver', look: 'Sculpted Shoulder', cat: 'Fish Cut Lehngas Sets',
    pieces: ['Sculpted-shoulder couture top', 'Embellished bralette', 'Fish-cut skirt'],
    intro: 'Silver Sculpted Shoulder is couture with a sharp, architectural point of view. A dramatic sculpted shoulder frames the neckline, and a fish-cut skirt flows down into a sweeping trail.',
    outro: 'Bold on the shoulder, fluid below, and made to be photographed from every angle.',
    care: 'Handle the sculpted shoulder and embellishments with exceptional care.',
    photos: range([6754, 6770, 6806]),
  },
  {
    code: 'BHC-RB26014', name: 'Honey Gold Couture Blazer Set', colour: 'Honey Gold', look: 'Honey Gold', cat: 'Co-Ords Set',
    pieces: ['Structured blazer', 'Embellished bralette', 'Couture skirt'],
    intro: 'Honey Gold is warm, glowing and unapologetically bold. A structured blazer sits over an embellished bralette and a couture skirt, so the tailoring is strong and the shine is soft.',
    outro: 'Power and romance in one look, finished with a long, graceful line.',
    care: 'Handle the beaded detailing and embellishments with exceptional care.',
    photos: range([6848, 6849, 6978]),
  },
  {
    code: 'BHC-RB26015', name: 'Moonlight Silver Beaded High-Neck Couture Set', colour: 'Moonlight Silver', look: 'High-Neck', cat: 'Straight Cut Lehngas Sets',
    pieces: ['Structured high-neck couture top', 'Choice of 13-panel skirt or A-line lehenga'], choice: true,
    intro: 'Moonlight Silver is all about clean structure and quiet shine. A sharply built high-neck couture top, finished with delicate beaded strands, pairs with either a 13-panel skirt for fluid, layered movement or an A-line lehenga for a classic celebratory sweep.',
    outro: 'Elegant, cool and effortlessly polished from every angle.',
    care: 'Handle the beaded strands and embellishments with exceptional care.',
    photos: range([6998, 7013, 7017, 7019, 7022, 7030, 7034, 7036, 7040]),
  },
  {
    code: 'BHC-RB26016', name: 'Moonlight Blue Veiled Couture Set', colour: 'Moonlight Blue', look: 'Veiled', cat: 'Fish Cut Lehngas Sets',
    pieces: ['Embellished bralette', 'Fish-cut skirt', 'Sheer couture veil'],
    intro: 'Moonlight Blue pairs a richly embellished bralette with a sculpted fish-cut skirt, and a sheer couture veil drifts over it all like moonlight on water.',
    outro: 'Soft, striking and made for an entrance people remember.',
    care: 'Handle the veil, train and embellishments with exceptional care.',
    photos: range([7113, 7127, 7130, 7132, 7136, 7150, 7152, 7187]),
  },
  {
    code: 'BHC-RB26017', name: 'Moonlight Silver Couture Blazer Set', colour: 'Moonlight Silver', look: 'Blazer', cat: 'Co-Ords Set',
    pieces: ['Embellished couture blazer', 'Embellished bralette', 'Fish-cut skirt'],
    intro: 'Moonlight Silver in its sharpest form. An embellished couture blazer with fine linear detailing sits over a bralette and a sculpted fish-cut skirt for a look that is confident, cool and full of light.',
    outro: 'Tailored on top, sleek below, and quietly unforgettable.',
    care: 'Handle the sequins and embellishments with exceptional care.',
    photos: range([7284, 7286, 7290, 7299, 7303, 7312, 7319, 7328, 7332]),
  },
  {
    code: 'BHC-RB26018', name: 'Gold Bronze Tassel Cape Couture Set', colour: 'Gold Bronze', look: 'Tassel Cape', cat: 'Straight Cut Lehngas Sets',
    pieces: ['Embellished corset', 'Straight couture skirt', 'Hand-embellished tassel cape'],
    intro: 'Gold Bronze is rich, sculpted and full of presence. An embellished corset defines the waist, a straight couture skirt keeps the line clean, and a hand-embellished tassel cape completes the picture with movement and drama.',
    outro: 'Every tassel and every bead is placed by hand.',
    care: 'Handle the embellished cape and handcrafted tassels with exceptional care.',
    photos: range([7366, 7377, 7392, 7413, 7443, 7448, 7453, 7468, 7475]),
  },
  {
    code: 'BHC-RB26019', name: 'Light Gold Veiled Couture Gown', colour: 'Light Gold', look: 'Veiled Gown', cat: 'Gowns',
    pieces: ['Structured couture gown', 'Architectural overskirt', 'Floor-sweeping veil'],
    intro: 'Light Gold is the showstopper of the collection. A structured couture gown is layered with an architectural overskirt and a floor-sweeping veil that opens like wings as you move.',
    outro: 'Made for the moment everyone turns to look.',
    care: 'Handle the structured overskirt, veil and embellishments with exceptional care.',
    photos: range([7477, 7478, 7503, 7509, 7516, 7524, 7530, 7540]),
  },
  {
    code: 'BHC-RB26020', name: 'Lilac Ash Feather Couture Set', colour: 'Lilac Ash', look: 'Feather', cat: 'Co-Ords Set',
    pieces: ['Embellished blazer', 'Fitted skirt', 'Feather stole'],
    intro: 'Lilac Ash is soft on the eyes and sharp in its tailoring. An embellished blazer and fitted skirt create a polished line, and a feather stole adds a delicate, airy layer.',
    outro: 'Modern, graceful and quietly luxurious.',
    care: 'Handle the feathers and embellishments with exceptional care.',
    photos: range([7565, 7576, 7578, 7587, 7596, 7608, 7616]),
  },
]

const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1)
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function build(g, categoryId, images) {
  const n = g.pieces.length
  const list = g.choice ? g.pieces.map(lower).join(', ').replace(/choice of /, '').replace(' or ', ' or ') : g.pieces.map(lower).join(', ')
  const description =
    `${g.intro}\n\n` +
    (g.choice
      ? `This ${n}-piece set includes ${g.pieces[0].toLowerCase()}, ${g.pieces[1].replace(/^Choice of /, '').toLowerCase()} (your choice). ${g.outro}\n\n`
      : `This ${n}-piece set includes ${list}. ${g.outro}\n\n`) +
    `Every piece is handcrafted by the Bora Honeys artisans, with embellishment placed by hand and finishing that holds up close. Part of the REBIRTH 2026 collection, it works beautifully for weddings, receptions, sangeet, engagements and other celebrations where you want to be remembered.\n\n` +
    `Can be made to your measurements and customised on request. Please reach out to us for pricing and availability.`
  const pieceLine = g.choice ? `${n} pieces: ${g.pieces[0]}, ${g.pieces[1].replace(/^Choice of /, '')} (your choice)` : `${n} pieces: ${g.pieces.join(', ')}`
  const tag = slugify(g.colour)
  return {
    name: g.name, slug: slugify(g.name), description, price: 0, images, categories: [categoryId],
    color: g.colour, styleCode: g.code, numberOfPieces: n, composition: g.pieces.join(', '),
    keyFeatures: [pieceLine, `Colour: ${g.colour}`, 'Handcrafted embellishment and finishing', 'Made to measure and customisable on request', 'Part of the REBIRTH 2026 collection'].join('\n'),
    careInstructions: ['Professional couture dry clean only.', 'Store inside the Bora Honeys garment bag provided with your order.', 'Avoid prolonged exposure to direct sunlight and moisture.', g.care, 'Steam gently at a safe distance before wearing.'].join('\n'),
    deliveryTimeline: 'Made exclusively by appointment.\nEstimated production timeline: 8-16 weeks, depending on the complexity of embroidery and couture craftsmanship.\nWorldwide shipping available.',
    stock: 3, sku: g.code, tags: ['couture', 'rebirth-2026', tag, 'bridal', 'festive'], isActive: true, isFeatured: false,
    seo: { title: `${g.name} | REBIRTH 2026 | Bora Honeys Couture`, description: `${g.intro} Explore the ${g.name} from the REBIRTH 2026 collection by Bora Honeys Couture.` },
    silhouette: g.pieces.join('\n'), collectionName: 'REBIRTH 2026',
    craftsmanship: 'Entirely handcrafted by Bora Honeys artisans\nCouture construction with luxury finishing\nPremium embellishments individually hand applied\nPrecision tailoring for a sculpted silhouette\nDesigned and produced in limited quantities',
    perfectFor: 'Luxury Receptions\nDestination Weddings\nEngagement Celebrations\nFashion Events\nRed Carpet Appearances\nLuxury Evening Occasions',
    bespokeCustomisation: 'Every Bora Honeys Couture creation can be customised to your measurements and styling preferences through our Bespoke Couture service.',
    collectionStory: "REBIRTH is Bora Honeys Couture's 2026 collection—an exploration of transformation, strength and timeless femininity. Every silhouette is handcrafted to celebrate individuality through modern couture.",
    searchKeywords: [g.name, `${g.colour} couture`, 'REBIRTH 2026', 'Bora Honeys Couture', 'designer wedding outfit', 'bridal couture'],
    imageAltText: `${g.name} from the Bora Honeys REBIRTH 2026 collection`,
    createdAt: new Date(), updatedAt: new Date(),
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
const cats = Object.fromEntries((await db.collection('categories').find({}).toArray()).map(c => [c.name, c._id]))

for (const g of GROUPS) {
  if (!cats[g.cat]) throw new Error('missing category ' + g.cat)
  for (const f of g.photos) if (!fs.existsSync(path.join(dir, f))) throw new Error('missing photo ' + f)
}
const all = GROUPS.flatMap(g => g.photos)
if (new Set(all).size !== all.length) throw new Error('photo used twice')
console.log(GROUPS.length, 'products,', all.length, 'photos')
if (DRY) { for (const g of GROUPS) console.log(g.code, g.name, g.photos.length, g.cat); process.exit(0) }

const newIds = []
for (const g of GROUPS) {
  if (await products.findOne({ $or: [{ styleCode: g.code }, { slug: slugify(g.name) }] })) { console.log('exists, skipping', g.code); continue }
  const images = []
  for (let i = 0; i < g.photos.length; i += 4)
    images.push(...await Promise.all(g.photos.slice(i, i + 4).map(f => up(path.join(dir, f)))))
  const r = await products.insertOne(build(g, cats[g.cat], images))
  newIds.push(r.insertedId)
  console.log('created', g.code, g.name, images.length, 'images')
}
if (newIds.length) {
  const r = await db.collection('collections').updateOne({ slug: 'collection-2026' }, { $push: { products: { $each: newIds } }, $set: { updatedAt: new Date() } })
  console.log('collection-2026 updated', r.modifiedCount)
}
process.exit(0)
