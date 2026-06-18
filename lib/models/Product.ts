import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProductImage {
  url: string
  publicId: string
}

export interface IProduct extends Document {
  name: string
  slug: string
  description?: string
  price: number
  compareAtPrice?: number
  images: IProductImage[]
  categories: mongoose.Types.ObjectId[]
  color?: string
  styleCode?: string
  numberOfPieces?: number
  composition?: string
  keyFeatures?: string
  careInstructions?: string
  deliveryTimeline?: string
  stock: number
  sku?: string
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  seo?: { title?: string; description?: string }
  createdAt: Date
  updatedAt: Date
}

const ProductImageSchema = new Schema<IProductImage>(
  { url: { type: String, required: true }, publicId: { type: String, required: true } },
  { _id: false }
)

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: { type: [ProductImageSchema], default: [] },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    color: { type: String, trim: true },
    styleCode: { type: String, trim: true },
    numberOfPieces: { type: Number, min: 1 },
    composition: { type: String, trim: true },
    keyFeatures: { type: String, trim: true },
    careInstructions: { type: String, trim: true },
    deliveryTimeline: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, trim: true },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },
  },
  { timestamps: true }
)

ProductSchema.index({ slug: 1 })
ProductSchema.index({ categories: 1 })
ProductSchema.index({ isActive: 1, isFeatured: 1 })
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>('Product', ProductSchema)

export default Product
