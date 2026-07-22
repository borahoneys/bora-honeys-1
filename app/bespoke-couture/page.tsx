import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import PlaceholderImage from './_components/PlaceholderImage'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Bespoke Couture | BORA HONEYS',
  description:
    'At Bora Honeys Couture, we believe that true luxury is deeply personal. Our Bespoke Couture service offers an exclusive design experience where every garment is imagined, designed, and handcrafted specifically for you.',
}

// const customisations = [
//   {
//     title: 'Made-to-Measure',
//     paragraphs: [
//       'Every garment is individually tailored to your exact body measurements, ensuring an impeccable fit that enhances your natural silhouette while offering exceptional comfort.',
//     ],
//   },
//   {
//     title: 'Custom Colours',
//     paragraphs: [
//       'Select from an extensive palette of luxurious shades, or work with our design team to create a colour story that perfectly complements your skin tone, personality, and celebration.',
//     ],
//   },
//   {
//     title: 'Necklines & Sleeves',
//     paragraphs: [
//       'From elegant sweetheart necklines and sculpted corsets to deep scoop necks, illusion details, dramatic sleeves, off-shoulder silhouettes, and timeless classics, every design element can be personalised to suit your vision.',
//     ],
//   },
//   {
//     title: 'Silhouettes',
//     paragraphs: [
//       'Whether you prefer a dramatic ball gown, elegant fish-cut skirt, structured mermaid silhouette, flowing A-line, regal trail, contemporary drapes, or modern couture separates, every silhouette is created exclusively around your body.',
//     ],
//   },
//   {
//     title: 'Fabrics',
//     paragraphs: [
//       'Choose from luxurious tulles, satins, silks, organza, crepes, velvets, laces, and premium couture textiles sourced to create garments that feel as extraordinary as they appear.',
//     ],
//   },
//   {
//     title: 'Embroidery',
//     paragraphs: [
//       'Every embroidery design is developed exclusively for your garment.',
//       'From delicate hand embroidery to intricate crystal work, pearls, sequins, cutdana, zari, beads, metallic embellishments, and couture craftsmanship, every detail is carefully handcrafted by skilled artisans.',
//     ],
//   },
//   {
//     title: 'Occasion Styling',
//     paragraphs: [
//       'Every couture piece is thoughtfully designed around your occasion.',
//       'Whether it is a Bridal Ceremony, Reception, Engagement, Sangeet, Cocktail, Mehendi, Red Carpet appearance, Destination Wedding, Luxury Celebration, or Evening Gala, we ensure your ensemble perfectly complements the moment.',
//     ],
//   },
// ]

const experienceSteps = [
  {
    step: 'Step One',
    title: 'Personal Consultation',
    paragraphs: [
      'Every journey begins with a personalised consultation where we understand your inspiration, preferences, event, measurements, colour choices, and styling requirements.',
    ],
    img: "/bespoke-couture/a.jpeg"
  },
  {
    step: 'Step Two',
    title: 'Design Development',
    paragraphs: [
      'Our designers transform your vision into exclusive concepts, sketches, embroidery layouts, fabric selections, and silhouette recommendations created uniquely for you.',
    ],
    img: "/bespoke-couture/b.jpg"
  },
  {
    step: 'Step Three',
    title: 'Craftsmanship',
    paragraphs: [
      'Our master artisans meticulously handcraft every detail using traditional couture techniques combined with modern innovation.',
      'Each stitch is placed with precision.',
      'Each embellishment is applied by hand.',
      'Every garment is crafted with patience, artistry, and uncompromising quality.',
    ],
    img: "/bespoke-couture/e.jpg"
  },
  {
    step: 'Step Four',
    title: 'Couture Fittings',
    paragraphs: [
      'Multiple fittings ensure every seam, contour, and proportion sits beautifully on your body.',
      'Our commitment is not simply creating a beautiful garment—but creating one that feels effortless to wear.',
    ],
    img: "/bespoke-couture/c.jpg"
  },
  {
    step: 'Step Five',
    title: 'Your Masterpiece',
    paragraphs: [
      'The final creation is carefully finished, inspected, and prepared exclusively for you.',
      'The result is a couture garment that is timeless, elegant, and uniquely yours.',
    ],
    img: "/bespoke-couture/d.jpg"
  },
]

const journeyStages = [
  {
    when: '6+ Months Before Your Event',
    title: 'Initial Consultation & Booking',
    body: 'Reserve your couture appointment, discuss your vision, event details, measurements, inspiration, and design preferences.',
  },
  {
    when: '5 Months Before',
    title: 'Design Development',
    body: 'Our designers create exclusive sketches, embroidery concepts, fabric selections, colour palettes, and silhouette recommendations tailored specifically to you.',
  },
  {
    when: '4–5 Months Before',
    title: 'Embroidery & Craftsmanship',
    body: 'Our artisans begin the intricate process of hand embroidery, embellishment, and couture construction using traditional craftsmanship techniques.',
  },
  {
    when: '2–3 Months Before',
    title: 'First Couture Fitting',
    body: 'Your garment begins taking shape. During this stage, we perfect the structure, balance, silhouette, and overall fit.',
  },
  {
    when: '4–8 Weeks Before',
    title: 'Final Fittings & Refinements',
    body: 'Every detail is refined—from hemlines and draping to embroidery placement and finishing touches—ensuring your garment feels as flawless as it looks.',
  },
  {
    when: '3-4 Weeks Before Delivery',
    title: 'Your Masterpiece',
    body: 'Your couture masterpiece is carefully inspected, professionally finished, and prepared for collection or delivery, ready for your special occasion.',
  },
]

export default function BespokeCouturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden border-b border-primary/15">
        <img src={"/bespoke-couture/6.jpg"} className="w-full h-full absolute object-cover object-right md:object-center inset-0" alt='appointments-only' />

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="relative h-full flex items-center px-6 md:px-16 py-24">
          <div className="max-w-xl space-y-6">
            <p className="text-primary text-xs tracking-[0.4em] uppercase">Bora Honeys Couture</p>
            <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-foreground">
              Bespoke Couture
            </h1>
            <p className="text-primary text-sm tracking-[0.35em] uppercase">Crafted Exclusively for You</p>
            <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed">
              <p>
                At Bora Honeys Couture, we believe that true luxury is deeply personal. Every woman is
                unique, and her couture should be too.
              </p>
              <p>
                Our Bespoke Couture service offers an exclusive design experience where every garment is
                imagined, designed, and handcrafted specifically for you. From the initial consultation to
                the final fitting, every detail is thoughtfully curated to reflect your individuality,
                celebrate your occasion, and complement your body with impeccable precision.
              </p>
              <p>
                Whether you are a bride walking down the aisle, attending an intimate celebration, making a
                statement at a gala, or celebrating one of life&apos;s most memorable moments, your couture
                piece is created to become a timeless part of your story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By Appointment Only */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-0 border border-primary/15">
          <div className="relative min-h-[600px] md:aspect-auto md:min-h-[640px]">
            <img src={"/bespoke-couture/2.jpeg"} className="w-full h-full absolute object-cover inset-0" alt='appointments-only' />

          </div>
          <div className="flex flex-col justify-center p-10 md:p-14 space-y-6 border-t border-primary/15 md:border-t-0 md:border-l md:border-primary/15">
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
              By Appointment Only
            </h2>
            <p className="text-primary text-sm italic tracking-wide">with our designer</p>
            <div className="w-8 border-t border-primary/40" />
            <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed">
              <p>
                Every bespoke couture consultation is conducted by appointment with our designer to ensure a
                truly personal and exclusive experience.
              </p>
              <p>
                During your consultation, our designer takes the time to understand your vision, event,
                personal style, body proportions, and every detail that will shape your couture creation.
                From silhouette and colour selection to neckline, embroidery, and finishing touches, every
                decision is thoughtfully guided to create a garment that is uniquely yours.
              </p>
              <p>
                As each Bora Honeys Couture masterpiece is individually designed and meticulously
                handcrafted, we accept only a limited number of bespoke couture commissions each season.
                This allows our designer and artisans to dedicate the highest level of craftsmanship,
                attention, and care to every creation.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-block w-fit bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
            >
              Reserve Your Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Your Couture. Your Signature. */}
      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-0 border border-primary/15">
          <div className="flex flex-col justify-center p-10 md:p-14 space-y-6 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
              Your Couture.
              <br />
              Your Signature.
            </h2>
            <div className="w-8 border-t border-primary/40" />
            <div className="space-y-5 text-sm font-light text-white/70 leading-relaxed">
              <p>Every Bora Honeys Couture creation begins with your vision.</p>
              <p>
                We take the time to understand your personality, aesthetic, event, comfort, and aspirations
                before transforming your ideas into a one-of-a-kind couture masterpiece.
              </p>
              <p>
                No two women are alike, which is why no two Bora Honeys Couture creations are ever
                identical.
              </p>
              <p>Every garment is designed exclusively for its wearer and handcrafted with exceptional attention to detail.</p>
            </div>
          </div>
          <div className="relative min-h-[600px] md:aspect-auto md:min-h-[640px] order-1 md:order-2 border-b border-primary/15 md:border-b-0 md:border-l md:border-primary/15">
            <img src={"/bespoke-couture/3.jpeg"} className="w-full h-full absolute object-top object-cover inset-0" alt='appointments-only' />

          </div>
        </div>
      </section>

      {/* What Can Be Customised */}
      {/* <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 text-center">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase mb-4">Personalisation</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground mb-4">
          What Can Be Customised?
        </h2>
        <p className="text-sm font-light text-white/60 max-w-xl mx-auto leading-relaxed mb-12">
          Every element of your couture creation can be personalised to suit your style, body, and occasion.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-px border border-primary/10 text-left">
          {customisations.map((item) => (
            <div key={item.title} className="bg-background flex flex-col">
              <div className="relative aspect-[3/4]">
                <PlaceholderImage className="absolute inset-0" alt={item.title} />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xs font-normal tracking-[0.2em] uppercase text-foreground">
                  {item.title}
                </h3>
                {item.paragraphs.map((p, i) => (
                  <p key={i} className="text-xs font-light text-white/60 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* The Bespoke Couture Experience */}
      <section className="bg-card border-y border-primary/15 py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            The Bespoke Couture Experience
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {experienceSteps.map((s) => (
            <div key={s.step} className="space-y-4">
              <div className="relative aspect-[3/4]">
                <img src={s.img} className="absolute object-cover inset-0" alt={s.title} />
              </div>
              <p className="text-primary text-[10px] tracking-[0.35em] uppercase">{s.step}</p>
              <h3 className="text-sm font-normal tracking-[0.15em] uppercase text-foreground">
                {s.title}
              </h3>
              <div className="space-y-2">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-xs font-light text-white/60 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Couture Timeline */}
      <section className="bg-card border-y border-primary/15 py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-5">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase">Our Couture Timeline</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-foreground">
            Couture Requires Time
          </h2>
          <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed text-left sm:text-center">
            <p>Each Bora Honeys Couture creation is handcrafted exclusively for one woman.</p>
            <p>
              Thousands of hand-placed embellishments, intricate embroidery, precision tailoring, and
              multiple fittings cannot be replicated through mass production.
            </p>
            <p>
              We therefore accept only a limited number of bespoke couture commissions each season to
              ensure every client receives the highest level of craftsmanship, personal attention, and
              luxury service.
            </p>
            <p>
              We encourage clients to reserve their couture consultation at least six months in advance to
              secure their preferred delivery timeline.
            </p>
            <p>
              At Bora Honeys Couture, every bespoke creation is meticulously handcrafted and individually
              developed from concept to completion.
            </p>
            <p>
              Unlike ready-to-wear garments, true couture cannot be rushed. Every design undergoes multiple
              stages of planning, pattern development, embroidery, construction, fittings, and finishing to
              achieve the level of craftsmanship our clients deserve.
            </p>
            <p>
              For this reason, we recommend beginning your couture journey a minimum of six months before
              your event.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-[10px] tracking-[0.4em] uppercase text-center mb-10">
            Your Couture Journey
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
            {journeyStages.map((stage, i) => (
              <div key={stage.when} className="relative text-center space-y-3 px-2">
                <div className="flex items-center justify-center">
                  <span className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary text-xs">
                    {i + 1}
                  </span>
                </div>
                <p className="text-primary text-[9px] tracking-[0.25em] uppercase">{stage.when}</p>
                <h3 className="text-xs font-normal tracking-[0.12em] uppercase text-foreground">
                  {stage.title}
                </h3>
                <p className="text-xs font-light text-white/60 leading-relaxed">{stage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 border border-primary/15 mb-16">
          <div className="flex flex-col justify-center p-10 md:p-14 space-y-8">
            <div className="space-y-5">
              <p className="text-primary text-[10px] tracking-[0.4em] uppercase">Our Promise</p>
              <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed">
                <p>
                  Every Bora Honeys Couture creation is handcrafted in limited quantities with exceptional
                  craftsmanship and meticulous attention to detail.
                </p>
                <p>We do not believe in mass production.</p>
                <p>
                  We believe in creating heirloom couture—pieces designed to be treasured for years,
                  remembered for a lifetime, and passed on with stories of elegance and celebration.
                </p>
              </div>
            </div>

            <div className="w-8 border-t border-primary/40" />

            <div className="space-y-5">
              <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase text-foreground">
                Begin Your Couture Journey
              </h2>
              <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed">
                <p>Luxury begins with a conversation.</p>
                <p>
                  Share your vision, inspiration, event details, and measurements with us, and allow our
                  designers to create a couture masterpiece crafted exclusively for you.
                </p>
                <p>Because true couture isn&apos;t chosen from a rack.</p>
                <p>It is imagined, designed, and created for one woman alone.</p>
              </div>
              <Link
                href="/contact-us"
                className="inline-block w-fit bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
              >
                Reserve Your Appointment
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto border-t border-primary/15 md:border-t-0 md:border-l md:border-primary/15">
            <img src={"/bespoke-couture/5.jpg"} className="w-full h-full absolute object-cover inset-0" alt='appointments-only' />
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed">
            <p>Luxury is not measured by labels or trends.</p>
            <p>
              It is found in the patience of true craftsmanship, the precision of every hand-finished
              detail, and the confidence of wearing something created exclusively for you.
            </p>
            <p>
              Every Bora Honeys Couture masterpiece is handcrafted with passion, perfected through
              artistry, and designed to become a timeless part of your legacy.
            </p>
          </div>
          <div className="w-8 border-t border-primary/40 mx-auto" />
          <p className="text-primary text-sm md:text-base tracking-[0.25em] uppercase">
            One Vision. One Woman. One Masterpiece.
          </p>
          <p className="text-foreground text-lg md:text-xl font-light tracking-[0.15em] uppercase">
            Welcome to the World of Bora Honeys Couture.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
