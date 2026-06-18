import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import { auth } from '@/auth'
import Category from '@/lib/models/Category';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const categorySchemaRegistering = Category.modelName;
  const { id } = await params
  const product = await Product.findById(id).populate('categories', 'name slug').lean()
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(product)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const categorySchemaRegistering = Category.modelName;
  const { id } = await params
  const body = await request.json()

  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).populate('categories', 'name slug')

  if (!product) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(product)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ success: true })
}
