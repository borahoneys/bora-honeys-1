'use client'

import { useState, useRef, useTransition } from 'react'
import { saveHomepageConfig } from '@/app/actions/homepage'
import {
  ImageIcon,
  VideoIcon,
  Trash2,
  ChevronUp,
  ChevronDown,
  PlusCircle,
  Upload,
  X,
  Loader2,
  CheckCircle,
  Link as LinkIcon,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type ImageAsset = { url: string; publicId: string }

type CTAButton = { label: string; href: string; enabled: boolean }

type ImageSection = {
  id: string
  type: 'image'
  desktopImage: ImageAsset | null
  mobileImage: ImageAsset | null
  button: CTAButton
  isActive: boolean
  order: number
}

type VideoSection = {
  id: string
  type: 'video'
  video: ImageAsset | null
  button: CTAButton
  isActive: boolean
  order: number
}

type Section = ImageSection | VideoSection

function toClientSection(s: Record<string, unknown>, idx: number): Section {
  const base = {
    id: String((s._id as string | undefined) ?? Math.random()),
    isActive: Boolean(s.isActive ?? true),
    order: Number(s.order ?? idx),
    button: {
      label: String((s.button as CTAButton | undefined)?.label ?? ''),
      href: String((s.button as CTAButton | undefined)?.href ?? ''),
      enabled: !!(s.button as CTAButton | undefined)?.label,
    },
  }
  if (s.type === 'video') {
    return {
      ...base,
      type: 'video',
      video: (s.video as ImageAsset | undefined) ?? null,
    }
  }
  return {
    ...base,
    type: 'image',
    desktopImage: (s.desktopImage as ImageAsset | undefined) ?? null,
    mobileImage: (s.mobileImage as ImageAsset | undefined) ?? null,
  }
}

function newImageSection(order: number): ImageSection {
  return {
    id: String(Date.now()),
    type: 'image',
    desktopImage: null,
    mobileImage: null,
    button: { label: '', href: '', enabled: false },
    isActive: true,
    order,
  }
}

function newVideoSection(order: number): VideoSection {
  return {
    id: String(Date.now()),
    type: 'video',
    video: null,
    button: { label: '', href: '', enabled: false },
    isActive: true,
    order,
  }
}

// ─── Upload Zone ─────────────────────────────────────────────────────────────

type UploadZoneProps = {
  label: string
  accept: string
  resourceType: 'image' | 'video'
  value: ImageAsset | null
  onChange: (asset: ImageAsset | null) => void
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
      fd.append('folder', 'bora-honeys/homepage')
      fd.append('resourceType', resourceType)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')
      const data: ImageAsset = await res.json()
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
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>

      {value ? (
        <div className="relative group rounded border border-border overflow-hidden bg-muted/30">
          {resourceType === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt="" className="w-full h-32 object-cover" />
          ) : (
            <div className="flex items-center gap-3 px-4 py-5">
              <VideoIcon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-xs text-foreground truncate">{value.publicId.split('/').pop()}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1.5 right-1.5 bg-background/80 border border-border rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:border-destructive hover:text-destructive"
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
          className="border border-dashed border-border rounded flex flex-col items-center justify-center gap-2 py-7 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground" />
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

// ─── Section Card ─────────────────────────────────────────────────────────────

type SectionCardProps = {
  section: Section
  index: number
  total: number
  onChange: (updated: Section) => void
  onDelete: () => void
  onMove: (dir: 'up' | 'down') => void
}

function SectionCard({ section, index, total, onChange, onDelete, onMove }: SectionCardProps) {
  function patch(updates: Partial<Section>) {
    onChange({ ...section, ...updates } as Section)
  }

  function patchButton(updates: Partial<CTAButton>) {
    onChange({ ...section, button: { ...section.button, ...updates } } as Section)
  }

  return (
    <div
      className={`rounded-lg border ${section.isActive ? 'border-border' : 'border-border/40'} bg-card transition-opacity ${section.isActive ? 'opacity-100' : 'opacity-60'}`}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
        <span className={`inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${section.type === 'image' ? 'border-primary/40 text-primary bg-primary/10' : 'border-accent/40 text-accent bg-accent/10'}`}>
          {section.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <VideoIcon className="w-3 h-3" />}
          {section.type}
        </span>

        <span className="text-xs text-muted-foreground ml-1">Section {index + 1}</span>

        <div className="ml-auto flex items-center gap-2">
          {/* Active toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <div
              role="switch"
              aria-checked={section.isActive}
              tabIndex={0}
              onClick={() => patch({ isActive: !section.isActive })}
              onKeyDown={(e) => e.key === 'Enter' && patch({ isActive: !section.isActive })}
              className={`relative w-8 h-4 rounded-full transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring ${section.isActive ? 'bg-primary' : 'bg-muted'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-primary-foreground transition-transform ${section.isActive ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
              {section.isActive ? 'Active' : 'Hidden'}
            </span>
          </label>

          {/* Reorder */}
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove('up')}
            className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
            aria-label="Move up"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove('down')}
            className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
            aria-label="Move down"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
            aria-label="Delete section"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-4">
        {section.type === 'image' ? (
          <div className="grid grid-cols-2 gap-4">
            <UploadZone
              label="Desktop Image"
              accept="image/*"
              resourceType="image"
              value={(section as ImageSection).desktopImage}
              onChange={(asset) => onChange({ ...section, desktopImage: asset } as ImageSection)}
            />
            <UploadZone
              label="Mobile Image"
              accept="image/*"
              resourceType="image"
              value={(section as ImageSection).mobileImage}
              onChange={(asset) => onChange({ ...section, mobileImage: asset } as ImageSection)}
            />
          </div>
        ) : (
          <UploadZone
            label="Video"
            accept="video/*"
            resourceType="video"
            value={(section as VideoSection).video}
            onChange={(asset) => onChange({ ...section, video: asset } as VideoSection)}
          />
        )}

        {/* CTA Button */}
        <div className="border-t border-border/50 pt-4">
          <label className="flex items-center gap-2 cursor-pointer select-none mb-3">
            <div
              role="switch"
              aria-checked={section.button.enabled}
              tabIndex={0}
              onClick={() => patchButton({ enabled: !section.button.enabled })}
              onKeyDown={(e) => e.key === 'Enter' && patchButton({ enabled: !section.button.enabled })}
              className={`relative w-7 h-3.5 rounded-full transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring ${section.button.enabled ? 'bg-primary' : 'bg-muted'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-primary-foreground transition-transform ${section.button.enabled ? 'translate-x-3.5' : 'translate-x-0'}`}
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1">
              <LinkIcon className="w-3 h-3" /> CTA Button
            </span>
          </label>

          {section.button.enabled && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">
                  Button Label
                </label>
                <input
                  type="text"
                  value={section.button.label}
                  onChange={(e) => patchButton({ label: e.target.value })}
                  placeholder="Shop Now"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">
                  Button URL
                </label>
                <input
                  type="text"
                  value={section.button.href}
                  onChange={(e) => patchButton({ href: e.target.value })}
                  placeholder="/collections/all"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

type HomepageEditorProps = {
  initialConfig: { sections: Record<string, unknown>[] }
}

export default function HomepageEditor({ initialConfig }: HomepageEditorProps) {
  const [sections, setSections] = useState<Section[]>(() =>
    (initialConfig.sections ?? []).map((s, i) => toClientSection(s, i))
  )
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  function updateSection(id: string, updated: Section) {
    setSections((prev) => prev.map((s) => (s.id === id ? updated : s)))
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i })))
  }

  function moveSection(id: string, dir: 'up' | 'down') {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx === -1) return prev
      const next = [...prev]
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= next.length) return prev
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next.map((s, i) => ({ ...s, order: i }))
    })
  }

  function addSection(type: 'image' | 'video') {
    const order = sections.length
    setSections((prev) => [
      ...prev,
      type === 'image' ? newImageSection(order) : newVideoSection(order),
    ])
  }

  function handleSave() {
    setSaved(false)
    setSaveError(null)
    startTransition(async () => {
      try {
        const payload = sections.map((s, i) => {
          const base = {
            type: s.type,
            isActive: s.isActive,
            order: i,
            ...(s.button.enabled && s.button.label
              ? { button: { label: s.button.label, href: s.button.href } }
              : {}),
          }
          if (s.type === 'video') {
            return { ...base, ...(s.video ? { video: s.video } : {}) }
          }
          return {
            ...base,
            ...(s.desktopImage ? { desktopImage: s.desktopImage } : {}),
            ...(s.mobileImage ? { mobileImage: s.mobileImage } : {}),
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await saveHomepageConfig(payload as any)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : 'Save failed')
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Section List */}
      {sections.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 py-16">
          <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No sections yet — add one below</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section, idx) => (
            <SectionCard
              key={section.id}
              section={section}
              index={idx}
              total={sections.length}
              onChange={(updated) => updateSection(section.id, updated)}
              onDelete={() => deleteSection(section.id)}
              onMove={(dir) => moveSection(section.id, dir)}
            />
          ))}
        </div>
      )}

      {/* Add Section */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => addSection('image')}
          className="flex items-center gap-2 border border-border rounded px-4 py-2.5 text-xs tracking-widest uppercase hover:border-primary/60 hover:text-primary transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Image Section
        </button>
        <button
          type="button"
          onClick={() => addSection('video')}
          className="flex items-center gap-2 border border-border rounded px-4 py-2.5 text-xs tracking-widest uppercase hover:border-primary/60 hover:text-primary transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Video Section
        </button>
      </div>

      {/* Save Bar */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border pt-4 pb-2 flex items-center justify-between gap-4">
        {saveError && <p className="text-xs text-destructive">{saveError}</p>}
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-primary">
            <CheckCircle className="w-3.5 h-3.5" /> Saved & published
          </span>
        )}
        {!saveError && !saved && <span />}

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {isPending ? 'Saving…' : 'Save & Publish'}
        </button>
      </div>
    </div>
  )
}
