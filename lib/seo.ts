export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.borahoneys.in').replace(/\/$/, '')
export const SITE_NAME = "BORA HONEY'S"
export const DEFAULT_OG_IMAGE = '/hero-banner-1.webp'

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/** Trim to a search-result-friendly length without cutting mid-word. */
export function clip(text: string | undefined, max = 158): string | undefined {
  if (!text) return undefined
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

export const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Second Floor, Ramnath House, 4, Sri Aurobindo Marg, Qila Rai Pithora',
  addressLocality: 'New Delhi',
  addressRegion: 'Delhi',
  postalCode: '110030',
  addressCountry: 'IN',
}
