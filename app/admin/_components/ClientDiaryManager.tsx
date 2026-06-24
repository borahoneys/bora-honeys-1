'use client'

import { useState, useRef, useTransition } from 'react'
import { createClientDiary, updateClientDiary, deleteClientDiary } from '@/app/actions/client-diaries'
import {
  PlusCircle, Pencil, Trash2, Upload, X, Loader2, CheckCircle, User, Quote,
} from 'lucide-react'

type DiaryEntry = {
  _id: string
  clientName: string
  title?: string
  quote: string
  image?: { url: string; publicId: string }
  date?: string
  isPublished: boolean
  order: number
}

type ImageAsset = { url: string; publicId: string }

const emptyForm = {
  clientName: '', title: '', quote: '', date: '',
  isPublished: true, order: 0,
  image: null as ImageAsset | null,
}

function ImageUploadZone({ value, onChange }: { value: ImageAsset | null; onChange: (a: ImageAsset | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setUploading(true); setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file); fd.append('folder', 'bora-honeys/client-diaries'); fd.append('resourceType', 'image')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')
      onChange(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally { setUploading(false) }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Client Photo</span>
      {value ? (
        <div className="relative group w-24 h-24 rounded-full overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt="" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange(null)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div role="button" tabIndex={0} onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}
          onDragOver={(e) => e.preventDefault()}
          className="w-24 h-24 rounded-full border border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-muted-foreground" />}
          <span className="text-[9px] text-muted-foreground text-center leading-tight">{uploading ? 'Uploading' : 'Upload'}</span>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
    </div>
  )
}

export default function ClientDiaryManager({ initialEntries }: { initialEntries: DiaryEntry[] }) {
  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [isPending, startTransition] = useTransition()
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function flash(msg: string) {
    setSuccessMsg(msg); setTimeout(() => setSuccessMsg(null), 3000)
  }

  function startAdd() {
    setForm(emptyForm); setEditingId(null); setIsAdding(true)
  }

  function startEdit(entry: DiaryEntry) {
    setForm({
      clientName: entry.clientName, title: entry.title ?? '',
      quote: entry.quote, date: entry.date ? entry.date.slice(0, 10) : '',
      isPublished: entry.isPublished, order: entry.order,
      image: entry.image ?? null,
    })
    setEditingId(entry._id); setIsAdding(false)
  }

  function cancel() { setIsAdding(false); setEditingId(null); setError(null) }

  function handleSubmit() {
    if (!form.clientName.trim() || !form.quote.trim()) {
      setError('Client name and quote are required.'); return
    }
    setError(null)
    startTransition(async () => {
      try {
        const payload = {
          clientName: form.clientName.trim(),
          title: form.title.trim() || undefined,
          quote: form.quote.trim(),
          image: form.image ?? undefined,
          date: form.date || undefined,
          isPublished: form.isPublished,
          order: Number(form.order) || 0,
        }
        if (editingId) {
          const updated = await updateClientDiary(editingId, payload)
          setEntries(prev => prev.map(e => e._id === editingId ? updated : e))
          flash('Entry updated')
        } else {
          const created = await createClientDiary(payload)
          setEntries(prev => [created, ...prev])
          flash('Entry added')
        }
        cancel()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Save failed')
      }
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteClientDiary(id)
      setEntries(prev => prev.filter(e => e._id !== id))
      flash('Entry deleted')
    })
  }

  const showForm = isAdding || editingId !== null

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <CheckCircle className="w-3.5 h-3.5" /> {successMsg}
            </span>
          )}
          {!showForm && (
            <button type="button" onClick={startAdd}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
              <PlusCircle className="w-3.5 h-3.5" /> Add Entry
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border border-primary/30 rounded-lg p-5 space-y-4 bg-primary/5">
          <h3 className="text-xs tracking-widest uppercase font-medium text-foreground">
            {editingId ? 'Edit Entry' : 'New Entry'}
          </h3>

          <div className="flex items-start gap-5">
            <ImageUploadZone value={form.image} onChange={(a) => setForm(f => ({ ...f, image: a }))} />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Client Name *</label>
                  <input type="text" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} placeholder="Priya Sharma"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Headline (optional)</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="A dream come true"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} min={0}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Quote / Story *</label>
            <textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={4}
              placeholder="The experience was absolutely magical. Every detail was perfect…"
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div role="switch" aria-checked={form.isPublished} tabIndex={0}
                onClick={() => setForm(f => ({ ...f, isPublished: !f.isPublished }))}
                onKeyDown={(e) => e.key === 'Enter' && setForm(f => ({ ...f, isPublished: !f.isPublished }))}
                className={`relative w-8 h-4 rounded-full transition-colors cursor-pointer ${form.isPublished ? 'bg-primary' : 'bg-muted'}`}>
                <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-primary-foreground transition-transform ${form.isPublished ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <span className="text-xs text-muted-foreground">{form.isPublished ? 'Published' : 'Hidden'}</span>
            </label>

            <div className="flex items-center gap-2">
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="button" onClick={cancel}
                className="px-4 py-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} disabled={isPending}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 disabled:opacity-50 transition-opacity">
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries list */}
      {entries.length === 0 && !showForm ? (
        <div className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 py-16">
          <Quote className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No entries yet — add the first one above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map(entry => (
            <div key={entry._id} className={`flex items-start gap-4 p-4 rounded-lg border bg-card transition-opacity ${entry.isPublished ? 'border-border opacity-100' : 'border-border/40 opacity-60'}`}>
              {entry.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={entry.image.url} alt={entry.clientName} className="w-12 h-12 rounded-full object-cover shrink-0 border border-border" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted/30 border border-border shrink-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground/40" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">{entry.clientName}</p>
                  {entry.title && <span className="text-xs text-muted-foreground truncate">— {entry.title}</span>}
                  {!entry.isPublished && (
                    <span className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-border rounded text-muted-foreground/60">Hidden</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{entry.quote}</p>
                {entry.date && <p className="text-[9px] tracking-widest uppercase text-muted-foreground/40 mt-1">{new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => startEdit(entry)}
                  className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => handleDelete(entry._id)}
                  className="p-1.5 rounded hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
