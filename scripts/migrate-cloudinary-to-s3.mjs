// One-off migration: copies every Cloudinary-hosted image/video referenced in
// MongoDB over to S3, then rewrites the { url, publicId } fields to point at S3.
//
// Usage:
//   node --env-file=.env scripts/migrate-cloudinary-to-s3.mjs           (dry run — logs only)
//   node --env-file=.env scripts/migrate-cloudinary-to-s3.mjs --apply   (actually migrates)
//
// Requires AWS_* env vars to already be set. Cloudinary env vars are only
// needed if your Cloudinary assets require signed/authenticated delivery —
// otherwise the existing `url` field already points at a public delivery URL.

import mongoose from 'mongoose'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const APPLY = process.argv.includes('--apply')

const MONGODB_URI = process.env.MONGODB_URI
const BUCKET = process.env.AWS_S3_BUCKET_NAME
const REGION = process.env.AWS_REGION

if (!MONGODB_URI) throw new Error('MONGODB_URI is not set')
if (!BUCKET || !REGION) throw new Error('AWS_S3_BUCKET_NAME / AWS_REGION are not set')

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const CONTENT_TYPE_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
}

let migrated = 0
let skipped = 0
let failed = 0

async function migrateAsset(asset) {
  if (!asset || !asset.url || !asset.url.includes('res.cloudinary.com')) {
    return null // not a cloudinary asset, leave untouched
  }

  try {
    const res = await fetch(asset.url)
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`)
    const contentType = res.headers.get('content-type') || 'application/octet-stream'
    const buffer = Buffer.from(await res.arrayBuffer())

    const ext = CONTENT_TYPE_EXT[contentType] ?? asset.url.split('.').pop()?.split('?')[0] ?? 'bin'
    const key = `${asset.publicId}.${ext}`

    if (APPLY) {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      )
    }

    const newUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
    migrated++
    console.log(`${APPLY ? 'migrated' : '[dry-run] would migrate'}: ${asset.url} -> ${newUrl}`)
    return { url: newUrl, publicId: key }
  } catch (err) {
    failed++
    console.error(`FAILED: ${asset.url} — ${err.message}`)
    return null
  }
}

// Migrates a single { url, publicId } field in place on `obj[key]`.
async function migrateField(obj, key) {
  const asset = obj?.[key]
  if (!asset || !asset.url) return false
  if (!asset.url.includes('res.cloudinary.com')) {
    skipped++
    return false
  }
  const migratedAsset = await migrateAsset(asset)
  if (!migratedAsset) return false
  obj[key] = migratedAsset
  return true
}

// Walks a document, migrating every { url, publicId } shaped object it finds
// at the known paths, and reports whether anything changed. Paths are either
// "field" (array of assets, or a single asset) or "arrayField.subField"
// (array of objects, each possibly holding an asset at subField).
async function migrateDoc(db, collectionName, doc, assetPaths) {
  let changed = false

  for (const path of assetPaths) {
    const [first, second] = path.split('.')
    const value = doc[first]

    if (!value) continue

    if (!second) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (await migrateField(value, i)) changed = true
        }
      } else {
        if (await migrateField(doc, first)) changed = true
      }
      continue
    }

    // array of sub-documents, each possibly holding an asset at `second`
    if (Array.isArray(value)) {
      for (const item of value) {
        if (await migrateField(item, second)) changed = true
      }
    }
  }

  if (changed && APPLY) {
    await db.collection(collectionName).updateOne({ _id: doc._id }, { $set: doc })
  }

  return changed
}

async function run() {
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  const jobs = [
    { collection: 'products', paths: ['images'] },
    { collection: 'categories', paths: ['image'] },
    { collection: 'collections', paths: ['image', 'video'] },
    { collection: 'clientdiaries', paths: ['image'] },
    { collection: 'homepageconfigs', paths: ['sections.desktopImage', 'sections.mobileImage', 'sections.video'] },
    { collection: 'editorialpages', paths: ['heroSections.desktopImage', 'heroSections.mobileImage', 'heroSections.video'] },
  ]

  for (const job of jobs) {
    const docs = await db.collection(job.collection).find({}).toArray()
    console.log(`\n--- ${job.collection} (${docs.length} docs) ---`)
    for (const doc of docs) {
      await migrateDoc(db, job.collection, doc, job.paths)
    }
  }

  console.log(`\nDone. migrated=${migrated} skipped(already-s3-or-empty)=${skipped} failed=${failed}`)
  if (!APPLY) console.log('This was a dry run — re-run with --apply to actually copy files and update MongoDB.')

  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
