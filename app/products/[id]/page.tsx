import { notFound } from 'next/navigation'
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

interface PageProps {
  params: Promise<{ id: string }>
}

async function getProduct(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`
  const res = await fetch(`${baseUrl}/api/products/slug/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.seo?.title ?? product.name,
    description: product.seo?.description ?? product.description,
  }
}

const ProductDetail = async ({ params }: PageProps) => {
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

  return (
    <div className="min-h-screen bg-background">
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
                        <Link href={`/category/${primaryCategory.slug}`}>{primaryCategory.name}</Link>
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
            <ProductImageGallery images={images} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo
                name={product.name}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                color={product.color}
                styleCode={product.styleCode}
                numberOfPieces={product.numberOfPieces}
                composition={product.composition}
                categories={categories}
                stock={product.stock}
              />
              <ProductDescription
                description={product.description}
                sku={product.sku}
                keyFeatures={product.keyFeatures}
                careInstructions={product.careInstructions}
                deliveryTimeline={product.deliveryTimeline}
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
