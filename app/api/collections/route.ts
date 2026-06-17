import { connectDB } from '@/lib/db/mongoose'
import Collection from '@/lib/models/Collection'
import { auth } from '@/auth'
import type { NextRequest } from 'next/server'

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function GET(request: NextRequest) {
  await connectDB()
  const withProducts = request.nextUrl.searchParams.get('withProducts') === 'true'
  let query = Collection.find().sort({ name: 1 })
  if (withProducts) query = query.populate('products', 'name slug images price isActive')
  const collections = await query.lean()
  return Response.json(collections)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()
  const { name, description, image } = body

  if (!name?.trim()) return Response.json({ error: 'Name is required' }, { status: 400 })

  const slug = toSlug(name)
  const existing = await Collection.findOne({ slug })
  if (existing) return Response.json({ error: 'A collection with this name already exists' }, { status: 409 })

  const collection = await Collection.create({ name: name.trim(), slug, description, image })
  return Response.json(collection, { status: 201 })
}
