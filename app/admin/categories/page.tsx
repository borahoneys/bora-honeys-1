'use client'

import { useState, useEffect, useTransition } from 'react'
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formError, setFormError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  function openCreate() {
    setEditingId(null)
    setFormName('')
    setFormDescription('')
    setFormError('')
    setShowForm(true)
  }

  function openEdit(cat: Category) {
    setEditingId(cat._id)
    setFormName(cat.name)
    setFormDescription(cat.description ?? '')
    setFormError('')
    setShowForm(true)
  }

  function cancel() {
    setShowForm(false)
    setEditingId(null)
    setFormError('')
  }

  function save() {
    if (!formName.trim()) { setFormError('Name is required'); return }
    setFormError('')
    startTransition(async () => {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName.trim(), description: formDescription.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setFormError(data.error ?? 'Failed to save'); return }
      if (editingId) {
        setCategories(prev => prev.map(c => c._id === editingId ? data : c))
      } else {
        setCategories(prev => [...prev, data])
      }
      cancel()
    })
  }

  function handleDelete(id: string) {
    setDeletingId(id)
    startTransition(async () => {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) setCategories(prev => prev.filter(c => c._id !== id))
      setDeletingId(null)
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">Catalogue</p>
          <h1 className="text-xl font-light tracking-[0.15em] uppercase text-foreground">Categories</h1>
        </div>
        <Button
          onClick={openCreate}
          className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> New Category
        </Button>
      </div>

      <div className="px-8 py-8 max-w-2xl">
        {/* Inline form */}
        {showForm && (
          <div className="mb-6 border border-border p-5 bg-muted/20">
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              {editingId ? 'Edit Category' : 'New Category'}
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Name *
                </label>
                <input
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Earrings"
                  className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  Description
                </label>
                <input
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Optional description"
                  className="w-full bg-background border border-border text-foreground text-sm font-light px-3 py-2 outline-none focus:border-primary/50 placeholder:text-muted-foreground/40"
                />
              </div>
              {formError && <p className="text-[11px] text-destructive">{formError}</p>}
              <div className="flex items-center gap-3 pt-1">
                <Button
                  onClick={save}
                  disabled={isPending}
                  className="h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] tracking-widest uppercase font-light rounded-none"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span className="ml-2">{editingId ? 'Update' : 'Create'}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={cancel}
                  className="h-8 px-4 text-[10px] tracking-widest uppercase font-light rounded-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground/60">No categories yet</p>
            <p className="text-xs text-muted-foreground/40 mt-2">Create your first category above</p>
          </div>
        ) : (
          <div className="divide-y divide-border border border-border">
            {categories.map(cat => (
              <div key={cat._id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors group">
                <div>
                  <p className="text-sm font-light text-foreground">{cat.name}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">/category/{cat.slug}</p>
                  {cat.description && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">{cat.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    disabled={deletingId === cat._id}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    {deletingId === cat._id ? (
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
      </div>
    </div>
  )
}
