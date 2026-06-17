import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal & Dispute Resolution | Bora Honey\'s',
  description: 'Intellectual Property, Social Media, Dispute Resolution, Force Majeure, Care Instructions, and Checkout Consent policies for Bora Honey\'s.',
}

const sections = [
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'social-media', label: 'Social Media & User Interaction' },
  { id: 'dispute-resolution', label: 'Dispute Resolution & Arbitration' },
  { id: 'force-majeure', label: 'Force Majeure' },
  { id: 'care-compliance', label: 'Care Instructions & Compliance' },
  { id: 'checkout-consent', label: 'Checkout Consent Framework' },
]

const LegalFooter = () => (
  <div className="mt-10 pt-6 border-t border-primary/20 text-xs text-white/40 leading-relaxed space-y-1">
    <p><span className="text-white/60">Legal Name:</span> SUPERLATIVE GROUP &nbsp;|&nbsp; <span className="text-white/60">Trade Name:</span> Bora Honey&apos;s</p>
    <p><span className="text-white/60">Registered Address:</span> SCO 404, Second Floor, Mugal Canal, Karnal, Haryana 132001, India</p>
    <p><span className="text-white/60">GSTIN:</span> 06AIOPN2893G1ZU &nbsp;|&nbsp; <span className="text-white/60">Website:</span> www.borahoneys.in</p>
    <p>
      <span className="text-white/60">Email:</span> orders@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Grievance:</span> grievance@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Legal Notices:</span> notices@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Phone:</span> +91 8570873934
    </p>
  </div>
)

export default function LegalDisputeResolutionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Legal</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          Legal &amp; Dispute Resolution
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          This page consolidates our remaining legal and operational policies, covering intellectual property,
          social media conduct, dispute resolution, force majeure, textile compliance, and checkout consent.
          Last Updated: 18 June 2026.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">

        {/* Sidebar ToC */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-5">On This Page</p>
            <nav className="space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-white/50 hover:text-primary transition-colors duration-200 leading-relaxed py-1 border-l border-transparent hover:border-primary/40 pl-3"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile ToC */}
        <div className="lg:hidden mb-10 p-5 border border-primary/20 bg-card">
          <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-4">On This Page</p>
          <ol className="space-y-2 list-decimal list-inside">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-xs text-white/60 hover:text-primary transition-colors duration-200">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Content */}
        <main className="space-y-20 lg:col-start-2">

          {/* ── Intellectual Property ── */}
          <section id="intellectual-property">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">1</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Intellectual Property and Copyright Notice</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Ownership</h3>
              <p>1.1 All intellectual property subsisting in the Bora Honey&apos;s brand and Website is the exclusive property of SUPERLATIVE GROUP, protected under the Copyright Act, 1957, the Trade Marks Act, 1999, the Designs Act, 2000, and all other applicable intellectual property laws. This includes:</p>
              <ul>
                <li>The brand name &ldquo;Bora Honey&apos;s&rdquo;, logo, monograms, wordmarks, and trade dress.</li>
                <li>All garment designs, pattern drawings, technical sketches, design files, toile references, and embroidery motifs.</li>
                <li>All lookbook photographs, campaign imagery, editorial visuals, and styling content.</li>
                <li>All Website content including text, graphics, Product descriptions, and User interface elements.</li>
                <li>All social media content and marketing materials produced by or on behalf of Bora Honey&apos;s.</li>
                <li>All proprietary production techniques, embroidery specifications, and sourcing information.</li>
              </ul>

              <h3>2. Prohibited Uses</h3>
              <p>2.1 Without prior express written consent, no person may:</p>
              <ul>
                <li>Reproduce, modify, distribute, publicly display, or create derivative works from any Bora Honey&apos;s content or material.</li>
                <li>Use the Bora Honey&apos;s name, logo, or any confusingly similar mark in connection with any product or service.</li>
                <li>Use any Product image or design artwork for any commercial purpose, including advertising, resale listings, or monetised content.</li>
                <li>Replicate, commercially imitate, or misrepresent any Bora Honey&apos;s design, embroidery motif, or signature aesthetic.</li>
                <li>Use Product imagery to promote counterfeit, replica, or inspired-by products.</li>
                <li>Scrape, crawl, or extract content from the Website using automated tools or bots.</li>
                <li>Upload, submit, or make available any Website content, Product images, design materials, or campaign photography to any AI training dataset, generative AI image training system, large language model training corpus, or any other machine learning or artificial intelligence database.</li>
                <li>Republish campaign or Product photographs on press, editorial, or third-party platforms without prior written authorisation.</li>
                <li>Use Product images in commercial resale listings or on any multi-brand marketplace without prior written consent.</li>
              </ul>

              <h3>3. Influencer and Media Use</h3>
              <p>3.1 Non-commercial sharing of Bora Honey&apos;s content by customers with proper attribution, for personal purposes without commercial gain, is permitted provided it does not disparage the brand.</p>
              <p>3.2 Any commercial use of Bora Honey&apos;s content by influencers, stylists, media, or content creators requires a prior written licensing agreement. Commercial use without such authorisation constitutes infringement of our intellectual property rights, and Bora Honey&apos;s reserves all rights and remedies available under applicable law.</p>

              <h3>4. Media and Editorial Consent</h3>
              <p>4.1 By sharing photographs, videos, testimonials, or styling content that features Bora Honey&apos;s Products with us directly or by tagging us on social media, you grant Bora Honey&apos;s a royalty-free, worldwide, perpetual, non-exclusive license to reproduce, publish, and distribute such content for promotional purposes, without additional compensation, unless you expressly object in writing to legal@borahoneys.in.</p>
              <p>4.2 You warrant that you own or hold the right to license all content submitted, and that it does not infringe the rights of any third party.</p>
              <p>4.3 Fitting photographs, bridal photoshoots, and event styling images shared with us in connection with an Order are covered by this consent unless you expressly opt out in writing.</p>

              <h3>5. Counterfeit Products</h3>
              <p>5.1 The manufacture, sale, or promotion of counterfeit or imitation Bora Honey&apos;s products constitutes infringement of our intellectual property rights. Bora Honey&apos;s reserves all rights and remedies available under the Trade Marks Act, 1999, the Copyright Act, 1957, and all other applicable laws.</p>

              <h3>6. Reporting Infringement</h3>
              <p>6.1 To report suspected infringement or to serve formal legal notices: notices@borahoneys.in. For general IP queries: legal@borahoneys.in. Please include details of the infringing content, the platform on which it appears, and any supporting evidence.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Social Media ── */}
          <section id="social-media">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">2</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Social Media and User Interaction Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Scope</h3>
              <p>1.1 This Policy governs all interactions between Users and Bora Honey&apos;s across social media platforms including but not limited to Instagram, Pinterest, WhatsApp, and any other platform on which Bora Honey&apos;s maintains a presence.</p>

              <h3>2. Tagging and Reposting</h3>
              <p>2.1 Users who tag Bora Honey&apos;s in Posts featuring our Products grant Bora Honey&apos;s permission to repost, share, or feature such content across our social media channels and Website for promotional purposes, subject to appropriate attribution where feasible.</p>
              <p>2.2 If you do not wish your content to be reposted, please notify us in writing at legal@borahoneys.in and we will remove the content promptly.</p>

              <h3>3. Influencer and Stylist Usage Rights</h3>
              <p>3.1 Any commercial use of Bora Honey&apos;s Products, imagery, or brand name by influencers, content creators, or stylists for commercial gain requires a prior written licensing agreement with Bora Honey&apos;s. Organic, non-commercial tagging with proper attribution is permitted.</p>
              <p>3.2 Influencers and content creators who receive Products from Bora Honey&apos;s in any capacity must comply with the ASCI Guidelines and applicable consumer protection advertising norms regarding sponsored, gifted, and paid promotional content.</p>

              <h3>4. User Reviews and Testimonials</h3>
              <p>4.1 Reviews and testimonials submitted through the Website, social media, or direct communications may be published on the Website and social platforms for promotional purposes. By submitting a review or testimonial, you consent to its publication with or without attribution.</p>
              <p>4.2 We reserve the right to moderate, edit for clarity, or decline to publish reviews that contain defamatory content, false statements, offensive language, competitor references, or content irrelevant to the Product or service.</p>
              <p>4.3 We do not manufacture, incentivise, or publish false reviews. All published reviews are genuine and unsolicited unless clearly marked as sponsored.</p>

              <h3>5. Contests and Giveaways</h3>
              <p>5.1 Any contest, giveaway, or promotional event run by Bora Honey&apos;s on social media will be governed by separate terms published at the time of the promotion. All contests comply with applicable Indian laws, including the Prize Chits and Money Circulation Schemes (Banning) Act, 1978, to the extent applicable.</p>

              <h3>6. Prohibited Conduct</h3>
              <p>6.1 Users must not: post or share defamatory, false, or misleading content about Bora Honey&apos;s or its Products; impersonate Bora Honey&apos;s on any platform; use the Bora Honey&apos;s name or logo without authorisation; harass, threaten, or intimidate our team or other customers; or engage in coordinated negative campaigns or inauthentic activity.</p>
              <p>6.2 Bora Honey&apos;s reserves the right to restrict or remove access, report prohibited conduct to the relevant platform, and exercise all rights and remedies available under applicable law.</p>

              <h3>7. Content Moderation and Takedown</h3>
              <p>7.1 Bora Honey&apos;s reserves the right to delete, hide, or report any comment, post, or message on our owned channels that violates this Policy, applicable law, or platform community standards. We are not obligated to respond to every comment or message.</p>
              <p>7.2 If you believe any content on our social media channels infringes your rights, please contact us at legal@borahoneys.in with relevant details.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Dispute Resolution ── */}
          <section id="dispute-resolution">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">3</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Dispute Resolution and Arbitration Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Complaint Resolution</h3>
              <p>1.1 In the event of any grievance, please first contact us at grievance@borahoneys.in with a written description of the issue, your Order reference number, and supporting documentation. We will acknowledge receipt within 48 hours and endeavour to resolve the matter within 30 days.</p>

              <h3>2. Mediation</h3>
              <p>2.1 If the dispute is not resolved through direct negotiation within 30 days, either Party may propose mediation. If both Parties agree, a mutually acceptable neutral mediator will be appointed and costs shared equally unless otherwise agreed.</p>

              <h3>3. Arbitration</h3>
              <p>3.1 Any dispute, controversy, or claim arising out of or in connection with these Policies, a transaction, or the use of the Website that is not resolved through direct negotiation or mediation shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996 (as amended).</p>
              <p>3.2 The arbitration shall be conducted by a sole arbitrator mutually appointed by the Parties. If agreement is not reached within 15 days of referral, the arbitrator shall be appointed in accordance with the rules of the Delhi International Arbitration Centre (DIAC).</p>
              <p>3.3 The seat and venue of arbitration shall be New Delhi. The language of arbitration shall be English. Proceedings may be conducted virtually where the Parties agree or the arbitrator so directs.</p>
              <p>3.4 The arbitral award shall be final and binding, subject always to applicable law and consumer protection rights. Each Party shall bear its own legal costs unless the arbitrator awards otherwise. Arbitration proceedings and the award shall be confidential.</p>
              <p>3.5 Nothing in this arbitration clause constitutes a waiver of any non-waivable statutory right available to a consumer under applicable law. Consumers retain all statutory rights that cannot be waived or excluded by agreement, including rights under the Consumer Protection Act, 2019.</p>
              <p>3.6 Electronic records, Order confirmations, email correspondence, WhatsApp messages, delivery confirmations, and unboxing videos shall be admissible as evidence in arbitration proceedings.</p>
              <p>3.7 Nothing in this Clause prevents either Party from seeking urgent interim or injunctive relief from a court of competent jurisdiction.</p>

              <h3>4. Consumer Protection Proceedings</h3>
              <p>4.1 Notwithstanding the arbitration clause, nothing in this Policy restricts a consumer&apos;s right to approach the relevant Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019.</p>

              <h3>5. Governing Law and Jurisdiction</h3>
              <p>5.1 All disputes are governed by the laws of India. The courts of New Delhi shall have exclusive jurisdiction over matters not submitted to arbitration.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Force Majeure ── */}
          <section id="force-majeure">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">4</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Force Majeure Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Definition</h3>
              <p>1.1 A Force Majeure Event means any event beyond the reasonable control of Bora Honey&apos;s that prevents or materially delays the performance of its obligations. Force Majeure Events include, without limitation:</p>
              <ul>
                <li>Acts of God including earthquake, flood, cyclone, lightning, and fire.</li>
                <li>Epidemic, pandemic, or public health emergency declared by any authority.</li>
                <li>War, armed conflict, terrorism, civil unrest, or government sanctions.</li>
                <li>Actions of any governmental or regulatory authority including seizure, restriction, or prohibition.</li>
                <li>Strikes, lockouts, or industrial action affecting courier, logistics, or supply chains.</li>
                <li>Failure or disruption of utility services, internet infrastructure, or telecommunications networks.</li>
                <li>Illness, incapacitation, or unavailability of key artisans or embroidery craftspersons.</li>
                <li>Embroidery cluster or artisanal hub shutdowns due to local administrative or health reasons.</li>
                <li>Fabric import restrictions, customs delays, or supply chain disruptions affecting raw material availability.</li>
                <li>Dyeing facility disruptions or shortages of natural dye materials.</li>
                <li>Bridal or festive season supply shortages resulting in artisan unavailability or extended lead times.</li>
                <li>Disruption of courier and logistics services for reasons beyond the courier&apos;s reasonable control.</li>
              </ul>

              <h3>2. Effect</h3>
              <p>2.1 We will notify you promptly of any Force Majeure Event and its anticipated effect on your Order. We will resume performance as soon as the event ceases.</p>
              <p>2.2 If a Force Majeure Event continues for more than 60 days, either Party may cancel the affected Order by written notice. Any payment received will be refunded within 14 business days of cancellation.</p>
              <p>2.3 A Force Majeure Event does not include financial difficulty of Bora Honey&apos;s or any failure of a third-party supplier that could have been avoided through reasonable alternative arrangements.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Care Instructions ── */}
          <section id="care-compliance">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">5</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Care Instructions and Textile Compliance Disclosure</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Regulatory Compliance</h3>
              <p>1.1 All Products comply with the Textile (Consumer Protection) Regulations, 1988, applicable BIS standards for textile labelling, and any other applicable textile regulation in force in India. Each Product carries a care label affixed to the garment and care instructions are displayed on the Product page.</p>

              <h3>2. Care Guidelines</h3>
              <p>2.1 The following guidelines apply unless specific care label instructions indicate otherwise:</p>
              <ul>
                <li>Dry cleaning is strongly recommended for all embellished, embroidered, zardozi, and delicate fabric garments.</li>
                <li>Do not machine wash embellished or hand-embroidered garments.</li>
                <li>Store garments in breathable garment bags away from direct sunlight, humidity, and chemical exposure.</li>
                <li>Do not expose embellished garments to perfume, hairspray, or chemical solvents.</li>
                <li>Steam or press on the reverse side through a pressing cloth at a cool temperature.</li>
                <li>Beaded and sequined garments should be handled with care to avoid beadwork displacement.</li>
                <li>For handloom fabric garments where hand-washing is indicated, use cold water and mild detergent. Wring gently.</li>
              </ul>

              <h3>3. Liability</h3>
              <p>3.1 To the maximum extent permissible under applicable law, Bora Honey&apos;s bears no liability for damage, discolouration, shrinkage, beadwork loss, or deterioration resulting from failure to follow care instructions. Such damage does not constitute a defect and does not entitle the User to any return, exchange, or refund, subject always to applicable consumer protection rights.</p>

              <h3>4. Fibre Content and Country of Origin</h3>
              <p>4.1 Fibre content and country of origin are disclosed on the care label and, where available, on the Product page. Bora Honey&apos;s Products are crafted in India using natural and blended fibres.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Checkout Consent ── */}
          <section id="checkout-consent">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">6</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Checkout Consent and Acknowledgement Framework</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                This document sets out the consent checkboxes, acknowledgement language, and operational consent
                mechanisms implemented at checkout, account registration, and all Order flows on the Website.
                All consent checkboxes are unticked by default and must be individually and affirmatively selected
                by the User. Pre-ticked boxes do not constitute valid consent under applicable law.
              </p>

              <h3>1. Standard Checkout Consent Checkbox</h3>
              <p>To be displayed at checkout for all Orders, immediately above the payment button:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I have read and agree to the Terms of Use, Terms of Sale, Refund Policy, Return and Exchange Policy, Cancellation Policy, and Product Disclaimer published on the Website. I understand that all sales are final, subject to the exceptions set out in the Refund Policy.
              </div>
              <p>1.1 This checkbox is mandatory. The payment button must remain inactive until this checkbox is selected. The User&apos;s selection must be logged with a timestamp and Order reference for evidentiary purposes.</p>

              <h3>2. Made-to-Order Acknowledgement Checkbox</h3>
              <p>To be displayed at checkout for any Order that includes a made-to-order, bespoke, custom, or bridal Product:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I understand that this Order includes a made-to-order couture garment that is produced exclusively for me. I confirm that this Product is non-returnable, non-exchangeable, and non-cancellable once my Order is confirmed. I have reviewed the size guide and provided accurate measurements. I accept the Made-to-Order and Custom Couture Policy.
              </div>
              <p>2.1 This checkbox must appear in addition to the standard checkout checkbox for any Order containing a made-to-order Product. It must be a separate, distinct checkbox requiring individual selection.</p>

              <h3>3. Pre-Order Acknowledgement Checkbox</h3>
              <p>To be displayed at checkout for any Order that includes a Pre-Order Product:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I understand that this is a Pre-Order. The Product does not yet exist in finished form and will be produced and dispatched within the estimated timeline stated in the Product listing. I accept that production and delivery timelines are estimates only and are not guaranteed. I have read and accept the Pre-Order Policy.
              </div>

              <h3>4. High-Value Order Acknowledgement</h3>
              <p>To be displayed for all Orders exceeding INR 1,00,000:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I confirm that I am placing this Order for my personal use and not for commercial resale. I understand that Orders of this value may be subject to identity verification. I agree to cooperate with any reasonable verification request from Bora Honey&apos;s.
              </div>

              <h3>5. Marketing Communications Consent</h3>
              <p>To be displayed at account registration and at checkout:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I would like to receive updates about new collections, exclusive previews, festive edits, and promotional offers from Bora Honey&apos;s by email, SMS, and WhatsApp. I understand that I may opt out at any time by clicking unsubscribe or writing to orders@borahoneys.in. (Optional)
              </div>
              <p>5.1 This checkbox is optional and must not be pre-selected. Transactional communications do not require separate consent and will be sent regardless of whether this box is selected.</p>

              <h3>6. WhatsApp Communication Consent</h3>
              <p>To be displayed where WhatsApp is offered as a communication channel:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                &#9634; I consent to receiving Order updates, dispatch notifications, and delivery information from Bora Honey&apos;s via WhatsApp on the mobile number I have provided. I understand that transactional messages are necessary for Order fulfilment and that I may update my communication preferences by contacting orders@borahoneys.in.
              </div>
              <p>6.1 This consent must be separately recorded and timestamped. Where WhatsApp is used to share Order-related communications, the User&apos;s consent record must be retained for a minimum of three years.</p>

              <h3>7. Cookie Consent Banner</h3>
              <p>To be displayed on the User&apos;s first visit to the Website, as a banner or overlay:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card text-sm font-light text-white/70 italic leading-relaxed">
                We use cookies to ensure the Website functions correctly and to improve your experience. Strictly necessary cookies are always active. You may accept or decline optional analytics and functionality cookies below. For more information, please read our Cookie Policy.<br /><br />
                &#9634; Accept All Cookies &nbsp;&nbsp;&nbsp; &#9634; Accept Necessary Cookies Only &nbsp;&nbsp;&nbsp; &#9634; Manage Preferences
              </div>
              <p>7.1 Cookie preferences must be stored and respected on subsequent visits. Users must be able to withdraw or update their cookie consent at any time through a readily accessible preference centre on the Website.</p>

              <h3>8. Consent Records and Audit Trail</h3>
              <p>8.1 All consent interactions at checkout and registration must be logged with the following data points: User identifier or session ID; timestamp (date and time, IST); IP address; specific consent(s) given; Order reference number (where applicable); and version of the Policy consented to at the time.</p>
              <p>8.2 Consent records must be retained for a minimum of three years and must be producible in the event of a consumer dispute, chargeback investigation, or regulatory inquiry.</p>
              <p>8.3 When any Policy is updated, the version number or effective date must be updated accordingly, so that historical consent records remain traceable to the specific version of the Policy in force at the time.</p>

              <h3>9. Accessibility of Policies</h3>
              <p>9.1 All Policies referenced in the checkout consent checkboxes must be accessible via clearly labelled hyperlinks at the point of consent. Links must open in a new tab or overlay and must not redirect the User away from the checkout flow.</p>
              <p>9.2 A consolidated &ldquo;Legal&rdquo; or &ldquo;Policies&rdquo; page must be maintained on the Website linking to all published Policies in their current form. The footer of every page of the Website must include a link to this consolidated legal page.</p>

              <h3>10. Contact Us Reference</h3>
              <p>10.1 A dedicated Contact Us page must be maintained on the Website setting out the following details in full, in compliance with the Consumer Protection (E-Commerce) Rules, 2020:</p>
              <div className="mt-4 p-5 border border-primary/20 bg-card space-y-2 text-sm font-light text-white/70">
                <p><span className="text-white/50">Legal Name:</span> SUPERLATIVE GROUP</p>
                <p><span className="text-white/50">Trade Name:</span> Bora Honey&apos;s</p>
                <p><span className="text-white/50">Registered Address:</span> SCO 404, Second Floor, Mugal Canal, Karnal, Haryana 132001, India</p>
                <p><span className="text-white/50">GSTIN:</span> 06AIOPN2893G1ZU</p>
                <p><span className="text-white/50">Customer Support:</span> orders@borahoneys.in</p>
                <p><span className="text-white/50">Grievance Officer:</span> Honey Nanda &nbsp;·&nbsp; grievance@borahoneys.in</p>
                <p><span className="text-white/50">Legal Notices:</span> notices@borahoneys.in</p>
                <p><span className="text-white/50">Privacy:</span> privacy@borahoneys.in</p>
                <p><span className="text-white/50">Phone:</span> +91 8570873934</p>
                <p><span className="text-white/50">Support Hours:</span> Monday to Saturday, 10:00 AM to 6:00 PM</p>
              </div>
              <p>10.2 The Grievance Officer&apos;s name and contact details must be displayed prominently on the Website and must be updated promptly if there is any change in the designated officer.</p>
            </div>

            <LegalFooter />
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}
