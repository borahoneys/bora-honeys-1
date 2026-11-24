import Header from '@/components/header/Header'

/** Shared Suspense fallback: real header + pulsing blocks, so navigation feels instant. */
export function GridSkeleton({ items = 6, aspect = 'aspect-[3/4]' }: { items?: number; aspect?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="px-6 py-12 border-b border-border space-y-4">
          <div className="h-3 w-24 bg-muted/30 animate-pulse" />
          <div className="h-9 w-64 bg-muted/30 animate-pulse" />
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 py-4 md:p-6">
          {Array.from({ length: items }, (_, i) => (
            <div key={i} className="space-y-3">
              <div className={`${aspect} bg-muted/30 animate-pulse`} />
              <div className="h-3 w-1/3 bg-muted/30 animate-pulse" />
              <div className="h-4 w-2/3 bg-muted/30 animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 pt-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square lg:h-[80vh] w-full bg-muted/30 animate-pulse" />
        <div className="space-y-4 lg:pl-12">
          <div className="h-3 w-24 bg-muted/30 animate-pulse" />
          <div className="h-8 w-3/4 bg-muted/30 animate-pulse" />
          <div className="h-5 w-32 bg-muted/30 animate-pulse" />
          <div className="h-40 w-full bg-muted/30 animate-pulse" />
        </div>
      </main>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div>
      <Header />
      <div className="w-screen h-screen bg-muted/30 animate-pulse" />
    </div>
  )
}
