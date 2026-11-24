import type { MetadataRoute } from 'next'
import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import Collection from '@/lib/models/Collection'
import Category from '@/lib/models/Category'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const staticRoutes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/products', priority: 0.9, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/bespoke-couture', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/capsule-collection', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/timeless-classics', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/house-of-bora-honeys', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/client-diaries', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/contact-us', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/payments-shipping-refunds', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal-dispute-resolution', priority: 0.2, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  try {
    await connectDB()
    const [products, collections, categories] = await Promise.all([
      Product.find({ isActive: true }).select('slug updatedAt images').lean(),
      Collection.find({ isActive: true }).select('slug updatedAt').lean(),
      Category.find({ isActive: true }).select('slug updatedAt').lean(),
    ])
    for (const p of products) {
      entries.push({
        url: `${SITE_URL}/products/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
        images: (p.images ?? []).slice(0, 5).map((i: { url: string }) => i.url),
      })
    }
    for (const c of collections) {
      entries.push({ url: `${SITE_URL}/collections/${c.slug}`, lastModified: c.updatedAt, changeFrequency: 'weekly', priority: 0.7 })
    }
    for (const c of categories) {
      entries.push({ url: `${SITE_URL}/categories/${c.slug}`, lastModified: c.updatedAt, changeFrequency: 'weekly', priority: 0.7 })
    }
  } catch {
    // DB unavailable: still serve the static portion of the sitemap.
  }
  return entries
}
