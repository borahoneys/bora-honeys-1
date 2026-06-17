import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { connectDB } from '@/lib/db/mongoose'
import Collection from '@/lib/models/Collection'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface PopulatedProduct {
  _id: { toString(): string }
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  images: { url: string }[]
  categories: { name: string; slug: string }[]
  isActive: boolean
}

async function getCollection(slug: string) {
  await connectDB()
  return Collection.findOne({ slug, isActive: true })
    .populate({
      path: 'products',
      match: { isActive: true },
      populate: { path: 'categories', select: 'name slug' },
      select: 'name slug price compareAtPrice images categories isActive',
    })
    .lean()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) return { title: 'Collection Not Found' }
  return {
    title: `${collection.name} — Bora Honeys`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) notFound()

  const products = (collection.products as unknown as PopulatedProduct[]).filter(p => p.isActive)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero / Header */}
        <section className="px-6 py-14 border-b border-border">
          <div className="max-w-4xl">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{collection.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Collection</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-4">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-sm font-light text-muted-foreground max-w-xl leading-relaxed">
                {collection.description}
              </p>
            )}
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-5">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </section>

        {/* Product grid */}
        <section className="px-6 py-12">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
                No pieces in this collection yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
              {products.map(product => {
                const primaryCategory = (product.categories as { name: string; slug: string }[])[0]
                const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price

                return (
                  <Link
                    key={product._id.toString()}
                    href={`/products/${product.slug}`}
                    className="group bg-background block overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30" />
                      )}
                      {isOnSale && (
                        <span className="absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase bg-background text-foreground px-2 py-1 border border-border">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      {primaryCategory && (
                        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                          {primaryCategory.name}
                        </p>
                      )}
                      <h3 className="text-sm font-light text-foreground group-hover:text-primary transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm font-light text-foreground">
                          €{product.price.toLocaleString()}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs font-light text-muted-foreground line-through">
                            €{product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
