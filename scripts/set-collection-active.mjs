// Shows or hides a collection (same as the admin panel's active toggle).
// node --env-file=.env.local scripts/set-collection-active.mjs <slug> <true|false>
import mongoose from 'mongoose'
const [slug, value] = process.argv.slice(2)
if (!slug || !['true', 'false'].includes(value)) throw new Error('usage: <slug> <true|false>')
await mongoose.connect(process.env.MONGODB_URI)
const col = mongoose.connection.db.collection('collections')
const before = await col.findOne({ slug }, { projection: { name: 1, isActive: 1 } })
if (!before) throw new Error(`no collection ${slug}`)
await col.updateOne({ slug }, { $set: { isActive: value === 'true', updatedAt: new Date() } })
console.log(`${before.name}: isActive ${before.isActive} -> ${value}`)
process.exit(0)
