'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PAGE_SIZE = 20

interface CategoryRef { _id: string; name: string }

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  images: { url: string; publicId: string }[]
  categories: CategoryRef[]
  stock: number
  isActive: boolean
  isFeatured: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function fetchProducts(q = '', p = 1) {
    setLoading(true)
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      page: String(p),
      ...(q ? { search: q } : {}),
    })
    fetch(`/api/products?${params}&active=false`)
      .then(r => r.json())
      .then(data => {
        setProducts(data.products ?? [])
        setTotal(data.total ?? 0)
        setPages(data.pages ?? 1)
        setPage(data.page ?? 1)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchProducts(search, 1)
  }

  function goToPage(p: number) {
    if (p < 1 || p > pages || p === page) return
    fetchProducts(search, p)
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setDeletingId(id)
    startTransition(async () => {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) setProducts(prev => prev.filter(p => p._id !== id))
      setDeletingId(null)
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Catalogue</p>
          <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">
            Products <span className="text-muted-foreground/40 font-light text-base ml-2">({total})</span>
          </h1>
        </div>
        <Link href="/admin/products/new">
          <Button className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> New Product
          </Button>
        </Link>
      </div>

      <div className="px-8 py-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 mb-6 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-3 py-2 bg-background border border-border text-foreground text-sm font-light outline-none focus:border-primary/50 placeholder:text-muted-foreground/40"
            />
          </div>
          <Button type="submit" variant="ghost" className="h-9 px-4 text-[10px] tracking-widest uppercase font-light rounded-none border border-border">
            Search
          </Button>
        </form>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground/60">No products yet</p>
            <Link href="/admin/products/new" className="inline-block mt-4 text-[10px] tracking-widest uppercase text-primary hover:text-primary/70 transition-colors">
              Create your first product →
            </Link>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {/* Header */}
            <div className="grid grid-cols-[3rem_1fr_8rem_8rem_6rem_5rem_5rem] gap-4 px-4 py-2.5 bg-muted/20">
              {['', 'Product', 'Categories', 'Price', 'Stock', 'Status', ''].map((h, i) => (
                <span key={i} className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">{h}</span>
              ))}
            </div>

            {products.map(product => (
              <div key={product._id} className="grid grid-cols-[3rem_1fr_8rem_8rem_6rem_5rem_5rem] gap-4 px-4 py-3.5 items-center hover:bg-muted/10 transition-colors group">
                {/* Thumbnail */}
                <div className="w-10 h-10 relative border border-border bg-muted/20 shrink-0 overflow-hidden">
                  {product.images[0] ? (
                    <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="40px" />
                  ) : (
                    <div className="w-full h-full bg-muted/40" />
                  )}
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <p className="text-sm font-light text-foreground truncate">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 truncate">/products/{product.slug}</p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                  {product.categories.slice(0, 2).map(c => (
                    <span key={c._id} className="text-[9px] tracking-wide border border-border px-1.5 py-0.5 text-muted-foreground">
                      {c.name}
                    </span>
                  ))}
                  {product.categories.length > 2 && (
                    <span className="text-[9px] text-muted-foreground/50">+{product.categories.length - 2}</span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <p className="text-sm font-light text-foreground">₹{product.price.toLocaleString('en-IN')}</p>
                  {product.compareAtPrice && (
                    <p className="text-[10px] text-muted-foreground/50 line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</p>
                  )}
                </div>

                {/* Stock */}
                <p className={`text-sm font-light ${product.stock === 0 ? 'text-destructive' : product.stock <= 5 ? 'text-amber-500' : 'text-foreground'}`}>
                  {product.stock}
                </p>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <Badge variant={product.isActive ? 'default' : 'outline'} className="text-[9px] py-0 px-1.5 tracking-wider w-fit">
                    {product.isActive ? 'Active' : 'Draft'}
                  </Badge>
                  {product.isFeatured && (
                    <Badge variant="secondary" className="text-[9px] py-0 px-1.5 tracking-wider w-fit">Featured</Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/products/${product._id}`} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    {deletingId === product._id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && pages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/60">
              Page {page} of {pages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-default disabled:hover:border-border"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1)
                .reduce<number[]>((acc, p) => {
                  if (acc.length && p - acc[acc.length - 1] > 1) acc.push(-1)
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === -1 ? (
                    <span key={`ellipsis-${i}`} className="text-[10px] text-muted-foreground/40 px-1">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`min-w-[1.75rem] h-7 px-1.5 text-[10px] tracking-wide border transition-colors ${
                        p === page
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= pages}
                className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-default disabled:hover:border-border"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
