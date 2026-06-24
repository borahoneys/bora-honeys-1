'use server'

import { connectDB } from '@/lib/db/mongoose'
import ClientDiary from '@/lib/models/ClientDiary'
import { verifyAdminSession } from '@/app/lib/dal'
import { revalidatePath } from 'next/cache'

export async function getClientDiaries(publishedOnly = false) {
  await connectDB()
  const filter = publishedOnly ? { isPublished: true } : {}
  const entries = await ClientDiary.find(filter).sort({ order: 1, createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(entries))
}

export async function createClientDiary(data: {
  clientName: string
  title?: string
  quote: string
  image?: { url: string; publicId: string }
  date?: string
  isPublished: boolean
  order: number
}) {
  await verifyAdminSession()
  await connectDB()
  const entry = await ClientDiary.create(data)
  revalidatePath('/client-diaries')
  return JSON.parse(JSON.stringify(entry))
}

export async function updateClientDiary(
  id: string,
  data: {
    clientName?: string
    title?: string
    quote?: string
    image?: { url: string; publicId: string } | null
    date?: string
    isPublished?: boolean
    order?: number
  }
) {
  await verifyAdminSession()
  await connectDB()
  const entry = await ClientDiary.findByIdAndUpdate(id, data, { new: true }).lean()
  revalidatePath('/client-diaries')
  return JSON.parse(JSON.stringify(entry))
}

export async function deleteClientDiary(id: string) {
  await verifyAdminSession()
  await connectDB()
  await ClientDiary.findByIdAndDelete(id)
  revalidatePath('/client-diaries')
  return { success: true }
}
