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

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: { canonical: '/collections' },
  title: 'Collections — Luxury Indian Couture',
  description: 'Explore our curated collections.',
}

interface PopulatedCollection {
  _id: { toString(): string }
  name: string
  slug: string
  description?: string
  image?: { url: string }
  products: { images: { url: string }[] }[]
}

async function getCollections() {
  await connectDB()
  const collections = await Collection.find({ isActive: true })
    .populate('products', 'images')
    .sort({ name: 1 })
    .lean()
  return collections as unknown as PopulatedCollection[]
}

export default async function CollectionsPage() {
  const collections = await getCollections()

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
                  <BreadcrumbPage>Collections</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Catalogue</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-4">
              Collections
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-5">
              {collections.length} {collections.length === 1 ? 'collection' : 'collections'}
            </p>
          </div>
        </section>

        {/* Collections grid */}
        <section className="px-6 py-12">
          {collections.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
                No collections yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
              {collections.map(collection => {
                const coverImage = collection.image?.url ?? collection.products.find(p => p.images[0])?.images[0]?.url

                return (
                  <Link
                    key={collection._id.toString()}
                    href={`/collections/${collection.slug}`}
                    className="group bg-background block overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={collection.name}
                          fill
                          sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-light text-foreground group-hover:text-primary transition-colors leading-snug">
                        {collection.name}
                      </h3>
                      {/* <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
                        {collection.products.length} {collection.products.length === 1 ? 'piece' : 'pieces'}
                      </p> */}
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
