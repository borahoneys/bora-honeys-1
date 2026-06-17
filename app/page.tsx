import Header from '@/components/header/Header'
import { getHomepageConfig } from '@/app/actions/homepage'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer/footer'

export const dynamic = 'force-dynamic'

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

export default async function HomePage() {
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
    <div>
      <Header />

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
                    <Image
                      src={desktop!.url}
                      fill
                      className="object-cover object-top hidden md:block"
                      alt=""
                      priority={idx === 0}
                      sizes="100vw"
                    />
                    <Image
                      src={mobile!.url}
                      fill
                      className="object-cover object-top md:hidden"
                      alt=""
                      priority={idx === 0}
                      sizes="100vw"
                    />
                  </>
                ) : (
                  <Image
                    src={(desktop ?? mobile)!.url}
                    fill
                    className="object-cover object-top"
                    alt=""
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
      <Footer />
    </div>
  )
}
