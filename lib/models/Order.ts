import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrderItem {
  product: mongoose.Types.ObjectId
  name: string
  image?: string
  price: number
  quantity: number
}

export interface IOrderShippingAddress {
  fullName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId
  items: IOrderItem[]
  shippingAddress: IOrderShippingAddress
  subtotal: number
  total: number
  currency: string
  status: OrderStatus
  razorpayOrderId: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const OrderShippingAddressSchema = new Schema<IOrderShippingAddress>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'IN' },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], default: [] },
    shippingAddress: { type: OrderShippingAddressSchema, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled'],
      default: 'pending',
    },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paidAt: { type: Date },
  },
  { timestamps: true }
)

OrderSchema.index({ user: 1, createdAt: -1 })

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>('Order', OrderSchema)

export default Order
