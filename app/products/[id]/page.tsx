import { Suspense, cache } from 'react'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import Category from '@/lib/models/Category'
import { ProductSkeleton } from '@/components/ui/PageSkeleton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/footer"
import Link from "next/link"
import ProductImageGallery from "@/components/products/ProductImageGallery"
import ProductInfo from "@/components/products/ProductInfo"
import ProductDescription from "@/components/products/ProductDescription"
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, absoluteUrl, clip } from '@/lib/seo'

interface PageProps {
  params: Promise<{ id: string }>
}

// Query the DB directly (no HTTP hop to our own API) and dedupe between
// generateMetadata and the page render within one request.
const getProduct = cache(async (slug: string) => {
  await connectDB()
  void Category.modelName
  const product = await Product.findOne({ slug }).populate('categories', 'name slug').lean()
  return product ? JSON.parse(JSON.stringify(product)) : null
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Product Not Found' }
  const title = product.seo?.title ?? `${product.name} — Luxury Indian Couture`
  const description =
    clip(product.seo?.description ?? product.description) ??
    `${product.name} by BORA HONEY'S — hand-embroidered Indian couture, made in India and shipped worldwide.`
  const image = product.images?.[0]?.url
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    keywords: product.searchKeywords?.length ? product.searchKeywords : undefined,
    alternates: { canonical: `/products/${id}` },
    openGraph: { title, description, url: `/products/${id}`, type: 'website', images: image ? [{ url: image, alt: product.imageAltText ?? product.name }] : undefined },
    twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined },
  }
}

const ProductDetail = ({ params }: PageProps) => (
  <Suspense fallback={<ProductSkeleton />}>
    <ProductContent params={params} />
  </Suspense>
)

async function ProductContent({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product || !product.isActive) notFound()

  const images = (product.images ?? []).map((img: { url: string }) => img.url)
  const categories = ((product.categories as unknown as Array<{ _id: { toString(): string }; name: string; slug: string }>) ?? []).map(c => ({
    _id: c._id.toString(),
    name: c.name,
    slug: c.slug,
  }))
  const primaryCategory = categories[0]
  const productUrl = absoluteUrl(`/products/${id}`)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: product.name,
      description: product.description ?? undefined,
      image: images,
      sku: product.sku ?? product.styleCode ?? undefined,
      mpn: product.styleCode ?? undefined,
      color: product.color ?? undefined,
      material: product.composition ?? undefined,
      category: primaryCategory?.name,
      brand: { '@type': 'Brand', name: SITE_NAME },
      url: productUrl,
      ...(product.price > 0 && {
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'INR',
          price: product.price,
          availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/MadeToOrder',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': `${SITE_URL}/#organization` },
        },
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'All Pieces', item: absoluteUrl('/products') },
        ...(primaryCategory
          ? [{ '@type': 'ListItem', position: 3, name: primaryCategory.name, item: absoluteUrl(`/categories/${primaryCategory.slug}`) }]
          : []),
        { '@type': 'ListItem', position: primaryCategory ? 4 : 3, name: product.name, item: productUrl },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />
      <Header />

      <main className="py-16 pt-20">
        <section className="w-full px-6">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {primaryCategory ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/categories/${primaryCategory.slug}`}>{primaryCategory.name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild><Link href="/products">Products</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery images={images} altText={product.imageAltText} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo
                productId={product._id}
                name={product.name}
                price={product.price}
                color={product.color}
                styleCode={product.styleCode}
                numberOfPieces={product.numberOfPieces}
                composition={product.composition}
                collectionName={product.collectionName}
                categories={categories}
                stock={product.stock}
              />
              <ProductDescription
                description={product.description}
                sku={product.sku}
                keyFeatures={product.keyFeatures}
                careInstructions={product.careInstructions}
                deliveryTimeline={product.deliveryTimeline}
                silhouette={product.silhouette}
                craftsmanship={product.craftsmanship}
                perfectFor={product.perfectFor}
                bespokeCustomisation={product.bespokeCustomisation}
                collectionName={product.collectionName}
                collectionStory={product.collectionStory}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail
