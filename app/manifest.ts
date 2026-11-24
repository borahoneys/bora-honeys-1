import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BORA HONEY'S — Luxury Indian Couture",
    short_name: "BORA HONEY'S",
    description: 'Luxury Indian couture, bespoke bridal wear, shipped worldwide.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [{ src: '/logo.png', sizes: '512x512', type: 'image/png' }],
  }
}
