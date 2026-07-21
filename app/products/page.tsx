import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import Category from '@/lib/models/Category'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import FilterPanel from '@/components/products/FilterPanel'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Pieces — Bora Honeys',
  description: 'Browse our complete collection of luxury couture pieces. Filter by category, price, and more.',
}

const LIMIT = 16

type SP = Promise<{ [key: string]: string | string[] | undefined }>

function getString(val: string | string[] | undefined): string {
  return typeof val === 'string' ? val : ''
}

async function fetchPageData(sp: Awaited<SP>) {
  await connectDB()
  void Category.modelName // ensure Category model is registered for populate

  const q = getString(sp.q).trim()
  const cat = getString(sp.cat)
  const sort = getString(sp.sort) || 'newest'
  const minRaw = parseFloat(getString(sp.min))
  const maxRaw = parseFloat(getString(sp.max))
  const onSale = getString(sp.sale) === 'true'
  const featured = getString(sp.featured) === 'true'
  const page = Math.max(1, parseInt(getString(sp.page) || '1', 10))

  const filter: Record<string, unknown> = { isActive: true }
  if (q) filter.$text = { $search: q }
  if (cat) filter.categories = cat
  if (featured) filter.isFeatured = true
  if (onSale) {
    filter.$expr = {
      $and: [
        { $ifNull: ['$compareAtPrice', false] },
        { $gt: ['$compareAtPrice', '$price'] },
      ],
    }
  }

  const priceFilter: Record<string, number> = {}
  if (!isNaN(minRaw) && minRaw >= 0) priceFilter.$gte = minRaw
  if (!isNaN(maxRaw) && maxRaw > 0) priceFilter.$lte = maxRaw
  if (Object.keys(priceFilter).length) filter.price = priceFilter

  const sortMap: Record<string, [string, 1 | -1][]> = {
    newest: [['createdAt', -1]],
    price_asc: [['price', 1]],
    price_desc: [['price', -1]],
    name_asc: [['name', 1]],
    name_desc: [['name', -1]],
  }
  const sortOrder = sortMap[sort] ?? sortMap.newest

  const [products, total, categories] = await Promise.all([
    Product.find(filter)
      .populate('categories', 'name slug')
      .sort(sortOrder)
      .skip((page - 1) * LIMIT)
      .limit(LIMIT)
      .lean(),
    Product.countDocuments(filter),
    Category.find({ isActive: true }).sort({ name: 1 }).lean(),
  ])

  return {
    products,
    total,
    categories: categories.map((c) => ({
      _id: (c._id as { toString(): string }).toString(),
      name: c.name,
      slug: c.slug,
    })),
    page,
    pages: Math.ceil(total / LIMIT),
  }
}

interface PopulatedProduct {
  _id: { toString(): string }
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  images: { url: string }[]
  categories: { name: string; slug: string }[]
}

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const { products, total, categories, page, pages } = await fetchPageData(sp)

  const q = getString(sp.q).trim()

  // Build a URL preserving all current params except page
  function pageHref(p: number) {
    const params = new URLSearchParams()
    const keep = ['q', 'cat', 'sort', 'min', 'max', 'sale', 'featured']
    keep.forEach((k) => {
      const v = getString(sp[k])
      if (v) params.set(k, v)
    })
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/products${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="pt-20 flex-1">
        {/* Page header */}
        <section className="px-6 py-12 border-b border-border">
          <div className="max-w-screen-xl mx-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Pieces</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
              The Edit
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-4">
              {q ? (
                <>
                  Results for{' '}
                  <span className="text-primary">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                'All Pieces'
              )}
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40">
              {total} {total === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </section>

        {/* Content: sidebar + grid */}
        <div className="max-w-screen-xl mx-auto md:flex">
          {/* Filter sidebar — wrapped in Suspense because it uses useSearchParams */}
          <Suspense fallback={<div className="md:w-56 md:shrink-0 md:border-r border-border" />}>
            <FilterPanel categories={categories} />
          </Suspense>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground/40 mb-4">
                  No pieces found
                </p>
                <p className="text-xs font-light text-muted-foreground/25">
                  Try adjusting your filters or search terms
                </p>
                <Link
                  href="/products"
                  className="mt-8 text-[10px] tracking-[0.25em] uppercase text-primary/60 hover:text-primary transition-colors"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-background px-4 py-4 md:p-6">
                  {(products as unknown as PopulatedProduct[]).map((product) => {
                    const primaryCategory = product.categories[0]
                    const isOnSale =
                      product.compareAtPrice && product.compareAtPrice > product.price

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

                {/* Pagination */}
                {pages > 1 && (
                  <div className="px-6 py-10 flex items-center justify-center gap-2 border-t border-border">
                    {page > 1 && (
                      <Link
                        href={pageHref(page - 1)}
                        className="px-3 h-8 flex items-center text-xs font-light text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground transition-colors"
                      >
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={pageHref(p)}
                        className={cn(
                          'w-8 h-8 flex items-center justify-center text-xs font-light border transition-colors',
                          p === page
                            ? 'border-primary text-primary bg-primary/10'
                            : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                        )}
                      >
                        {p}
                      </Link>
                    ))}
                    {page < pages && (
                      <Link
                        href={pageHref(page + 1)}
                        className="px-3 h-8 flex items-center text-xs font-light text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
