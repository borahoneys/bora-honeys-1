import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@/auth'

console.log(process.env.CLOUDINARY_CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  if (!session?.user || (role !== 'admin' && role !== 'super_admin')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || 'bora-honeys'
  const resourceType = (formData.get('resourceType') as string) || 'image'

  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder, resource_type: resourceType as 'image' | 'video' | 'raw' | 'auto' },
          (error, result) => {
            if (error || !result) reject(error)
            else resolve(result as { secure_url: string; public_id: string })
          }
        )
        .end(buffer)
    })

    return Response.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
