import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Book a virtual or in-store appointment with Bora Honeys for bespoke Indian couture, custom bridal wear, and luxury occasion wear consultations.',
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children
}
