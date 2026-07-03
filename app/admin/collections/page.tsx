'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { Plus, Pencil, Trash2, Loader2, Check, X, Search, Package, ChevronRight, Upload, VideoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

type MediaAsset = { url: string; publicId: string }

interface ProductRef {
  _id: string
  name: string
  slug: string
  price: number
  isActive: boolean
  images?: { url: string }[]
}

interface Collection {
  _id: string
  name: string
  slug: string
  subheading?: string
  description?: string
  image?: MediaAsset
  video?: MediaAsset
  isActive: boolean
  products: ProductRef[]
}

type UploadZoneProps = {
  label: string
  accept: string
  resourceType: 'image' | 'video'
  value: MediaAsset | null
  onChange: (asset: MediaAsset | null) => void
}

function UploadZone({ label, accept, resourceType, value, onChange }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'bora-honeys/collections')
      fd.append('resourceType', resourceType)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')
      const data: MediaAsset = await res.json()
      onChange(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</label>

      {value ? (
        <div className="relative group border border-border overflow-hidden bg-muted/30">
          {resourceType === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt="" className="w-full h-28 object-cover" />
          ) : (
            <div className="flex items-center gap-3 px-3 py-4">
              <VideoIcon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-foreground truncate">{value.publicId.split('/').pop()}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1.5 right-1.5 bg-background/80 border border-border p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:border-destructive hover:text-destructive"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border border-dashed border-border flex flex-col items-center justify-center gap-2 py-5 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          ) : (
            <Upload className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">
            {uploading ? 'Uploading…' : 'Click or drag to upload'}
          </span>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onInputChange} />
    </div>
  )
}

interface Product {
  _id: string
  name: string
  slug: string
  price: number
  images?: { url: string }[]
}

type Panel = { type: 'create' } | { type: 'edit'; collection: Collection } | { type: 'manage'; collection: Collection } | null

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [panel, setPanel] = useState<Panel>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Form state
  const [formName, setFormName] = useState('')
  const [formSubheading, setFormSubheading] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formImage, setFormImage] = useState<MediaAsset | null>(null)
  const [formVideo, setFormVideo] = useState<MediaAsset | null>(null)
  const [formError, setFormError] = useState('')

  // Product search in manage panel
  const [productSearch, setProductSearch] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/collections?withProducts=true').then(r => r.json()),
      fetch('/api/products?limit=200&active=false').then(r => r.json()),
    ]).then(([cols, prods]) => {
      setCollections(cols)
      setAllProducts(prods.products ?? [])
    }).finally(() => setLoading(false))
  }, [])

  function openCreate() {
    setFormName('')
    setFormSubheading('')
    setFormDescription('')
    setFormImage(null)
    setFormVideo(null)
    setFormError('')
    setPanel({ type: 'create' })
  }

  function openEdit(col: Collection) {
    setFormName(col.name)
    setFormSubheading(col.subheading ?? '')
    setFormDescription(col.description ?? '')
    setFormImage(col.image ?? null)
    setFormVideo(col.video ?? null)
    setFormError('')
    setPanel({ type: 'edit', collection: col })
  }

  function openManage(col: Collection) {
    setProductSearch('')
    setPanel({ type: 'manage', collection: col })
  }

  function closePanel() {
    setPanel(null)
    setFormError('')
  }

  function saveCollection() {
    if (!formName.trim()) { setFormError('Name is required'); return }
    setFormError('')
    startTransition(async () => {
      const isEdit = panel?.type === 'edit'
      const url = isEdit ? `/api/collections/${panel.collection._id}` : '/api/collections'
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim(),
          subheading: formSubheading.trim(),
          description: formDescription.trim(),
          image: formImage,
          video: formVideo,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setFormError(data.error ?? 'Failed to save'); return }
      if (isEdit) {
        setCollections(prev => prev.map(c => c._id === panel.collection._id ? { ...data, products: c.products } : c))
      } else {
        setCollections(prev => [...prev, { ...data, products: [] }])
      }
      closePanel()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this collection? Products will not be affected.')) return
    setDeletingId(id)
    startTransition(async () => {
      const res = await fetch(`/api/collections/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCollections(prev => prev.filter(c => c._id !== id))
        if (panel?.type === 'edit' && panel.collection._id === id) closePanel()
        if (panel?.type === 'manage' && panel.collection._id === id) closePanel()
      }
      setDeletingId(null)
    })
  }

  function toggleProduct(collectionId: string, productId: string, action: 'add' | 'remove') {
    startTransition(async () => {
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, productId }),
      })
      if (!res.ok) return

      const product = allProducts.find(p => p._id === productId)
      setCollections(prev => prev.map(c => {
        if (c._id !== collectionId) return c
        if (action === 'add' && product) {
          if (c.products.some(p => p._id === productId)) return c
          return { ...c, products: [...c.products, { ...product, isActive: true }] }
        } else {
          return { ...c, products: c.products.filter(p => p._id !== productId) }
        }
      }))

      if (panel?.type === 'manage' && panel.collection._id === collectionId) {
        setPanel(prev => {
          if (prev?.type !== 'manage') return prev
          const col = prev.collection
          if (action === 'add' && product) {
            if (col.products.some(p => p._id === productId)) return prev
            return { ...prev, collection: { ...col, products: [...col.products, { ...product, isActive: true }] } }
          } else {
            return { ...prev, collection: { ...col, products: col.products.filter(p => p._id !== productId) } }
          }
        })
      }
    })
  }

  const managingCollection = panel?.type === 'manage' ? panel.collection : null
  const filteredProducts = allProducts.filter(p =>
    !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main list */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border px-8 py-6 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Catalogue</p>
            <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">
              Collections
              <span className="text-muted-foreground/30 font-light text-base ml-2">({collections.length})</span>
            </h1>
          </div>
          <Button
            onClick={openCreate}
            className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" /> New Collection
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border max-w-lg mx-auto mt-8">
              <Package className="w-8 h-8 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">No collections yet</p>
              <p className="text-xs text-muted-foreground/30 mt-2 mb-6">
                Group products into curated collections like "Summer Edit" or "New Arrivals"
              </p>
              <Button
                onClick={openCreate}
                className="h-8 px-5 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none"
              >
                <Plus className="w-3 h-3 mr-2" /> Create Collection
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
              {collections.map(col => {
                const isManaging = managingCollection?._id === col._id
                const isEditing = panel?.type === 'edit' && panel.collection._id === col._id
                return (
                  <div
                    key={col._id}
                    className={`group border transition-colors ${
                      isManaging || isEditing ? 'border-primary/40 bg-primary/[0.02]' : 'border-border hover:border-border/80'
                    }`}
                  >
                    {/* Cover preview strip */}
                    {col.products.length > 0 && col.products.some(p => p.images?.[0]) && (
                      <div className="h-20 border-b border-border overflow-hidden flex">
                        {col.products.slice(0, 4).filter(p => p.images?.[0]).map((p, i) => (
                          <div key={p._id} className="flex-1 overflow-hidden">
                            <img src={p.images![0].url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-5">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <p className="text-sm font-light text-foreground truncate">{col.name}</p>
                          <p className="text-[10px] text-muted-foreground/40 mt-0.5">/collection/{col.slug}</p>
                          {col.description && (
                            <p className="text-[11px] text-muted-foreground/70 mt-1.5 line-clamp-2">{col.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(col)}
                            title="Edit collection"
                            className={`p-1.5 rounded transition-colors ${isEditing ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(col._id)}
                            disabled={deletingId === col._id}
                            title="Delete collection"
                            className="p-1.5 rounded text-muted-foreground hover:text-destructive transition-colors"
                          >
                            {deletingId === col._id
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Product count + manage button */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                            {col.products.length} {col.products.length === 1 ? 'product' : 'products'}
                          </span>
                        </div>
                        <button
                          onClick={() => isManaging ? closePanel() : openManage(col)}
                          className={`flex items-center gap-1 text-[10px] tracking-widest uppercase transition-colors ${
                            isManaging ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {isManaging ? 'Done' : 'Manage'}
                          <ChevronRight className={`w-3 h-3 transition-transform ${isManaging ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right panel — slides in */}
      {panel && (
        <div className="w-80 shrink-0 border-l border-border bg-background flex flex-col">
          {/* Panel header */}
          <div className="px-6 py-5 border-b border-border flex items-center justify-between">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {panel.type === 'create' && 'New Collection'}
              {panel.type === 'edit' && 'Edit Collection'}
              {panel.type === 'manage' && `Products in "${panel.collection.name}"`}
            </p>
            <button onClick={closePanel} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Create / Edit form */}
          {(panel.type === 'create' || panel.type === 'edit') && (
            <div className="p-6 flex-1 space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Name *
                </label>
                <input
                  autoFocus
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveCollection()}
                  placeholder="e.g. Summer Edit 2025"
                  className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2.5 outline-none focus:border-primary/50 placeholder:text-muted-foreground/30"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Subheading
                </label>
                <input
                  value={formSubheading}
                  onChange={e => setFormSubheading(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveCollection()}
                  placeholder="e.g. Handpicked pieces for the season"
                  className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2.5 outline-none focus:border-primary/50 placeholder:text-muted-foreground/30"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="A short description of this collection…"
                  rows={3}
                  className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2.5 outline-none focus:border-primary/50 placeholder:text-muted-foreground/30 resize-none"
                />
              </div>
              <div>
                <p className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Hero Media
                </p>
                <p className="text-[10px] text-muted-foreground/50 mb-2">
                  Shown between the heading and description on the collection page. Video takes priority over image.
                </p>
                <div className="space-y-3">
                  <UploadZone
                    label="Video"
                    accept="video/*"
                    resourceType="video"
                    value={formVideo}
                    onChange={setFormVideo}
                  />
                  <UploadZone
                    label="Image"
                    accept="image/*"
                    resourceType="image"
                    value={formImage}
                    onChange={setFormImage}
                  />
                </div>
              </div>
              {formError && (
                <p className="text-[11px] text-destructive flex items-center gap-1.5">
                  <X className="w-3 h-3" /> {formError}
                </p>
              )}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={saveCollection}
                  disabled={isPending}
                  className="w-full h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  {panel.type === 'edit' ? 'Update Collection' : 'Create Collection'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={closePanel}
                  className="w-full h-9 text-[10px] tracking-widest uppercase font-light rounded-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Manage products panel */}
          {panel.type === 'manage' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* In collection */}
              <div className="px-6 pt-5 pb-4 border-b border-border/50">
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-3">
                  In this collection ({panel.collection.products.length})
                </p>
                {panel.collection.products.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground/40 italic">No products added yet</p>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {panel.collection.products.map(p => (
                      <div key={p._id} className="flex items-center justify-between gap-2 group/item">
                        <div className="flex items-center gap-2 min-w-0">
                          {p.images?.[0] && (
                            <img src={p.images[0].url} alt="" className="w-7 h-7 object-cover shrink-0 border border-border/50" />
                          )}
                          <span className="text-[11px] text-foreground font-light truncate">{p.name}</span>
                        </div>
                        <button
                          onClick={() => toggleProduct(panel.collection._id, p._id, 'remove')}
                          disabled={isPending}
                          className="shrink-0 p-1 text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover/item:opacity-100"
                          title="Remove from collection"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add products */}
              <div className="flex-1 flex flex-col overflow-hidden px-6 pt-4">
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-3">Add Products</p>
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/40" />
                  <input
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    placeholder="Search products…"
                    className="w-full pl-8 pr-3 py-2 bg-muted/20 border border-border text-foreground text-xs font-light outline-none focus:border-primary/40 placeholder:text-muted-foreground/30"
                  />
                </div>
                <div className="flex-1 overflow-y-auto space-y-0.5 -mx-1">
                  {filteredProducts.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground/40 text-center py-6">No products found</p>
                  ) : (
                    filteredProducts.map(p => {
                      const inCollection = panel.collection.products.some(cp => cp._id === p._id)
                      return (
                        <button
                          key={p._id}
                          disabled={isPending}
                          onClick={() => !inCollection && toggleProduct(panel.collection._id, p._id, 'add')}
                          className={`w-full flex items-center gap-2.5 px-2 py-2 text-left transition-colors rounded ${
                            inCollection
                              ? 'opacity-40 cursor-default'
                              : 'hover:bg-muted/30 cursor-pointer'
                          }`}
                        >
                          {p.images?.[0] ? (
                            <img src={p.images[0].url} alt="" className="w-7 h-7 object-cover shrink-0 border border-border/40" />
                          ) : (
                            <div className="w-7 h-7 bg-muted/30 shrink-0 border border-border/40" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-foreground font-light truncate">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground/50">₹{p.price?.toLocaleString('en-IN')}</p>
                          </div>
                          {inCollection && (
                            <Check className="w-3 h-3 text-primary shrink-0" />
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
