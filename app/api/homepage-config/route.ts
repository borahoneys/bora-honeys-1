import { connectDB } from '@/lib/db/mongoose'
import { HomepageConfig } from '@/lib/models/HomepageConfig'

export async function GET() {
  await connectDB()
  const config = await HomepageConfig.findOne().lean()
  return Response.json(config ?? { sections: [] })
}
