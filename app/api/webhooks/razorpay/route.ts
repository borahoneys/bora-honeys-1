import crypto from 'crypto'
import { connectDB } from '@/lib/db/mongoose'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import Cart from '@/lib/models/Cart'

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  const rawBody = await request.text()

  if (!secret) {
    // Webhook not configured — client-side verification in /api/checkout/verify is the primary path.
    return Response.json({ received: true })
  }

  const signature = request.headers.get('x-razorpay-signature')
  const expectedSignature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

  if (!signature || signature !== expectedSignature) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(rawBody)

  if (event.event === 'payment.captured') {
    const payment = event.payload?.payment?.entity
    const razorpayOrderId = payment?.order_id
    const razorpayPaymentId = payment?.id

    if (razorpayOrderId) {
      await connectDB()
      const order = await Order.findOne({ razorpayOrderId })

      if (order && order.status !== 'paid') {
        order.status = 'paid'
        order.razorpayPaymentId = razorpayPaymentId
        order.paidAt = new Date()
        await order.save()

        await Promise.all(
          order.items.map((item) =>
            Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
          )
        )
        await Cart.findOneAndUpdate({ user: order.user }, { items: [] })
      }
    }
  }

  return Response.json({ received: true })
}
