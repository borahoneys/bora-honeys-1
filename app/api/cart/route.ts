import { auth } from '@/auth'
import { connectDB } from '@/lib/db/mongoose'
import Cart from '@/lib/models/Cart'
import Product from '@/lib/models/Product'
import { z } from 'zod'

const populateOptions = 'name slug price images stock isActive'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ items: [] })
  }

  await connectDB()
  const cart = await Cart.findOne({ user: session.user.id }).populate('items.product', populateOptions)
  return Response.json({ items: cart?.items ?? [] })
}

const AddItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(20).default(1),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = AddItemSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const { productId, quantity } = parsed.data

  await connectDB()
  const product = await Product.findById(productId).lean()
  if (!product || !product.isActive) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }
  if (product.stock <= 0) {
    return Response.json({ error: 'This item is out of stock' }, { status: 400 })
  }

  let cart = await Cart.findOne({ user: session.user.id })
  if (!cart) {
    cart = new Cart({ user: session.user.id, items: [] })
  }

  const existingItem = cart.items.find((item) => item.product.toString() === productId)
  const nextQuantity = Math.min((existingItem?.quantity ?? 0) + quantity, product.stock)

  if (existingItem) {
    existingItem.quantity = nextQuantity
  } else {
    cart.items.push({ product: product._id, quantity: nextQuantity })
  }

  await cart.save()
  await cart.populate('items.product', populateOptions)

  return Response.json({ items: cart.items })
}
