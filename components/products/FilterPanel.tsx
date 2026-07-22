'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
  _id: string
  name: string
  slug: string
}

interface Props {
  categories: Category[]
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A–Z' },
  { value: 'name_desc', label: 'Name: Z–A' },
]

export default function FilterPanel({ categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentQ = searchParams.get('q') ?? ''
  const currentCat = searchParams.get('cat') ?? ''
  const currentSort = searchParams.get('sort') ?? 'newest'
  const currentMin = searchParams.get('min') ?? ''
  const currentMax = searchParams.get('max') ?? ''
  const currentFeatured = searchParams.get('featured') === 'true'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(currentQ)
  const [minValue, setMinValue] = useState(currentMin)
  const [maxValue, setMaxValue] = useState(currentMax)
  const [catOpen, setCatOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)

  // Sync local state when URL params change externally
  useEffect(() => { setSearchValue(currentQ) }, [currentQ])
  useEffect(() => { setMinValue(currentMin) }, [currentMin])
  useEffect(() => { setMaxValue(currentMax) }, [currentMax])

  const buildParams = useCallback(
    (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('page')
      for (const [key, value] of Object.entries(overrides)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }
      return params.toString()
    },
    [searchParams]
  )

  const push = useCallback(
    (overrides: Record<string, string | null>) => {
      router.replace(`${pathname}?${buildParams(overrides)}`)
    },
    [router, pathname, buildParams]
  )

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      push({ q: searchValue || null })
    }, 400)
    return () => clearTimeout(t)
  }, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

  function applyPrice() {
    push({ min: minValue || null, max: maxValue || null })
  }

  function clearAll() {
    setSearchValue('')
    setMinValue('')
    setMaxValue('')
    router.replace(pathname)
  }

  const activeCount = [
    currentQ,
    currentCat,
    currentSort !== 'newest' ? currentSort : null,
    currentMin,
    currentMax,
    currentFeatured ? 'featured' : null,
  ].filter(Boolean).length

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search pieces…"
            className="w-full bg-input border border-border pl-9 pr-3 py-2 text-xs font-light text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Sort By</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => push({ sort: opt.value === 'newest' ? null : opt.value })}
              className={cn(
                'w-full text-left text-xs font-light py-1.5 px-2 transition-colors',
                currentSort === opt.value
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <button
            onClick={() => setCatOpen((o) => !o)}
            className="w-full flex items-center justify-between mb-3"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Category</p>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200',
                catOpen ? 'rotate-180' : ''
              )}
            />
          </button>
          {catOpen && (
            <div className="space-y-1">
              <button
                onClick={() => push({ cat: null })}
                className={cn(
                  'w-full text-left text-xs font-light py-1.5 px-2 transition-colors',
                  !currentCat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => push({ cat: currentCat === cat._id ? null : cat._id })}
                  className={cn(
                    'w-full text-left text-xs font-light py-1.5 px-2 transition-colors',
                    currentCat === cat._id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range */}
      <div>
        <button
          onClick={() => setPriceOpen((o) => !o)}
          className="w-full flex items-center justify-between mb-3"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Price Range</p>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200',
              priceOpen ? 'rotate-180' : ''
            )}
          />
        </button>
        {priceOpen && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={(e) => e.key === 'Enter' && applyPrice()}
                placeholder="Min ₹"
                min={0}
                className="w-full bg-input border border-border px-2 py-2 text-xs font-light text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={(e) => e.key === 'Enter' && applyPrice()}
                placeholder="Max ₹"
                min={0}
                className="w-full bg-input border border-border px-2 py-2 text-xs font-light text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            {(currentMin || currentMax) && (
              <button
                onClick={() => { setMinValue(''); setMaxValue(''); push({ min: null, max: null }) }}
                className="text-[10px] text-muted-foreground/50 hover:text-primary transition-colors"
              >
                Clear price
              </button>
            )}
          </div>
        )}
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Refine</p>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => push({ featured: currentFeatured ? null : 'true' })}
            className={cn(
              'w-8 h-4 rounded-full transition-colors relative',
              currentFeatured ? 'bg-primary' : 'bg-muted'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 w-3 h-3 rounded-full bg-background transition-transform',
                currentFeatured ? 'translate-x-4' : 'translate-x-0.5'
              )}
            />
          </div>
          <span className={cn('text-xs font-light transition-colors', currentFeatured ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}>
            Featured
          </span>
        </label>
      </div>

      {/* Clear all */}
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-primary transition-colors py-2 border border-border/50 hover:border-primary/30"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <aside className="md:w-56 md:shrink-0">
      {/* Mobile toggle bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 border-b border-border">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-light tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter & Sort
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-primary text-[8px] font-medium text-primary-foreground flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {currentSort !== 'newest' && (
          <span className="text-[10px] text-muted-foreground/50">
            {SORT_OPTIONS.find((o) => o.value === currentSort)?.label}
          </span>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-background border-r border-border overflow-y-auto z-10">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">{filterContent}</div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-border">
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Filters</span>
            {activeCount > 0 && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-primary/70">
                {activeCount} active
              </span>
            )}
          </div>
          {filterContent}
        </div>
      </div>
    </aside>
  )
}
