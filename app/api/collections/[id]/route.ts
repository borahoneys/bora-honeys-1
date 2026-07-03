import { connectDB } from '@/lib/db/mongoose'
import Collection from '@/lib/models/Collection'
import { auth } from '@/auth'
import type { NextRequest } from 'next/server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const collection = await Collection.findById(id)
    .populate('products', 'name slug images price isActive')
    .lean()
  if (!collection) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(collection)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const body = await request.json()
  const { name, description, image, video, isActive, products } = body

  const update: Record<string, unknown> = { name, description, image, video, isActive }
  if (Array.isArray(products)) update.products = products

  const collection = await Collection.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).lean()

  if (!collection) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(collection)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const { action, productId } = await request.json()

  if (!productId) return Response.json({ error: 'productId required' }, { status: 400 })

  let update
  if (action === 'add') {
    update = { $addToSet: { products: productId } }
  } else if (action === 'remove') {
    update = { $pull: { products: productId } }
  } else {
    return Response.json({ error: 'action must be "add" or "remove"' }, { status: 400 })
  }

  const collection = await Collection.findByIdAndUpdate(id, update, { new: true }).lean()
  if (!collection) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(collection)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const deleted = await Collection.findByIdAndDelete(id)
  if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ success: true })
}
