// Prints the homepage sections (read-only).
// node --env-file=.env.local scripts/show-homepage-sections.mjs
import mongoose from 'mongoose'
await mongoose.connect(process.env.MONGODB_URI)
const cfg = await mongoose.connection.db.collection('homepageconfigs').findOne({})
for (const [i, s] of cfg.sections.entries())
  console.log(i, String(s._id), s.order, s.type, s.isActive, s.desktopImage?.publicId ?? s.video?.publicId, s.mobileImage?.publicId ?? '', s.button ? JSON.stringify(s.button) : '')
process.exit(0)
