import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import Category from '@/lib/models/Category'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const categorySchemaRegistering = Category.modelName;
  const { slug } = await params
  const product = await Product.findOne({ slug }).populate('categories', 'name slug').lean()
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(product)
}
