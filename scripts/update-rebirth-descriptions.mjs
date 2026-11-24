// Rewrites REBIRTH 2026 product copy from the "Rebirth 2026 Enlarged Photos" PDF spec pages,
// in the same template used by the other collections.
// node --env-file=.env scripts/update-rebirth-descriptions.mjs
import mongoose from 'mongoose'
import fs from 'fs'

// styleCode -> PDF look number, colour label, item name, piece list (as on the PDF spec page)
const LOOKS = {
  'BHC-RB26002': { look: '01', colour: 'Moon Gold', item: 'couture ensemble', pieces: ['Couture upper', 'Sculpted skirt', 'Sheer head veil'] },
  'BHC-RB26003': { look: '02', colour: 'Rosaline', item: 'fish-cut couture ensemble', pieces: ['Embellished bralette', 'Fish-cut skirt', 'Open-front couture cape'] },
  'BHC-RB26004': { look: '03', colour: 'Moonlight Blue', item: 'couture bralette and skirt set', pieces: ['Embellished bralette', 'Choice of fish-cut or sculpted A-line skirt'], choice: true },
  'BHC-RB26005': { look: '04', colour: 'Antique Gold', item: 'couture lehenga ensemble', pieces: ['Sculpted corset', 'A-line lehenga', 'Tassel cape'], extra: 'A blazer variation is also available.' },
  'BHC-RB26006': { look: '05', colour: 'Moonlight Silver', item: 'couture top and skirt set', pieces: ['Structured couture top', 'Choice of 13-panel skirt or A-line lehenga'], choice: true },
  'BHC-RB26007': { look: '06', colour: 'Honey Gold', item: 'couture blazer and skirt set', pieces: ['Structured blazer', 'Couture skirt', 'Veil / feather stole'] },
  'BHC-RB26008': { look: '07', colour: 'Gold Bronze', item: 'couture corset and skirt set', pieces: ['Embellished corset', 'Straight couture skirt', 'Hand-embellished tassel cape'] },
  'BHC-RB26009': { look: '08', colour: 'Light Gold', item: 'couture gown', pieces: ['Structured couture gown', 'Architectural overskirt', 'Floor-sweeping veil'] },
  'BHC-RB26011': { look: '09', colour: 'Ozore', item: 'couture blouse and skirt set', pieces: ['Embellished blouse', 'Choice of A-line lehenga or mermaid skirt'], choice: true },
  'BHC-RB26001': { look: '10', colour: 'Lilac Ash', item: 'couture blazer and skirt set', pieces: ['Embellished blazer', 'Fitted skirt', 'Feather stole'] },
  'BHC-RB26012': { look: '11', colour: 'Persian Night', item: 'couture blazer and skirt set', pieces: ['Cropped embellished blazer', 'Tailored mini skirt'] },
}

const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1)
const list = (a) => (a.length > 1 ? `${a.slice(0, -1).map(lower).join(', ')} and ${lower(a[a.length - 1])}` : lower(a[0]))

function build(L) {
  const n = L.pieces.length
  const description =
    `Shop this exquisite handcrafted ${L.item} in ${L.colour.toLowerCase()}, a statement piece from the Bora Honey's REBIRTH 2026 collection of designer Indian bridal wear. ` +
    `This ${n}-piece luxury wedding outfit set comprises ${list(L.pieces)}, perfect for brides, bridesmaids, and guests attending weddings, receptions, sangeet, and festive celebrations. ` +
    (L.extra ? `${L.extra} ` : '') +
    `Featuring intricate embellishment, embroidery, and a focus on silhouette, this couture ensemble reflects Bora Honey's signature blend of opulence and contemporary tailoring, making it a must-have addition to any luxury occasion wardrobe.`
  const keyFeatures = [
    `Set includes ${n} pieces: ${L.pieces.join(', ')}`,
    `Colour: ${L.colour}`,
    ...(L.extra ? [L.extra.replace(/\.$/, '')] : []),
    'Premium handcrafted embellishment and embroidery work',
    'Made-to-measure / customisable fit available on request',
    'Designed for bridal, festive, and red-carpet occasions',
    `Part of the REBIRTH 2026 Collection — Look ${L.look}`,
  ].join('\n')
  return { description, keyFeatures, numberOfPieces: n, composition: L.pieces.join(', '), silhouette: L.pieces.join('\n') }
}

await mongoose.connect(process.env.MONGODB_URI)
const products = mongoose.connection.db.collection('products')
const codes = Object.keys(LOOKS)
const backup = await products.find({ styleCode: { $in: codes } }).toArray()
fs.writeFileSync('scripts/rebirth-desc-backup.json', JSON.stringify(backup, null, 1))
console.log('backed up', backup.length)

for (const [code, L] of Object.entries(LOOKS)) {
  const r = await products.updateOne({ styleCode: code }, { $set: { ...build(L), updatedAt: new Date() } })
  console.log(code, L.colour, 'matched', r.matchedCount, 'modified', r.modifiedCount)
}
await mongoose.disconnect()
