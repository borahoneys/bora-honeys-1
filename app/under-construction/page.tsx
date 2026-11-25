import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: { absolute: "BORA HONEY'S | Coming Soon" },
  description: "BORA HONEY'S. Luxury Indian Couture. Our new website is on its way.",
  robots: { index: false, follow: false },
}

export default function UnderConstructionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center text-foreground">
      <Image
        src="/logo.png"
        alt="BORA HONEY'S"
        width={2950}
        height={1593}
        priority
        className="h-auto w-44 sm:w-56"
      />

      <div className="mt-12 h-px w-16 bg-primary/60" />

      <p className="mt-10 text-xs uppercase tracking-[0.4em] text-primary">Under Construction</p>
      <h1 className="mt-5 max-w-xl text-2xl font-light leading-snug tracking-wide sm:text-3xl">
        Something beautiful is being crafted.
      </h1>
      <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-foreground/70">
        Our new website is on its way. For enquiries and bespoke appointments, please reach out to us.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 text-sm font-light tracking-wide sm:flex-row sm:gap-8">
        <a href="mailto:info@borahoneys.in" className="text-foreground/90 transition-colors hover:text-primary">
          info@borahoneys.in
        </a>
        <span className="hidden h-4 w-px bg-foreground/20 sm:block" />
        <a href="tel:+919138881112" className="text-foreground/90 transition-colors hover:text-primary">
          +91 91388 81112
        </a>
      </div>
    </main>
  )
}
