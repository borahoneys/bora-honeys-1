import mongoose, { Schema, Document } from 'mongoose'

export interface IImageAsset {
  url: string
  publicId: string
}

export interface ICTAButton {
  label: string
  href: string
}

export interface IHomepageSection {
  type: 'image' | 'video'
  desktopImage?: IImageAsset
  mobileImage?: IImageAsset
  video?: IImageAsset
  button?: ICTAButton
  isActive: boolean
  order: number
}

export interface IHomepageConfig extends Document {
  sections: IHomepageSection[]
}

const ImageAssetSchema = new Schema<IImageAsset>(
  { url: { type: String, required: true }, publicId: { type: String, required: true } },
  { _id: false }
)

const CTAButtonSchema = new Schema<ICTAButton>(
  { label: { type: String, required: true }, href: { type: String, required: true } },
  { _id: false }
)

const HomepageSectionSchema = new Schema<IHomepageSection>({
  type: { type: String, enum: ['image', 'video'], required: true },
  desktopImage: ImageAssetSchema,
  mobileImage: ImageAssetSchema,
  video: ImageAssetSchema,
  button: CTAButtonSchema,
  isActive: { type: Boolean, default: true },
  order: { type: Number, required: true },
})

const HomepageConfigSchema = new Schema<IHomepageConfig>({ sections: [HomepageSectionSchema] }, { timestamps: true })

export const HomepageConfig =
  mongoose.models.HomepageConfig ||
  mongoose.model<IHomepageConfig>('HomepageConfig', HomepageConfigSchema)
