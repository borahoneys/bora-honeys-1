import { connectDB } from '@/lib/db/mongoose'
import Category from '@/lib/models/Category'
import { auth } from '@/auth'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const category = await Category.findById(id).lean()
  if (!category) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(category)
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
  const { name, description, image, isActive } = body

  const category = await Category.findByIdAndUpdate(
    id,
    { name, description, image, isActive },
    { new: true, runValidators: true }
  ).lean()

  if (!category) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(category)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { id } = await params
  const deleted = await Category.findByIdAndDelete(id)
  if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ success: true })
}
