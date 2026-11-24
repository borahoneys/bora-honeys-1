import Header from '@/components/header/Header'
import { getHomepageConfig } from '@/app/actions/homepage'
import { Suspense } from 'react'
import SmartImage from '@/components/ui/SmartImage'
import Link from 'next/link'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'BORA HONEY\'S | Luxury Indian Couture — New Collection 2026',
  description:
    'Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.',
}

interface ImageAsset { url: string; publicId: string }
interface CTAButton { label: string; href: string }
interface HomepageSection {
  type: 'image' | 'video'
  desktopImage?: ImageAsset
  mobileImage?: ImageAsset
  video?: ImageAsset
  button?: CTAButton
  isActive: boolean
  order: number
}

export default function HomePage() {
  return (
    <div>
      <Header />
      <h1 className="sr-only">BORA HONEY&apos;S — Luxury Indian Couture, Bespoke Bridal Wear &amp; Designer Lehengas, Shipped Worldwide</h1>
      <Suspense fallback={<div className="w-screen h-screen bg-muted/30 animate-pulse" />}>
        <HomeSections />
      </Suspense>
      <section className="px-6 py-20 max-w-3xl mx-auto text-center space-y-5">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase">Luxury Indian Couture, Made for the World</h2>
        <p className="text-sm font-light leading-relaxed text-muted-foreground">
          Founded by Honey Nanda in New Delhi, BORA HONEY&apos;S creates hand-embroidered bridal lehengas, bespoke couture and
          occasion wear, crafted in India and shipped worldwide to the USA, UK, Canada, Australia, UAE and beyond.
          Explore our <Link href="/products" className="underline underline-offset-4">latest pieces</Link>,{' '}
          <Link href="/collections" className="underline underline-offset-4">collections</Link> or book a{' '}
          <Link href="/bespoke-couture" className="underline underline-offset-4">bespoke couture consultation</Link>.
        </p>
      </section>
      <Footer />
    </div>
  )
}

async function HomeSections() {
  const config = await getHomepageConfig()

  const sections: HomepageSection[] = ((config.sections ?? []) as HomepageSection[])
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order)

  const hasContent = sections.some(
    (s) =>
      (s.type === 'image' && (s.desktopImage || s.mobileImage)) ||
      (s.type === 'video' && s.video)
  )

  return (
    <>
      {!hasContent ? (
        <div></div>
      ) : (
        sections.map((section, idx) => {
          if (section.type === 'video' && section.video) {
            return (
              <section key={idx} className="relative w-screen h-screen overflow-hidden">
                {/* <video
                  src={section.video.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute opacity-20 blur-xl inset-0 w-full h-full object-cover"
                /> */}
                <video
                  src={section.video.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute -translate-x-1/2 left-1/2 inset-0 w-auto h-full object-contain"
                />
                {section.button && (
                  <div className="absolute inset-0 flex items-end justify-center pb-20">
                    <Link
                      href={section.button.href}
                      className="bg-primary text-primary-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
                    >
                      {section.button.label}
                    </Link>
                  </div>
                )}
              </section>
            )
          }

          if (section.type === 'image') {
            const desktop = section.desktopImage
            const mobile = section.mobileImage
            if (!desktop && !mobile) return null
            const hasBoth = desktop && mobile

            return (
              <section key={idx} className="relative w-screen h-screen overflow-hidden">
                {hasBoth ? (
                  <>
                    <SmartImage
                      src={desktop!.url}
                      fill
                      className="object-cover object-top hidden md:block"
                      alt="BORA HONEY'S luxury Indian couture — new collection 2026"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                    <SmartImage
                      src={mobile!.url}
                      fill
                      className="object-cover object-top md:hidden"
                      alt="BORA HONEY'S luxury Indian couture — new collection 2026"
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </>
                ) : (
                  <SmartImage
                    src={(desktop ?? mobile)!.url}
                    fill
                    className="object-cover object-top"
                    alt="BORA HONEY'S luxury Indian couture — new collection 2026"
                    priority={idx === 0}
                    sizes="100vw"
                  />
                )}
                {section.button && (
                  <div className="absolute inset-0 flex items-end justify-center pb-20">
                    <Link
                      href={section.button.href}
                      className="bg-primary text-primary-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
                    >
                      {section.button.label}
                    </Link>
                  </div>
                )}
              </section>
            )
          }

          return null
        })
      )}
    </>
  )
}
