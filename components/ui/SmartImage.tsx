'use client'

import { useCallback, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

/**
 * next/image with a pulsing skeleton shown until the image has loaded,
 * then a fade-in. Drop-in replacement for <Image> / <img>.
 */
export default function SmartImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  // Handles images already in the browser cache before hydration.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <>
      {props.fill && !loaded && <ImageSkeleton />}
      <Image
      {...props}
      ref={ref}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      className={cn(
        'transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      />
    </>
  )
}

/** Skeleton block to place behind a SmartImage (parent must be `relative`). */
export function ImageSkeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('absolute inset-0 animate-pulse bg-muted/30', className)} />
}
