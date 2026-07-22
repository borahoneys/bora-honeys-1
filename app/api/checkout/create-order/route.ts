import { auth } from '@/auth'
import { connectDB } from '@/lib/db/mongoose'
import Cart from '@/lib/models/Cart'
import '@/lib/models/Product'
import type { IProduct } from '@/lib/models/Product'
import Order from '@/lib/models/Order'
import User from '@/lib/models/User'
import { getRazorpay } from '@/lib/razorpay'
import { CheckoutAddressSchema } from '@/app/lib/definitions'
import { z } from 'zod'

const CreateOrderSchema = z.object({
  shippingAddress: CheckoutAddressSchema,
  saveAddress: z.boolean().optional().default(false),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = CreateOrderSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Please check the address details you entered.' }, { status: 400 })
  }
  const { shippingAddress, saveAddress } = parsed.data

  await connectDB()

  const cart = await Cart.findOne({ user: session.user.id }).populate<{
    items: { product: IProduct; quantity: number }[]
  }>('items.product', 'name price images stock isActive')

  if (!cart || cart.items.length === 0) {
    return Response.json({ error: 'Your bag is empty.' }, { status: 400 })
  }

  for (const item of cart.items) {
    if (!item.product || !item.product.isActive) {
      return Response.json({ error: 'One of the items in your bag is no longer available.' }, { status: 400 })
    }
    if (item.product.stock < item.quantity) {
      return Response.json({ error: `Only ${item.product.stock} left of ${item.product.name}.` }, { status: 400 })
    }
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.images?.[0]?.url,
    price: item.product.price,
    quantity: item.quantity,
  }))

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  try {
    const razorpay = getRazorpay()
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: `receipt_${session.user.id}_${Date.now()}`,
    })

    const order = await Order.create({
      user: session.user.id,
      items: orderItems,
      shippingAddress,
      subtotal,
      total,
      currency: 'INR',
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
    })

    if (saveAddress) {
      await User.findByIdAndUpdate(session.user.id, {
        $push: {
          addresses: {
            label: 'Home',
            fullName: shippingAddress.fullName,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: shippingAddress.phone,
            isDefault: false,
          },
        },
      })
    }

    return Response.json({
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      orderId: order._id.toString(),
    })
  } catch (error) {
    console.error('Failed to create Razorpay order', error)
    return Response.json({ error: 'Unable to start payment. Please try again.' }, { status: 502 })
  }
}
