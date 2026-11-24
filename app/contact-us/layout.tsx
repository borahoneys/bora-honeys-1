import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/contact-us' },
  title: 'Contact Us',
  description:
    'Book a virtual or in-store appointment with BORA HONEY\'S for bespoke Indian couture, custom bridal wear, and luxury occasion wear consultations.',
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children
}
