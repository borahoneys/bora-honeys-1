'use server'

import { connectDB } from '@/lib/db/mongoose'
import { HomepageConfig, IHomepageSection } from '@/lib/models/HomepageConfig'
import { verifyAdminSession } from '@/app/lib/dal'
import { revalidatePath } from 'next/cache'

export async function getHomepageConfig() {
  await connectDB()
  const config = await HomepageConfig.findOne().lean()
  return config ? JSON.parse(JSON.stringify(config)) : { sections: [] }
}

export async function saveHomepageConfig(sections: IHomepageSection[]) {
  await verifyAdminSession()
  await connectDB()

  await HomepageConfig.findOneAndUpdate({}, { sections }, { upsert: true, new: true })

  revalidatePath('/')
  return { success: true }
}
