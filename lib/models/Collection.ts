import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICollection extends Document {
  name: string
  slug: string
  subheading?: string
  description?: string
  image?: { url: string; publicId: string }
  video?: { url: string; publicId: string; poster?: string }
  products: mongoose.Types.ObjectId[]
  isActive: boolean
  comingSoon: boolean
  createdAt: Date
  updatedAt: Date
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subheading: { type: String, trim: true },
    description: { type: String, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    video: {
      url: { type: String },
      publicId: { type: String },
      poster: { type: String },
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    isActive: { type: Boolean, default: true },
    comingSoon: { type: Boolean, default: false },
  },
  { timestamps: true }
)

CollectionSchema.index({ slug: 1 })

const Collection: Model<ICollection> =
  mongoose.models.Collection ?? mongoose.model<ICollection>('Collection', CollectionSchema)

export default Collection
