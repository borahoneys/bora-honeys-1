import { verifyAdminSession } from '@/app/lib/dal'
import ProductForm from '../_components/ProductForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  await verifyAdminSession()
  const { id } = await params
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Products</p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Edit Product</h1>
      </div>
      <ProductForm productId={id} />
    </div>
  )
}
