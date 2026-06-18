'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ImageAsset { url: string; publicId: string }
interface Category { _id: string; name: string; slug: string }

interface ProductData {
  _id?: string
  name: string
  slug?: string
  description: string
  price: string
  compareAtPrice: string
  stock: string
  sku: string
  color: string
  styleCode: string
  numberOfPieces: string
  composition: string
  keyFeatures: string
  careInstructions: string
  deliveryTimeline: string
  images: ImageAsset[]
  categories: string[]
  tags: string
  isActive: boolean
  isFeatured: boolean
  seo: { title: string; description: string }
}

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const empty: ProductData = {
  name: '', description: '', price: '', compareAtPrice: '', stock: '0', sku: '',
  color: '', styleCode: '', numberOfPieces: '', composition: '',
  keyFeatures: '', careInstructions: '', deliveryTimeline: '',
  images: [], categories: [], tags: '', isActive: true, isFeatured: false,
  seo: { title: '', description: '' },
}

function fromApi(p: Record<string, unknown>): ProductData {
  return {
    _id: String(p._id),
    name: String(p.name ?? ''),
    slug: String(p.slug ?? ''),
    description: String(p.description ?? ''),
    price: String(p.price ?? ''),
    compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : '',
    stock: String(p.stock ?? 0),
    sku: String(p.sku ?? ''),
    color: String(p.color ?? ''),
    styleCode: String(p.styleCode ?? ''),
    numberOfPieces: p.numberOfPieces ? String(p.numberOfPieces) : '',
    composition: String(p.composition ?? ''),
    keyFeatures: String(p.keyFeatures ?? ''),
    careInstructions: String(p.careInstructions ?? ''),
    deliveryTimeline: String(p.deliveryTimeline ?? ''),
    images: (p.images as ImageAsset[]) ?? [],
    categories: ((p.categories as Array<{ _id: string } | string>) ?? []).map(c =>
      typeof c === 'string' ? c : c._id
    ),
    tags: Array.isArray(p.tags) ? (p.tags as string[]).join(', ') : '',
    isActive: Boolean(p.isActive ?? true),
    isFeatured: Boolean(p.isFeatured ?? false),
    seo: {
      title: String((p.seo as Record<string, string> | undefined)?.title ?? ''),
      description: String((p.seo as Record<string, string> | undefined)?.description ?? ''),
    },
  }
}

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter()
  const [data, setData] = useState<ProductData>(empty)
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingInit, setLoadingInit] = useState(!!productId)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories)
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(r => r.json())
        .then(p => setData(fromApi(p)))
        .finally(() => setLoadingInit(false))
    }
  }, [productId])

  function set<K extends keyof ProductData>(key: K, value: ProductData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function setSeo(key: 'title' | 'description', value: string) {
    setData(prev => ({ ...prev, seo: { ...prev.seo, [key]: value } }))
  }

  function toggleCategory(id: string) {
    setData(prev => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter(c => c !== id)
        : [...prev.categories, id],
    }))
  }

  async function uploadImage(file: File) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'bora-honeys/products')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    return res.json() as Promise<ImageAsset>
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''
    const idx = data.images.length
    setUploadingIdx(idx)
    try {
      const results = await Promise.all(files.map(uploadImage))
      setData(prev => ({ ...prev, images: [...prev.images, ...results] }))
    } catch {
      setError('Image upload failed')
    } finally {
      setUploadingIdx(null)
    }
  }

  function removeImage(i: number) {
    setData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))
  }

  function submit() {
    setError('')
    if (!data.name.trim()) { setError('Product name is required'); return }
    const price = parseFloat(data.price)
    if (isNaN(price) || price < 0) { setError('Valid price is required'); return }

    startTransition(async () => {
      const payload = {
        name: data.name.trim(),
        description: data.description.trim(),
        price,
        compareAtPrice: data.compareAtPrice ? parseFloat(data.compareAtPrice) : undefined,
        stock: parseInt(data.stock) || 0,
        sku: data.sku.trim() || undefined,
        color: data.color.trim() || undefined,
        styleCode: data.styleCode.trim() || undefined,
        numberOfPieces: data.numberOfPieces ? parseInt(data.numberOfPieces) : undefined,
        composition: data.composition.trim() || undefined,
        keyFeatures: data.keyFeatures.trim() || undefined,
        careInstructions: data.careInstructions.trim() || undefined,
        deliveryTimeline: data.deliveryTimeline.trim() || undefined,
        images: data.images,
        categories: data.categories,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        seo: data.seo,
      }

      const url = productId ? `/api/products/${productId}` : '/api/products'
      const method = productId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok) { setError(result.error ?? 'Failed to save'); return }
      router.push('/admin/products')
      router.refresh()
    })
  }

  if (loadingInit) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground px-8 py-16 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading product…
      </div>
    )
  }

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column — main fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <section className="border border-border p-6 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Basic Information</p>

            <Field label="Product Name *">
              <input
                value={data.name}
                onChange={e => {
                  set('name', e.target.value)
                  if (!productId) set('slug', toSlug(e.target.value) as never)
                }}
                placeholder="e.g. Coffee Flared Lehenga Set"
                className={inputCls}
              />
            </Field>

            <Field label="Slug">
              <input
                value={data.slug ?? toSlug(data.name)}
                onChange={e => set('slug', e.target.value)}
                placeholder="auto-generated"
                className={`${inputCls} text-muted-foreground`}
              />
            </Field>

            <Field label="Description">
              <Textarea
                value={data.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe this piece…"
                rows={5}
                className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 resize-none rounded-none"
              />
            </Field>
          </section>

          {/* Pricing & Inventory */}
          <section className="border border-border p-6 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Pricing & Inventory</p>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (₹) *">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={data.price}
                  onChange={e => set('price', e.target.value)}
                  placeholder="0.00"
                  className={inputCls}
                />
              </Field>
              <Field label="Compare at Price (₹)">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={data.compareAtPrice}
                  onChange={e => set('compareAtPrice', e.target.value)}
                  placeholder="0.00"
                  className={inputCls}
                />
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  min={0}
                  value={data.stock}
                  onChange={e => set('stock', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="SKU">
                <input
                  value={data.sku}
                  onChange={e => set('sku', e.target.value)}
                  placeholder="BH-16.01"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* Product Details */}
          <section className="border border-border p-6 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Product Details</p>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Style Code">
                <input value={data.styleCode} onChange={e => set('styleCode', e.target.value)} placeholder="BH-16.01" className={inputCls} />
              </Field>
              <Field label="Colour">
                <input value={data.color} onChange={e => set('color', e.target.value)} placeholder="Coffee" className={inputCls} />
              </Field>
              <Field label="No. of Pieces">
                <input type="number" min={1} value={data.numberOfPieces} onChange={e => set('numberOfPieces', e.target.value)} placeholder="3" className={inputCls} />
              </Field>
            </div>

            <Field label="Piece Types / Composition">
              <input value={data.composition} onChange={e => set('composition', e.target.value)} placeholder="Flared Lehenga, Choli Blouse & Feather Cape" className={inputCls} />
            </Field>

            <Field label="Key Features (one per line)">
              <Textarea
                value={data.keyFeatures}
                onChange={e => set('keyFeatures', e.target.value)}
                placeholder={"Set includes 3 pieces: Flared lehenga skirt, Choli blouse, Feather cape\nColour: Coffee\nPremium handcrafted embellishment and embroidery work"}
                rows={5}
                className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 resize-none rounded-none"
              />
            </Field>

            <Field label="Care Instructions">
              <Textarea
                value={data.careInstructions}
                onChange={e => set('careInstructions', e.target.value)}
                placeholder={"Couture Dry Clean only; do not wash at home.\nStore in a poly bag inside the Bora Honey's branded bag."}
                rows={4}
                className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 resize-none rounded-none"
              />
            </Field>

            <Field label="Delivery Timeline">
              <Textarea
                value={data.deliveryTimeline}
                onChange={e => set('deliveryTimeline', e.target.value)}
                placeholder={"All pieces are made-to-order and delivered within 2-3 months from the date of order confirmation.\nShipping is paid and available Worldwide."}
                rows={3}
                className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 resize-none rounded-none"
              />
            </Field>

            <Field label="Tags (comma-separated)">
              <input value={data.tags} onChange={e => set('tags', e.target.value)} placeholder="lehenga, bridal, festive" className={inputCls} />
            </Field>
          </section>

          {/* Images */}
          <section className="border border-border p-6 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Images</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {data.images.map((img, i) => (
                <div key={img.publicId} className="relative aspect-square border border-border group">
                  <Image src={img.url} alt="" fill className="object-cover" sizes="150px" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploadingIdx !== null}
                className="aspect-square border border-dashed border-border flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                {uploadingIdx !== null ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span className="text-[9px] tracking-widest uppercase">Upload</span>
                  </>
                )}
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-[10px] text-muted-foreground/50">First image will be the cover. Drag to reorder (coming soon).</p>
          </section>

          {/* SEO */}
          <section className="border border-border p-6 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">SEO</p>
            <Field label="Meta Title">
              <input value={data.seo.title} onChange={e => setSeo('title', e.target.value)} placeholder="Defaults to product name" className={inputCls} />
            </Field>
            <Field label="Meta Description">
              <Textarea
                value={data.seo.description}
                onChange={e => setSeo('description', e.target.value)}
                placeholder="Brief description for search engines…"
                rows={2}
                className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 resize-none rounded-none"
              />
            </Field>
          </section>
        </div>

        {/* Right column — status, categories */}
        <div className="space-y-6">
          {/* Status */}
          <section className="border border-border p-5 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Status</p>
            <Toggle label="Active" description="Visible on storefront" checked={data.isActive} onChange={v => set('isActive', v)} />
            <Toggle label="Featured" description="Show in featured section" checked={data.isFeatured} onChange={v => set('isFeatured', v)} />
          </section>

          {/* Categories */}
          <section className="border border-border p-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Categories</p>
            {categories.length === 0 ? (
              <p className="text-[11px] text-muted-foreground/50">No categories yet. <a href="/admin/categories" className="text-primary underline">Create one</a></p>
            ) : (
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat._id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggleCategory(cat._id)}
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        data.categories.includes(cat._id)
                          ? 'bg-primary border-primary'
                          : 'border-border group-hover:border-primary/50'
                      }`}
                    >
                      {data.categories.includes(cat._id) && (
                        <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      onClick={() => toggleCategory(cat._id)}
                      className="text-[11px] font-light text-foreground select-none cursor-pointer"
                    >
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Save */}
          <div className="space-y-3">
            {error && <p className="text-[11px] text-destructive">{error}</p>}
            <Button
              onClick={submit}
              disabled={isPending}
              className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {productId ? 'Update Product' : 'Create Product'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/products')}
              className="w-full h-10 text-[10px] tracking-widest uppercase font-light rounded-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputCls =
  'w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Toggle({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-light text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground/60">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-border'}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  )
}
