import { verifyAdminSession } from '@/app/lib/dal'
import ProductForm from '../_components/ProductForm'

export default async function NewProductPage() {
  await verifyAdminSession()
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Products</p>
        <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">New Product</h1>
      </div>
      <ProductForm />
    </div>
  )
}
