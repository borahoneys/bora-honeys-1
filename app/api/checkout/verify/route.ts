import crypto from 'crypto'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db/mongoose'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import Cart from '@/lib/models/Cart'
import { z } from 'zod'

const VerifySchema = z.object({
  orderId: z.string(),
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = VerifySchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data

  await connectDB()

  const order = await Order.findOne({ _id: orderId, user: session.user.id })
  if (!order) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }

  if (order.status === 'paid') {
    return Response.json({ success: true, orderId: order._id.toString() })
  }

  if (order.razorpayOrderId !== razorpay_order_id) {
    return Response.json({ error: 'Order mismatch' }, { status: 400 })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return Response.json({ error: 'Payment is not configured' }, { status: 500 })
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    order.status = 'failed'
    await order.save()
    return Response.json({ error: 'Payment verification failed' }, { status: 400 })
  }

  order.status = 'paid'
  order.razorpayPaymentId = razorpay_payment_id
  order.razorpaySignature = razorpay_signature
  order.paidAt = new Date()
  await order.save()

  await Promise.all(
    order.items.map((item) =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    )
  )

  await Cart.findOneAndUpdate({ user: session.user.id }, { items: [] })

  return Response.json({ success: true, orderId: order._id.toString() })
}
