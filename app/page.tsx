import Header from '@/components/header/Header'
import { getHomepageConfig } from '@/app/actions/homepage'
import { Suspense } from 'react'
import HeroImage from '@/components/home/HeroImage'
import LazyVideo from '@/components/ui/LazyVideo'
import Link from 'next/link'
import { Fragment } from 'react'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'BORA HONEY\'S | Luxury Indian Couture | New Collection 2026',
  description:
    'Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.',
}

interface ImageAsset { url: string; publicId: string; poster?: string }
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
      <h1 className="sr-only">BORA HONEY&apos;S: Luxury Indian Couture, Bespoke Bridal Wear &amp; Designer Lehengas, Shipped Worldwide</h1>
      <Suspense fallback={<div className="w-full h-svh bg-muted/30 animate-pulse" />}>
        <HomeSections />
      </Suspense>
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
        sections.map((section, idx) => (
          <Fragment key={idx}>
            {renderSection(section, idx)}
            {idx === 1 && <NewCollectionStrip />}
          </Fragment>
        ))
      )}
    </>
  )
}

/** Band between the second photo and the videos that links to the 2026 collection. */
function NewCollectionStrip() {
  return (
    <section className="w-full bg-background py-14 md:py-20 flex flex-col items-center text-center px-6">
      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">New Collection 2026</p>
      <h2 className="text-2xl md:text-4xl font-light tracking-[0.12em] uppercase text-foreground mb-8">Rebirth</h2>
      <Link
        href="/collections/collection-2026"
        className="bg-primary text-primary-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
      >
        Explore the 2026 Collection
      </Link>
    </section>
  )
}

function renderSection(section: HomepageSection, idx: number) {
  if (section.type === 'video' && section.video) {
    return (
      <section className="relative w-full h-svh overflow-hidden bg-background">
        <LazyVideo
          src={section.video.url}
          poster={section.video.poster}
          eager={idx === 0}
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
    return (
      <section className="relative w-full h-svh overflow-hidden bg-background">
        <HeroImage
          desktopSrc={desktop?.url}
          mobileSrc={mobile?.url}
          alt="BORA HONEY'S luxury Indian couture, new collection 2026"
          priority={idx === 0}
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

  return null
}
