// Replaces em/en dashes in product and collection text with natural punctuation.
// Each replacement is listed explicitly so the sentence still reads well; anything
// not covered is reported and left untouched. Backs up affected documents first.
// node --env-file=.env.local scripts/remove-dashes-from-content.mjs [--dry]
import mongoose from 'mongoose'
import fs from 'fs'

const DRY = process.argv.includes('--dry')

const RULES = [
  [/collection—an /g, 'collection, an '],
  [/(\d+)–(\d+) (weeks|months)/g, '$1 to $2 $3'],
  [/ — Look (\d+)/g, ', Look $1'],
  [/sleeve — a silhouette/g, 'sleeve, a silhouette'],
  [/cape trail — together creating/g, 'cape trail, together creating'],
  [/half sleeves — a trio/g, 'half sleeves: a trio'],
  [/BORA HONEYS—a luxury/g, 'BORA HONEYS, a luxury'],
  [/first sketch—the quiet/g, 'first sketch: the quiet'],
  [/starting over—yet every/g, 'starting over, yet every'],
  [/emotional moment—a dream/g, 'emotional moment. A dream'],
  [/began—not just/g, 'began, not just'],
  [/—\s*Honey Nanda/g, 'Honey Nanda'],
  [/growth—of a brand/g, 'growth: of a brand'],
  [/expected—a reminder/g, 'expected, a reminder'],
  [/quiet strength—the courage/g, 'quiet strength, the courage'],
  [/like a flower—capable/g, 'like a flower, capable'],
  [/becoming—about shedding/g, 'becoming, about shedding'],
  [/by hand—embroidered/g, 'by hand: embroidered'],
]

const fix = (s) => RULES.reduce((t, [re, to]) => t.replace(re, to), s)

// Returns a copy of `o` with every string fixed, plus the list of changed paths.
function walk(o, path, changes) {
  if (typeof o === 'string') {
    const n = fix(o)
    if (n !== o) changes.push(path)
    return n
  }
  if (Array.isArray(o)) return o.map((v, i) => walk(v, `${path}.${i}`, changes))
  if (o && typeof o === 'object' && o.constructor === Object) {
    const r = {}
    for (const k of Object.keys(o)) r[k] = walk(o[k], path ? `${path}.${k}` : k, changes)
    return r
  }
  return o
}

await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const backup = {}
let total = 0
const left = []

for (const name of ['products', 'collections']) {
  const col = db.collection(name)
  for (const doc of await col.find({}).toArray()) {
    const changes = []
    const { _id, ...rest } = doc
    const fixed = walk(rest, '', changes)
    if (JSON.stringify(fixed).match(/[—–]/)) left.push(`${name} ${_id}: ${JSON.stringify(fixed).match(/.{0,40}[—–].{0,40}/)[0]}`)
    if (!changes.length) continue
    ;(backup[name] ??= []).push(doc)
    total += changes.length
    const set = {}
    for (const p of changes) set[p] = p.split('.').reduce((v, k) => v[k], fixed)
    console.log(`${name} ${doc.name ?? doc.slug}: ${changes.join(', ')}`)
    if (!DRY) await col.updateOne({ _id }, { $set: set })
  }
}

if (left.length) console.log('NOT COVERED (left as is):\n' + left.join('\n'))
if (!DRY && total) {
  const file = `scripts/content-dash-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  fs.writeFileSync(file, JSON.stringify(backup, null, 1))
  console.log('backup ->', file)
}
console.log(DRY ? `dry run: ${total} fields would change` : `${total} fields updated`)
process.exit(0)
