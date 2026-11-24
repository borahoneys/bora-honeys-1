// Creates or updates the super admin user from .env.
// node --env-file=.env scripts/create-super-admin.mjs
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.SUPER_ADMIN_PASSWORD
const name = process.env.SUPER_ADMIN_NAME?.trim() || 'Super Admin'

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('SUPER_ADMIN_EMAIL is missing or invalid')
if (!password || password.length < 8) throw new Error('SUPER_ADMIN_PASSWORD must be at least 8 characters')
if (name.length < 2) throw new Error('SUPER_ADMIN_NAME must be at least 2 characters')

await mongoose.connect(process.env.MONGODB_URI)
const users = mongoose.connection.db.collection('users')

const hash = await bcrypt.hash(password, 12)
const now = new Date()
const r = await users.updateOne(
  { email },
  {
    $set: { name, password: hash, role: 'super_admin', isActive: true, isEmailVerified: true, updatedAt: now },
    $setOnInsert: { email, addresses: [], wishlist: [], createdAt: now, __v: 0 },
  },
  { upsert: true }
)
console.log(r.upsertedCount ? 'Created' : 'Updated', 'super admin:', email)
await mongoose.disconnect()
