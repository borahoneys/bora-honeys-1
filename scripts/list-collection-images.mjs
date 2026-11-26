// Prints each active product in a collection with its first image URL (read-only).
// node --env-file=.env.local scripts/list-collection-images.mjs <collection-slug>
import mongoose from 'mongoose'
await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const c = await db.collection('collections').findOne({ slug: process.argv[2] })
const ps = await db.collection('products').find({ _id: { $in: c.products }, isActive: true }).toArray()
for (const p of ps) console.log([p.slug, p.name, p.images.length, ...p.images.map((i) => i.url)].join('\t'))
process.exit(0)
