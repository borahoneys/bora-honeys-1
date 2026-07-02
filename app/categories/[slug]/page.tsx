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
import Category from '@/lib/models/Category'
import Product from '@/lib/models/Product'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

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

async function getCategoryWithProducts(slug: string) {
  await connectDB()

  const category = await Category.findOne({ slug, isActive: true }).lean()
  if (!category) return null

  const products = await Product.find({ categories: category._id, isActive: true })
    .populate('categories', 'name slug')
    .select('name slug price compareAtPrice images categories isActive')
    .sort({ createdAt: -1 })
    .lean()

  return { category, products: products as unknown as PopulatedProduct[] }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getCategoryWithProducts(slug)
  if (!data) return { title: 'Category Not Found' }
  return {
    title: `${data.category.name} — Bora Honeys`,
    description: data.category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCategoryWithProducts(slug)

  if (!data) notFound()

  const { category, products } = data

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero / Header */}
        <section className="px-6 py-12 border-b border-border">
          <div className="max-w-screen-xl mx-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Category</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-sm font-light text-muted-foreground max-w-xl leading-relaxed mb-4">
                {category.description}
              </p>
            )}
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </section>

        {/* Product grid */}
        <div className="max-w-screen-xl mx-auto">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
              <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-4">
                No pieces in this category yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-background px-4 py-4 md:p-6">
              {products.map(product => {
                const primaryCategory = product.categories[0]
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
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs font-light text-muted-foreground line-through">
                            ₹{product.compareAtPrice.toLocaleString('en-IN')}
                          </span>
                        )}
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
