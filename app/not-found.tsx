import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | BORA HONEY\'S',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center relative overflow-hidden">

        {/* Background ghost numerals */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[28vw] font-light tracking-tighter leading-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgb(216 173 63 / 0.08)',
            }}
          >
            404
          </span>
        </div>

        {/* Radial gold haze */}
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

          {/* Overline */}
          <p className="text-primary text-[10px] tracking-[0.5em] uppercase">
            Error 404
          </p>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="flex-1 h-px bg-primary/30" />
            <div className="w-1 h-1 rotate-45 bg-primary/50" />
            <div className="flex-1 h-px bg-primary/30" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
            Page Not Found
          </h1>

          {/* Body */}
          <p className="text-sm font-light text-white/50 leading-relaxed max-w-sm">
            The page you are looking for may have been moved, renamed, or no longer exists.
            Allow us to guide you back.
          </p>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="flex-1 h-px bg-primary/30" />
            <div className="w-1 h-1 rotate-45 bg-primary/50" />
            <div className="flex-1 h-px bg-primary/30" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/"
              className="px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.4em] uppercase hover:opacity-90 transition-opacity text-center"
            >
              Return Home
            </Link>
            <Link
              href="/contact-us"
              className="px-10 py-4 border border-primary/40 text-foreground text-xs tracking-[0.4em] uppercase hover:border-primary/80 hover:text-primary transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
