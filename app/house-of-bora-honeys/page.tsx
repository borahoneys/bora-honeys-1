import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import PlaceholderImage from '@/app/bespoke-couture/_components/PlaceholderImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House of Bora Honeys | BORA HONEYS',
  description:
    'Step into the Bora Honeys Atelier, where craftsmanship, artistry, and couture come together. A space dedicated to creating bespoke masterpieces.',
}

const experiences = [
  {
    icon: '◆',
    title: 'Private Consultations',
    description: 'Meet one-on-one with our designer in a private and luxurious setting.',
  },
  {
    icon: '✦',
    title: 'Bespoke Craftsmanship',
    description: 'Every couture piece is individually crafted exclusively for you.',
  },
  {
    icon: '◇',
    title: 'Luxury Fittings',
    description: 'Every fitting piece sits the silhouette with precision and care.',
  },
  {
    icon: '◆',
    title: 'Personal Attention',
    description: 'A highly personalised journey from sketch to final creation.',
  },
]

const atelierInfo = {
  name: 'BORA HONEYS COUTURE ATELIER',
  address: '7th Floor, Times Square Building, Mumbai, Mumbai-East, Mumbai 400090, India',
  phone: '+91 8098 31000',
  email: 'atelier@borahoneys.com',
  whatsapp: 'WhatsApp Us',
  hours: {
    weekdays: '11:00 AM - 7:00 PM',
    sunday: 'Closed',
    note: 'By Appointment Only',
  },
}

export default function HouseOfBoraHoneysPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden border-b border-primary/15">
        <PlaceholderImage className="absolute inset-0" alt="Bora Honeys Atelier" priority />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
        <div className="relative h-full flex items-center px-6 md:px-16 py-24">
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-foreground">
              House of Bora Honeys
            </h1>
            <p className="text-primary text-sm tracking-[0.35em] uppercase">Where Every Creation Begins.</p>
            <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed">
              <p>
                A space where craftsmanship, artistry and couture come together.
              </p>
            </div>
            <Link
              href="#atelier-info"
              className="inline-block bg-transparent border border-primary text-primary px-6 py-2.5 text-xs tracking-[0.3em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Watch Our Store Film
            </Link>
          </div>
        </div>
      </section>

      {/* A Destination for Couture */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 space-y-4">
          <p className="text-primary text-xs tracking-[0.4em] uppercase">The Atelier</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            A Destination for Couture
          </h2>
          <div className="w-8 border-t border-primary/40" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed">
            <p>
              Nestled in an intimate couture space, Bora Honeys Atelier is where dreams are transformed into handcrafted masterpieces. Every appointment is a private experience designed around you, allowing our designers to understand your vision and create patterns that become treasured heirlooms.
            </p>
            <p>
              Every silhouette tells a story, and every embroidery tells a celebration of craft, culture, and the woman who wears it.
            </p>
          </div>
          <div className="relative aspect-4/3">
            <PlaceholderImage className="absolute inset-0" alt="Bora Honeys Atelier interior" />
          </div>
        </div>

        {/* Atelier Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-primary/15">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-3/4 bg-background">
              <PlaceholderImage className="absolute inset-0" alt={`Atelier detail ${i}`} />
            </div>
          ))}
        </div>
      </section>

      {/* The Experience */}
      <section className="bg-card border-y border-primary/15 py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
              The Experience
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {experiences.map((exp) => (
              <div key={exp.title} className="text-center space-y-4">
                <div className="flex justify-center text-primary text-4xl">
                  {exp.icon}
                </div>
                <h3 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground">
                  {exp.title}
                </h3>
                <p className="text-xs font-light text-white/60 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the Atelier */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 space-y-4">
          <p className="text-primary text-xs tracking-[0.4em] uppercase">Behind the Scenes</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            Inside the Atelier
          </h2>
        </div>

        <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed mb-12">
          <p>
            Behind every masterpiece lies hours of dedication, artistry and uncompromising craftsmanship. Watch our artisans bring your vision to life through intricate embroidery, precision tailoring, and meticulous handcrafted details.
          </p>
        </div>

        {/* Video/Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`relative aspect-3/4 group ${i === 1 ? 'md:col-span-1 md:row-span-2' : ''}`}>
              <PlaceholderImage className="absolute inset-0" alt={`Atelier process ${i}`} />
              {i === 2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center cursor-pointer hover:border-accent transition-colors">
                    <div className="w-0 h-0 border-l-8 border-l-primary border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-card border-y border-primary/15 py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 border border-primary/15">
            <div className="flex flex-col justify-center p-10 md:p-14 space-y-6">
              <blockquote className="space-y-4">
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed italic">
                  "Bora Honeys Couture was born from a vision that every woman deserves to wear something designed exclusively for her. Every silhouette, every embroidery tells a story, and every creation is handcrafted to celebrate the woman who wears it."
                </p>
              </blockquote>
              <div className="space-y-1">
                <p className="text-primary text-sm tracking-[0.2em] uppercase font-normal">Bora Honeys</p>
                <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Founder & Creative Director</p>
              </div>
            </div>
            <div className="relative aspect-3/4 md:aspect-auto border-t border-primary/15 md:border-t-0 md:border-l md:border-primary/15">
              <PlaceholderImage className="absolute inset-0" alt="Founder portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* By Appointment Only */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            By Appointment Only
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-sm font-light text-white/70 leading-relaxed">
            Every couture consultation is conducted by appointment to ensure an intimate and personalised luxury experience. Your vision, your event, your masterpiece.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>

      {/* Visit Our Atelier */}
      <section id="atelier-info" className="bg-card border-y border-primary/15 py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact & Hours */}
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-primary text-xs tracking-[0.4em] uppercase">Visit Our Atelier</p>
                <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase text-foreground">
                  {atelierInfo.name}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Address</p>
                  <p className="text-sm font-light text-white/70 leading-relaxed">
                    {atelierInfo.address}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Contact</p>
                  <div className="space-y-2">
                    <a href={`tel:${atelierInfo.phone}`} className="flex items-center gap-3 text-sm font-light text-white/70 hover:text-primary transition-colors">
                      <span>☎</span>
                      <span>{atelierInfo.phone}</span>
                    </a>
                    <a href={`mailto:${atelierInfo.email}`} className="flex items-center gap-3 text-sm font-light text-white/70 hover:text-primary transition-colors">
                      <span>✉</span>
                      <span>{atelierInfo.email}</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 text-sm font-light text-white/70 hover:text-primary transition-colors">
                      <span>💬</span>
                      <span>{atelierInfo.whatsapp}</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3 border-t border-primary/15 pt-6">
                  <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Opening Hours</p>
                  <div className="space-y-2 text-sm font-light text-white/70">
                    <div className="flex justify-between">
                      <span>Monday – Saturday</span>
                      <span>{atelierInfo.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>{atelierInfo.hours.sunday}</span>
                    </div>
                    <p className="text-xs text-primary italic tracking-wide pt-2">
                      {atelierInfo.hours.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-4/3 md:aspect-auto md:min-h-125 border border-primary/15">
              <PlaceholderImage className="absolute inset-0" alt="Atelier location map" />
            </div>
          </div>
        </div>
      </section>

      {/* Follow Our Journey */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            Follow Our Journey
          </h2>
        </div>

        {/* Image Grid/Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px border border-primary/15">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="relative aspect-square bg-background">
              <PlaceholderImage className="absolute inset-0" alt={`Journey moment ${i}`} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">
            @borahoneys on Instagram
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
