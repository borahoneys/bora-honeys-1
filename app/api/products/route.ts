import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import { auth } from '@/auth'
import type { NextRequest } from 'next/server'

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function GET(request: NextRequest) {
  await connectDB()
  const sp = request.nextUrl.searchParams
  const search = sp.get('search')
  const category = sp.get('category')
  const featured = sp.get('featured')
  const active = sp.get('active')
  const page = Math.max(1, parseInt(sp.get('page') ?? '1'))
  const limit = Math.min(100, Math.max(1, parseInt(sp.get('limit') ?? '20')))

  const filter: Record<string, unknown> = {}
  if (search) filter.$text = { $search: search }
  if (category) filter.categories = category
  if (featured === 'true') filter.isFeatured = true
  if (active !== 'false') filter.isActive = true

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ])

  return Response.json({ products, total, page, limit, pages: Math.ceil(total / limit) })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await request.json()
  const {
    name, description, price, compareAtPrice, images, categories,
    material, dimensions, weight, editorsNote, stock, sku, tags, isActive, isFeatured, seo,
  } = body

  if (!name?.trim()) return Response.json({ error: 'Name is required' }, { status: 400 })
  if (typeof price !== 'number' || price < 0) return Response.json({ error: 'Valid price is required' }, { status: 400 })

  const slug = toSlug(name)
  const existing = await Product.findOne({ slug })
  if (existing) return Response.json({ error: 'A product with this name already exists' }, { status: 409 })

  const product = await Product.create({
    name: name.trim(), slug, description, price, compareAtPrice, images: images ?? [],
    categories: categories ?? [], material, dimensions, weight, editorsNote,
    stock: stock ?? 0, sku, tags: tags ?? [], isActive: isActive ?? true,
    isFeatured: isFeatured ?? false, seo,
  })

  await product.populate('categories', 'name slug')
  return Response.json(product, { status: 201 })
}
