export const dynamic = 'force-dynamic'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import { getClientDiaries } from '@/app/actions/client-diaries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Diaries — Bora Honeys',
  description: 'Stories and experiences from the Bora Honeys family.',
}

export default async function ClientDiariesPage() {
  const entries = await getClientDiaries(true)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Page Header */}
        <section className="px-6 py-14 border-b border-border">
          <div className="max-w-4xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Bora Honeys</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-foreground mb-3">Client Diaries</h1>
            <p className="text-sm font-light text-muted-foreground max-w-xl leading-relaxed">
              Stories and experiences from the Bora Honeys family — each piece of couture holds a story.
            </p>
            {entries.length > 0 && (
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground/40 mt-5">
                {entries.length} {entries.length === 1 ? 'story' : 'stories'}
              </p>
            )}
          </div>
        </section>

        {/* Diary Grid */}
        <section className="px-6 py-12">
          {entries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">No stories yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {entries.map((entry: {
                _id: string; clientName: string; title?: string; quote: string
                image?: { url: string }; date?: string
              }) => (
                <article key={entry._id} className="flex flex-col gap-5">
                  {/* Client photo */}
                  {entry.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.image.url}
                      alt={entry.clientName}
                      className="w-full aspect-[4/5] object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] bg-muted/20 rounded-sm flex items-center justify-center">
                      <span className="text-4xl font-light text-muted-foreground/20">
                        {entry.clientName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Quote block */}
                  <div className="space-y-3">
                    <p className="text-primary text-2xl font-serif leading-none">&ldquo;</p>
                    {entry.title && (
                      <h2 className="text-sm font-light tracking-[0.1em] uppercase text-foreground">
                        {entry.title}
                      </h2>
                    )}
                    <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-5">
                      {entry.quote}
                    </p>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-foreground">
                        {entry.clientName}
                      </p>
                      {entry.date && (
                        <p className="text-[9px] tracking-widest uppercase text-muted-foreground/40 mt-0.5">
                          {new Date(entry.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
