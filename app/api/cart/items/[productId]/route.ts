import { auth } from '@/auth'
import { connectDB } from '@/lib/db/mongoose'
import Cart from '@/lib/models/Cart'
import Product from '@/lib/models/Product'
import { z } from 'zod'

const populateOptions = 'name slug price images stock isActive'

interface RouteContext {
  params: Promise<{ productId: string }>
}

const UpdateItemSchema = z.object({
  quantity: z.number().int().min(0).max(20),
})

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId } = await params
  const body = await request.json()
  const parsed = UpdateItemSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  await connectDB()
  const cart = await Cart.findOne({ user: session.user.id })
  if (!cart) {
    return Response.json({ error: 'Cart not found' }, { status: 404 })
  }

  if (parsed.data.quantity <= 0) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId)
  } else {
    const item = cart.items.find((item) => item.product.toString() === productId)
    if (!item) {
      return Response.json({ error: 'Item not in cart' }, { status: 404 })
    }
    const product = await Product.findById(productId).lean()
    item.quantity = product ? Math.min(parsed.data.quantity, Math.max(product.stock, 0)) : parsed.data.quantity
  }

  await cart.save()
  await cart.populate('items.product', populateOptions)

  return Response.json({ items: cart.items })
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId } = await params

  await connectDB()
  const cart = await Cart.findOne({ user: session.user.id })
  if (cart) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId)
    await cart.save()
    await cart.populate('items.product', populateOptions)
  }

  return Response.json({ items: cart?.items ?? [] })
}
