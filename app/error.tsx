'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center relative overflow-hidden">

        {/* Background ghost text */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[22vw] font-light leading-none tracking-tighter"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgb(216 173 63 / 0.08)',
            }}
          >
            ERROR
          </span>
        </div>

        {/* Radial haze */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgb(216 173 63 / 0.06) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg">

          <p className="text-primary text-[10px] tracking-[0.5em] uppercase">
            Something Went Wrong
          </p>

          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="flex-1 h-px bg-primary/30" />
            <div className="w-1 h-1 rotate-45 bg-primary/50" />
            <div className="flex-1 h-px bg-primary/30" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
            Unexpected Error
          </h1>

          <p className="text-sm font-light text-white/50 leading-relaxed max-w-sm">
            We encountered an unexpected error. Our team has been notified.
            Please try again or return to the home page.
          </p>

          {error.digest && (
            <p className="text-[10px] tracking-[0.2em] text-white/25 font-light">
              Ref: {error.digest}
            </p>
          )}

          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="flex-1 h-px bg-primary/30" />
            <div className="w-1 h-1 rotate-45 bg-primary/50" />
            <div className="flex-1 h-px bg-primary/30" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={reset}
              className="px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.4em] uppercase hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-10 py-4 border border-primary/40 text-foreground text-xs tracking-[0.4em] uppercase hover:border-primary/80 hover:text-primary transition-colors text-center"
            >
              Return Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
