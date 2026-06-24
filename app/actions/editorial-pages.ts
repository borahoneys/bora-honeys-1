'use server'

import { connectDB } from '@/lib/db/mongoose'
import EditorialPage, { IEditorialSection } from '@/lib/models/EditorialPage'
import { verifyAdminSession } from '@/app/lib/dal'
import { revalidatePath } from 'next/cache'

export async function getEditorialPage(pageType: 'timeless-classics' | 'capsule-collection') {
  await connectDB()
  const page = await EditorialPage.findOne({ pageType }).lean()
  if (page) return JSON.parse(JSON.stringify(page))
  return {
    pageType,
    title: '',
    subtitle: '',
    description: '',
    heroSections: [],
    products: [],
    isActive: true,
  }
}

export async function saveEditorialPage(
  pageType: 'timeless-classics' | 'capsule-collection',
  data: {
    title: string
    subtitle?: string
    description?: string
    heroSections: IEditorialSection[]
    products: string[]
    isActive: boolean
  }
) {
  await verifyAdminSession()
  await connectDB()

  await EditorialPage.findOneAndUpdate(
    { pageType },
    { ...data, pageType },
    { upsert: true, new: true }
  )

  revalidatePath(`/${pageType}`)
  return { success: true }
}
