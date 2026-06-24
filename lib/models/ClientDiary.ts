import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IClientDiary extends Document {
  clientName: string
  title?: string
  quote: string
  image?: { url: string; publicId: string }
  date?: Date
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ClientDiarySchema = new Schema<IClientDiary>(
  {
    clientName: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    quote: { type: String, required: true, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    date: { type: Date },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

ClientDiarySchema.index({ isPublished: 1, order: 1 })

const ClientDiary: Model<IClientDiary> =
  mongoose.models.ClientDiary ?? mongoose.model<IClientDiary>('ClientDiary', ClientDiarySchema)

export default ClientDiary
