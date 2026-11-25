'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
  /** Start downloading straight away (use for a video at the very top of a page). */
  eager?: boolean
}

/**
 * Muted, looping background video that stays light until it is needed:
 * - nothing is downloaded until the video is about one screen away,
 * - it plays only while on screen and pauses when scrolled away,
 * - an optional poster image shows instantly while the video loads.
 */
export default function LazyVideo({ src, poster, className, eager = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const visible = useRef(false)
  const [load, setLoad] = useState(eager)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // Load once the video is within a screen's height of the viewport.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          loader.disconnect()
        }
      },
      { rootMargin: '100% 0px' }
    )
    if (!eager) loader.observe(video)

    // Play only while at least part of it is visible.
    const player = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    player.observe(video)

    // Once data arrives, start only if it is on screen right now.
    const onReady = () => {
      if (visible.current) video.play().catch(() => {})
    }
    video.addEventListener('canplay', onReady)

    return () => {
      loader.disconnect()
      player.disconnect()
      video.removeEventListener('canplay', onReady)
    }
  }, [eager])

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={load ? 'auto' : 'none'}
      className={className}
    />
  )
}
