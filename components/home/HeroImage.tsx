'use client'

import { useCallback, useState } from 'react'
import { getImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { ImageSkeleton } from '@/components/ui/SmartImage'

// Phones and small tablets (below Tailwind's `md`) get the portrait photo.
const MOBILE_QUERY = '(max-width: 767px)'

interface HeroImageProps {
  desktopSrc?: string
  mobileSrc?: string
  alt: string
  priority?: boolean
}

/**
 * Full-bleed homepage photo with art direction: phones get the portrait
 * (mobile) photo, larger screens get the landscape (desktop) one. Because it
 * renders a single <picture>, the browser downloads only the photo it shows.
 */
export default function HeroImage({ desktopSrc, mobileSrc, alt, priority = false }: HeroImageProps) {
  const [loaded, setLoaded] = useState(false)

  // Handles a photo already in the browser cache before hydration.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  const fallbackSrc = desktopSrc ?? mobileSrc
  if (!fallbackSrc) return null

  const common = { alt, fill: true, sizes: '100vw', quality: 85, priority }

  const { props: { srcSet: mobileSrcSet } } = getImageProps({ ...common, src: mobileSrc ?? fallbackSrc })
  const { props: imgProps } = getImageProps({ ...common, src: fallbackSrc })

  return (
    <>
      {!loaded && <ImageSkeleton />}
      <picture>
        {mobileSrc && desktopSrc && <source media={MOBILE_QUERY} srcSet={mobileSrcSet} />}
        <img
          {...imgProps}
          ref={ref}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn(
            // Top-anchored so heads are never cropped on very wide or tall screens.
            'object-cover object-top transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </picture>
    </>
  )
}
