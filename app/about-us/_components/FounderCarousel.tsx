"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  // { src: "/founder-1.jpeg", alt: "Honey Nanda — Founder of BORA HONEY" },
  // { src: "/founder-2.jpeg", alt: "Honey Nanda — Founder of BORA HONEY" },
  { src: "/founder-3.jpeg", alt: "Honey Nanda — Founder of BORA HONEY" },
]

const AUTOPLAY_MS = 3500

export default function FounderCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="relative w-full h-full group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center border border-primary/40 bg-background/60 backdrop-blur-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center border border-primary/40 bg-background/60 backdrop-blur-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-1.5 h-1.5 transition-all duration-300 ${i === current
                  ? "bg-primary w-4"
                  : "bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
