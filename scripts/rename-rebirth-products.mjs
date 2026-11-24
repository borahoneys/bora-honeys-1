// Renames and rewrites copy for REBIRTH 2026 products only, using colour names exactly as on the PDF.
// node --env-file=.env scripts/rename-rebirth-products.mjs
import mongoose from 'mongoose'
import fs from 'fs'

// styleCode -> PDF colour, new name, piece list, human-written story lines
const LOOKS = {
  'BHC-RB26002': { look: '01', colour: 'Moon Gold', name: 'Moon Gold Couture Set', pieces: ['Couture upper', 'Sculpted skirt', 'Sheer head veil'],
    intro: 'Moon Gold is made for the bride who wants to glow without saying a word. A sculpted couture upper and a skirt with graceful movement are finished with a sheer head veil that floats like moonlight.',
    feel: 'The structure feels confident, the veil feels soft, and together they make an entrance that people remember.' },
  'BHC-RB26003': { look: '02', colour: 'Rosaline', name: 'Rosaline Couture Set', pieces: ['Embellished bralette', 'Fish-cut skirt', 'Open-front couture cape'],
    intro: 'Rosaline is romance with a modern edge. An embellished bralette meets a fish-cut skirt that hugs the figure and flares at the hem, while an open-front couture cape drifts behind you with every step.',
    feel: 'It is dramatic without being heavy, and made for a woman who loves to be seen.' },
  'BHC-RB26004': { look: '03', colour: 'Moonlight Blue', name: 'Moonlight Blue Couture Set', pieces: ['Embellished bralette', 'Fish-cut or sculpted A-line skirt (your choice)'],
    intro: 'Moonlight Blue pairs a richly embellished bralette with the skirt you love most. Choose a fish-cut skirt for a sleek, sculpted line, or a sculpted A-line skirt for easy volume and movement.',
    feel: 'Two skirts, one look, and the freedom to pick the silhouette that feels like you.' },
  'BHC-RB26005': { look: '04', colour: 'Antique Gold', name: 'Antique Gold Couture Set', pieces: ['Sculpted corset', 'A-line lehenga', 'Tassel cape'], extra: 'A blazer variation is also available.',
    intro: 'Antique Gold feels like a family heirloom reborn. A sculpted corset sits above a flowing A-line lehenga, finished with a tassel cape that adds movement and old-world charm. A blazer variation is also available for those who want a sharper, more modern take.',
    feel: 'Traditional in spirit and contemporary in shape.' },
  'BHC-RB26006': { look: '05', colour: 'Moonlight Silver', name: 'Moonlight Silver Couture Set', pieces: ['Structured couture top', '13-panel skirt or A-line lehenga (your choice)'],
    intro: 'Moonlight Silver is all about clean structure and quiet shine. A sharply built couture top pairs with either a 13-panel skirt for fluid, layered movement or an A-line lehenga for a classic celebratory sweep.',
    feel: 'Elegant, cool and effortlessly polished from every angle.' },
  'BHC-RB26007': { look: '06', colour: 'Honey Gold', name: 'Honey Gold Couture Set', pieces: ['Structured blazer', 'Couture skirt', 'Veil or feather stole'],
    intro: 'Honey Gold is warm, glowing and unapologetically bold. A structured blazer and couture skirt give you strong tailoring, while the veil or feather stole adds a soft, dreamy finish.',
    feel: 'Power and romance in one look, and a signature piece of the house.' },
  'BHC-RB26008': { look: '07', colour: 'Gold Bronze', name: 'Gold Bronze Couture Set', pieces: ['Embellished corset', 'Straight couture skirt', 'Hand-embellished tassel cape'],
    intro: 'Gold Bronze is rich, sculpted and full of presence. An embellished corset defines the waist, a straight couture skirt keeps the line clean, and a hand-embellished tassel cape completes the picture with movement and drama.',
    feel: 'Every tassel and every bead is placed by hand.' },
  'BHC-RB26009': { look: '08', colour: 'Light Gold', name: 'Light Gold Couture Gown', pieces: ['Structured couture gown', 'Architectural overskirt', 'Floor-sweeping veil'],
    intro: 'Light Gold is the showstopper of the collection. A structured couture gown is layered with an architectural overskirt and a floor-sweeping veil, creating a finish that feels grand, graceful and completely unforgettable.',
    feel: 'Made for the moment everyone turns to look.' },
  'BHC-RB26011': { look: '09', colour: 'Ozore', name: 'Ozore Couture Set', pieces: ['Embellished blouse', 'A-line lehenga or mermaid skirt (your choice)'],
    intro: 'Ozore gives you two looks in one. An embellished blouse is paired with your choice of a flowing A-line lehenga for classic volume, or a mermaid skirt that follows your curves and opens out at the hem.',
    feel: 'Same statement blouse, two very different moods.' },
  'BHC-RB26001': { look: '10', colour: 'Lilac Ash', name: 'Lilac Ash Couture Set', pieces: ['Embellished blazer', 'Fitted skirt', 'Feather stole'],
    intro: 'Lilac Ash is soft on the eyes and sharp in its tailoring. An embellished blazer and fitted skirt create a polished line, and a feather stole adds a delicate, airy layer.',
    feel: 'Modern, graceful and quietly luxurious.' },
  'BHC-RB26012': { look: '11', colour: 'Persian Night', name: 'Persian Night Couture Set', pieces: ['Cropped embellished blazer', 'Tailored mini skirt'],
    intro: 'Persian Night is fearless and fun. A cropped embellished blazer with a sharp, structured shape sits over a tailored mini skirt, giving you couture detail in a young, confident silhouette.',
    feel: 'Perfect for the woman who wants to stand out after dark.' },
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function build(L) {
  const n = L.pieces.length
  const pieceText = L.pieces.join(', ')
  const description =
    `${L.intro}\n\n` +
    `This ${n}-piece set includes ${L.pieces.map((p) => p.charAt(0).toLowerCase() + p.slice(1)).join(', ')}. ${L.feel}\n\n` +
    `Every piece is handcrafted by the Bora Honeys artisans, with embellishment placed by hand and finishing that holds up close. ` +
    `Part of the REBIRTH 2026 collection, it works beautifully for weddings, receptions, sangeet, engagements and other celebrations where you want to be remembered.\n\n` +
    `Can be made to your measurements and customised on request. Please reach out to us for pricing and availability.`
  return {
    name: L.name,
    slug: slugify(L.name),
    color: L.colour,
    description,
    numberOfPieces: n,
    composition: pieceText,
    silhouette: L.pieces.join('\n'),
    keyFeatures: [
      `${n} pieces: ${pieceText}`,
      `Colour: ${L.colour}`,
      ...(L.extra ? [L.extra.replace(/\.$/, '')] : []),
      'Handcrafted embellishment and finishing',
      'Made to measure and customisable on request',
      `Part of the REBIRTH 2026 collection, Look ${L.look}`,
    ].join('\n'),
    tags: ['couture', 'rebirth-2026', slugify(L.colour), 'bridal', 'festive'],
    searchKeywords: [L.name, `${L.colour} couture`, 'REBIRTH 2026', 'Bora Honeys Couture', 'designer wedding outfit', 'bridal couture'],
    imageAltText: `${L.name} from the Bora Honeys REBIRTH 2026 collection`,
    seo: {
      title: `${L.name} | REBIRTH 2026 | Bora Honeys Couture`,
      description: `${L.intro.split('. ').slice(0, 2).join('. ').replace(/\.$/, '')}. Explore the ${L.name} from the REBIRTH 2026 collection by Bora Honeys Couture.`,
    },
  }
}

await mongoose.connect(process.env.MONGODB_URI)
const products = mongoose.connection.db.collection('products')
const codes = Object.keys(LOOKS)
const backup = await products.find({ styleCode: { $in: codes } }).toArray()
fs.writeFileSync('scripts/rebirth-rename-backup.json', JSON.stringify(backup, null, 1))
console.log('backed up', backup.length)

for (const [code, L] of Object.entries(LOOKS)) {
  const r = await products.updateOne(
    { styleCode: code, collectionName: 'REBIRTH 2026' },
    { $set: { ...build(L), updatedAt: new Date() } },
  )
  console.log(code, L.name, 'matched', r.matchedCount, 'modified', r.modifiedCount)
}
await mongoose.disconnect()
