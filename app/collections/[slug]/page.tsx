import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import ComingSoonPlaceholder from '@/app/house-of-bora-honeys/_components/ComingSoonPlaceholder'
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
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface PopulatedProduct {
  _id: { toString(): string }
  name: string
  slug: string
  price: number
  images: { url: string }[]
  categories: { name: string; slug: string }[]
  isActive: boolean
}

async function getCollection(slug: string) {
  await connectDB()
  Product.modelName
  Category.modelName
  return Collection.findOne({ slug, isActive: true })
    .populate({
      path: 'products',
      match: { isActive: true },
      populate: { path: 'categories', select: 'name slug' },
      select: 'name slug price images categories isActive',
    })
    .lean()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) return { title: 'Collection Not Found' }
  return {
    title: `${collection.name} — BORA HONEY'S`,
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
        <section className="border-b border-border">
          <Breadcrumb className="px-6 mb-[40px]">
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
          {/* <h1 className="text-3xl px-6 md:text-4xl font-medium tracking-[0.08em] text-foreground mb-4">
            {collection.name}
          </h1> */}
          {/* {collection.subheading && (
            <p className="text-base tracking-[0.15em] mb-3 uppercase px-6 text-muted-foreground mb-3">
              {collection.subheading}
            </p>
          )} */}
          {collection.video?.url ? (
            <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-muted/20">
              <video
                src={collection.video.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          ) : collection.image?.url ? (
            <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-muted/20">
              <Image
                src={collection.image.url}
                alt={collection.name}
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          ) : null}

          <div className="max-w-screen-xl mx-auto px-6 py-12">

            {/* <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Collection</p> */}

            {collection.description && (
              <p className="text-sm font-light text-white leading-relaxed mb-4 whitespace-pre-line">
                {collection.description}
              </p>
            )}
            {!collection.comingSoon && (
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40">
                {products.length} {products.length === 1 ? 'piece' : 'pieces'}
              </p>
            )}
          </div>
        </section>

        {/* Product grid */}
        <div className="max-w-screen-xl mx-auto">
          {collection.comingSoon ? (
            <div className="py-16 px-6">
              <ComingSoonPlaceholder className="mx-auto max-w-md aspect-square" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
              <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-4">
                No pieces in this collection yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-background px-4 py-4 md:p-6">
              {products.map(product => {
                const primaryCategory = (product.categories as { name: string; slug: string }[])[0]

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
                          sizes="(max-width:768px) 100vw, 50vw"
                          className="object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                          <span className="text-[9px] tracking-widest uppercase text-muted-foreground/20">
                            No image
                          </span>
                        </div>
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
                          {product.price > 0 ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
