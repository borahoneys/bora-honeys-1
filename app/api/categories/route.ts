import { connectDB } from '@/lib/db/mongoose'
import Category from '@/lib/models/Category'
import { auth } from '@/auth'
import type { NextRequest } from 'next/server'

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function GET(request: NextRequest) {
  await connectDB()
  const search = request.nextUrl.searchParams.get('search')
  const query = search ? { name: { $regex: search, $options: 'i' } } : {}
  const categories = await Category.find(query).sort({ name: 1 }).lean()
  return Response.json(categories)
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
  const existing = await Category.findOne({ slug })
  if (existing) return Response.json({ error: 'A category with this name already exists' }, { status: 409 })

  const category = await Category.create({ name: name.trim(), slug, description, image })
  return Response.json(category, { status: 201 })
}
