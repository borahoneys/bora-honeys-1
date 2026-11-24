import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import FounderCarousel from './_components/FounderCarousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/about-us' },
  title: 'About Us — Founder Honey Nanda & Our Story',
  description: 'Founded by Honey Nanda in 2022, BORA HONEY\'S is a luxury fashion label proudly Made in India, creating couture for the modern woman and the modern Indian bride.',
}

const pillars = [
  {
    number: '01',
    title: 'Your Design Philosophy',
    body: 'At BORA HONEY\'S, we believe couture should feel personal. Every silhouette is designed to enhance confidence, movement, and individuality, allowing women to express themselves through fashion while remaining elegant, powerful, and authentic.',
  },
  {
    number: '02',
    title: 'Slow Fashion & Craftsmanship',
    body: 'We embrace a made-to-order and craftsmanship-driven approach, allowing our artisans the time and precision required to create garments of exceptional quality. Every piece undergoes multiple stages of handwork before reaching the final client.',
  },
  {
    number: '03',
    title: 'Your Signature Aesthetic',
    body: 'BORA HONEY\'S is known for modern Indian silhouettes, sculpted tailoring, intricate hand embellishments, dramatic details, couture draping, and contemporary glamour that balances sophistication with statement-making design.',
  },
  {
    number: '04',
    title: 'Global Vision',
    body: 'While proudly rooted in India, BORA HONEY\'S is designed for a global woman. Our creations are worn by clients across different countries, cultures, and celebrations, reflecting the universal language of elegance and craftsmanship.',
  },
  {
    number: '05',
    title: 'Custom Couture Services',
    body: 'Alongside seasonal collections, BORA HONEY\'S offers personalized couture experiences, allowing clients to collaborate on silhouettes, colours, embellishments, and details tailored to their vision and occasion.',
  },
  {
    number: '06',
    title: 'Sustainability Angle',
    body: 'We value mindful production, skilled craftsmanship, and responsible design practices that prioritize quality, longevity, and timeless appeal over fast-changing trends.',
  },
  {
    number: '07',
    title: 'Your Brand Mission',
    body: 'Our mission is to celebrate women through fashion that is timeless rather than temporary, memorable rather than ordinary, and crafted to be treasured for years to come.',
  },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Our Story</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          About Us
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          Founded by Honey Nanda in 2022, BORA HONEY'S is a luxury fashion label proudly Made in India,
          creating couture for the modern woman and the modern Indian bride.
        </p>
      </div>

      {/* Founder portrait + opening story */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-0">
        <div className="grid md:grid-cols-2 gap-0 border border-primary/15">

          {/* Image column — carousel */}
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[560px] bg-card overflow-hidden">
            <FounderCarousel />
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center p-10 md:p-14 space-y-6 border-t border-primary/15 md:border-t-0 md:border-l md:border-primary/15">
            <p className="text-primary text-[10px] tracking-[0.4em] uppercase">The Founder</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
              Honey Nanda
            </h2>
            <div className="w-8 border-t border-primary/40" />
            <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed">
              <p>
                From an early age, Honey Nanda was deeply passionate about fashion, creativity, and design.
                Growing up in India—a country renowned for its rich textile heritage, skilled artisans, and
                labour-intensive craftsmanship—she developed a profound appreciation for the hands behind every
                creation.
              </p>
              <p>
                As an entrepreneur and designer, Honey understood that true luxury is not only defined
                by beautiful design but also by the dedication, skill, and craftsmanship of the artisans who
                bring each vision to life.
              </p>
              <p className="text-white/50 italic">
                This philosophy remains at the heart of BORA HONEY'S today.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

        {/* Narrative */}
        <section className="space-y-8">
          <div className="space-y-6 text-sm font-light text-white/75 leading-relaxed">
            <p>
              From an early age, Honey Nanda was deeply passionate about fashion, creativity, and design.
              Growing up in India—a country renowned for its rich textile heritage, skilled artisans, and
              labour-intensive craftsmanship—she developed a profound appreciation for the hands behind every
              creation. As an entrepreneur and designer, Honey understood that true luxury is not only defined
              by beautiful design but also by the dedication, skill, and craftsmanship of the artisans who
              bring each vision to life.
            </p>
            <p>
              This philosophy remains at the heart of BORA HONEY'S today.
            </p>
            <p>
              Built on a foundation of artistry, innovation, and respect for craftsmanship, BORA HONEY'S
              specializes in bridal couture, reception wear, cocktail ensembles, sangeet outfits, evening
              wear, and luxury occasion wear. The brand is dedicated to creating pieces that embody timeless
              elegance, sophisticated style, and exceptional attention to detail.
            </p>
            <p>
              Every BORA HONEY'S creation is thoughtfully crafted using premium fabrics, modern Indian
              silhouettes, intricate hand embroidery, hand embellishments, and signature 3D couture embroidery
              techniques. We believe true luxury lies in detailed craftsmanship, where every stitch, crystal,
              bead, and embellishment is meticulously applied to create garments that are both distinctive
              and unforgettable.
            </p>
            <p>
              While our roots are firmly grounded in Indian craftsmanship and heritage, BORA HONEY'S has grown
              into a global couture brand, proudly serving clients around the world. Today, our creations are
              worn by women across continents who appreciate handcrafted luxury, refined aesthetics, and
              contemporary elegance. Our journey reflects a commitment to sharing the beauty of Indian artistry
              with a global audience.
            </p>
            <p>
              Our design philosophy seamlessly blends traditional craftsmanship with modern couture aesthetics,
              resulting in sophisticated silhouettes that feel contemporary yet timeless. From statement bridal
              ensembles and glamorous reception wear to elegant cocktail and evening looks, every garment is
              designed to celebrate confidence, individuality, and personal style.
            </p>
            <p>
              At BORA HONEY'S, we are committed to preserving and promoting the value of skilled craftsmanship
              while embracing innovation in design. Each collection reflects our dedication to couture, detailed
              artistry, and refined luxury, ensuring every piece becomes part of life&apos;s most meaningful
              celebrations.
            </p>
            <p>
              Today, BORA HONEY'S continues to evolve as a luxury fashion house recognized for its handcrafted
              couture, modern Indian silhouettes, exceptional craftsmanship, and dedication to creating fashion
              that transcends borders.
            </p>
          </div>
        </section>

        {/* Gold rule */}
        <div className="border-t border-primary/20" />

        {/* Slow Fashion — two voices */}
        <section className="space-y-6">
          <p className="text-primary text-[10px] tracking-[0.35em] uppercase">Our Approach</p>

          <div className="space-y-5 text-sm font-light text-white/75 leading-relaxed">
            <p>
              At BORA HONEY'S, we believe in creating fashion that lasts beyond a single occasion. In a world
              of fast-changing trends, we embrace a slow fashion approach, focusing on quality, craftsmanship,
              and timeless design. Our pieces are thoughtfully created to be worn, cherished, and revisited
              for years to come. Many of our clients continue to wear and preserve their BORA HONEY'S creations
              long after their special occasion, making each garment not just an outfit, but a lasting part
              of their personal journey and memories.
            </p>
            <p>
              True luxury is timeless. Every BORA HONEY'S creation is designed with longevity in mind,
              combining exceptional craftsmanship with enduring elegance. Rather than following fleeting
              trends, we create couture that remains relevant and treasured for years. Our garments are often
              preserved as keepsakes and passed through life&apos;s most meaningful celebrations, reflecting our
              commitment to slow fashion and lasting value.
            </p>
          </div>
        </section>

        {/* Gold rule */}
        <div className="border-t border-primary/20" />

        {/* Pillars */}
        <section className="space-y-6">
          <p className="text-primary text-[10px] tracking-[0.35em] uppercase">Our Pillars</p>
          <div className="grid gap-px border border-primary/15 bg-primary/10">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="bg-background p-8 space-y-3 border-b border-primary/10 last:border-b-0">
                <div className="flex items-start gap-6">
                  <span className="text-primary text-[10px] tracking-[0.3em] shrink-0 pt-0.5">{pillar.number}</span>
                  <div className="space-y-3">
                    <h2 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground">
                      {pillar.title}
                    </h2>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
