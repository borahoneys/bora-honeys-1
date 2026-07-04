export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import { getEditorialPage } from '@/app/actions/editorial-pages'
import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import type { Metadata } from 'next'

interface ImageAsset { url: string; publicId: string }
interface CTAButton { label: string; href: string }
interface EditorialSection {
  type: 'image' | 'video'
  desktopImage?: ImageAsset; mobileImage?: ImageAsset; video?: ImageAsset
  button?: CTAButton; isActive: boolean; order: number
}

interface PopulatedProduct {
  _id: { toString(): string }
  name: string; slug: string; price: number; compareAtPrice?: number
  images: { url: string }[]; categories: { name: string; slug: string }[]; isActive: boolean
}

async function getProducts(productIds: string[]) {
  if (!productIds.length) return []
  await connectDB()
  const products = await Product.find({ _id: { $in: productIds }, isActive: true })
    .populate('categories', 'name slug')
    .select('name slug price compareAtPrice images categories isActive')
    .lean()
  const idOrder = new Map(productIds.map((id, i) => [id, i]))
  return (products as unknown as PopulatedProduct[]).sort(
    (a, b) => (idOrder.get(a._id.toString()) ?? 999) - (idOrder.get(b._id.toString()) ?? 999)
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEditorialPage('timeless-classics')
  return {
    title: `${data.title || 'Timeless Classics'} — Bora Honeys`,
    description: data.description,
  }
}

export default async function TimelessClassicsPage() {
  const data = await getEditorialPage('timeless-classics')

  if (!data.isActive) notFound()

  const sections: EditorialSection[] = ((data.heroSections ?? []) as EditorialSection[])
    .filter(s => s.isActive)
    .sort((a, b) => a.order - b.order)

  const products = await getProducts((data.products ?? []).map(String))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Sections */}
        {sections.map((section, idx) => {
          if (section.type === 'video' && section.video) {
            return (
              <section key={idx} className="relative w-screen h-screen overflow-hidden">
                <video src={section.video.url} autoPlay loop muted playsInline
                  className="absolute -translate-x-1/2 left-1/2 inset-0 w-auto h-full object-contain" />
                {section.button && (
                  <div className="absolute inset-0 flex items-end justify-center pb-20">
                    <Link href={section.button.href} className="bg-primary text-primary-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                      {section.button.label}
                    </Link>
                  </div>
                )}
              </section>
            )
          }
          if (section.type === 'image') {
            const desktop = section.desktopImage; const mobile = section.mobileImage
            if (!desktop && !mobile) return null
            const hasBoth = desktop && mobile
            return (
              <section key={idx} className="relative w-screen h-screen overflow-hidden">
                {hasBoth ? (
                  <>
                    <Image src={desktop!.url} fill className="object-cover object-top hidden md:block" alt="Bora Honeys Timeless Classics — luxury Indian couture collection" priority={idx === 0} sizes="100vw" />
                    <Image src={mobile!.url} fill className="object-cover object-top md:hidden" alt="Bora Honeys Timeless Classics — luxury Indian couture collection" priority={idx === 0} sizes="100vw" />
                  </>
                ) : (
                  <Image src={(desktop ?? mobile)!.url} fill className="object-cover object-top" alt="Bora Honeys Timeless Classics — luxury Indian couture collection" priority={idx === 0} sizes="100vw" />
                )}
                {section.button && (
                  <div className="absolute inset-0 flex items-end justify-center pb-20">
                    <Link href={section.button.href} className="bg-primary text-primary-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                      {section.button.label}
                    </Link>
                  </div>
                )}
              </section>
            )
          }
          return null
        })}

        {/* Page Header */}
        <section className="px-6 py-14 border-b border-border">
          <div className="max-w-4xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Bora Honeys</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-3">
              {data.title || 'Timeless Classics'}
            </h1>
            {data.subtitle && (
              <p className="text-lg font-light text-muted-foreground mb-4">{data.subtitle}</p>
            )}
            {data.description && (
              <p className="text-sm font-light text-muted-foreground max-w-xl leading-relaxed">{data.description}</p>
            )}
            {products.length > 0 && (
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-5">
                {products.length} {products.length === 1 ? 'piece' : 'pieces'}
              </p>
            )}
          </div>
        </section>

        {/* Product Grid */}
        {products.length > 0 && (
          <section className="px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
              {products.map(product => {
                const primaryCategory = (product.categories as { name: string; slug: string }[])[0]
                const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
                return (
                  <Link key={product._id.toString()} href={`/products/${product.slug}`}
                    className="group bg-background block overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                      {product.images[0] ? (
                        <Image src={product.images[0].url} alt={product.name} fill
                          sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-muted/30" />
                      )}
                      {isOnSale && (
                        <span className="absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase bg-background text-foreground px-2 py-1 border border-border">Sale</span>
                      )}
                    </div>
                    <div className="p-4">
                      {primaryCategory && (
                        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{primaryCategory.name}</p>
                      )}
                      <h3 className="text-sm font-light text-foreground group-hover:text-primary transition-colors leading-snug">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm font-light text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.compareAtPrice && (
                          <span className="text-xs font-light text-muted-foreground line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {products.length === 0 && (
          <section className="px-6 py-20 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">No pieces here yet</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
