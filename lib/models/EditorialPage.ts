import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IImageAsset {
  url: string
  publicId: string
}

export interface ICTAButton {
  label: string
  href: string
}

export interface IEditorialSection {
  type: 'image' | 'video'
  desktopImage?: IImageAsset
  mobileImage?: IImageAsset
  video?: IImageAsset
  button?: ICTAButton
  isActive: boolean
  order: number
}

export interface IEditorialPage extends Document {
  pageType: 'timeless-classics' | 'capsule-collection'
  title: string
  subtitle?: string
  description?: string
  heroSections: IEditorialSection[]
  products: mongoose.Types.ObjectId[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ImageAssetSchema = new Schema<IImageAsset>(
  { url: { type: String, required: true }, publicId: { type: String, required: true } },
  { _id: false }
)

const CTAButtonSchema = new Schema<ICTAButton>(
  { label: { type: String, required: true }, href: { type: String, required: true } },
  { _id: false }
)

const EditorialSectionSchema = new Schema<IEditorialSection>({
  type: { type: String, enum: ['image', 'video'], required: true },
  desktopImage: ImageAssetSchema,
  mobileImage: ImageAssetSchema,
  video: ImageAssetSchema,
  button: CTAButtonSchema,
  isActive: { type: Boolean, default: true },
  order: { type: Number, required: true },
})

const EditorialPageSchema = new Schema<IEditorialPage>(
  {
    pageType: { type: String, enum: ['timeless-classics', 'capsule-collection'], required: true, unique: true },
    title: { type: String, default: '' },
    subtitle: { type: String },
    description: { type: String },
    heroSections: [EditorialSectionSchema],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const EditorialPage: Model<IEditorialPage> =
  mongoose.models.EditorialPage ?? mongoose.model<IEditorialPage>('EditorialPage', EditorialPageSchema)

export default EditorialPage
