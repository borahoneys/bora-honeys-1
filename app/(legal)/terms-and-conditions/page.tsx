import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | BORA HONEY\'S',
  description: 'Terms of Use, Terms of Sale, Made-to-Order Policy, Pre-Order Policy, Alteration Policy, Product Disclaimer and Website Disclaimer for BORA HONEY\'S.',
}

const sections = [
  { id: 'terms-of-use', label: 'Terms of Use' },
  { id: 'terms-of-sale', label: 'Terms of Sale' },
  { id: 'made-to-order', label: 'Made-to-Order & Custom Couture' },
  { id: 'pre-order', label: 'Pre-Order Policy' },
  { id: 'alteration', label: 'Alteration Policy' },
  { id: 'product-disclaimer', label: 'Product Disclaimer' },
  { id: 'website-disclaimer', label: 'Website Disclaimer' },
]

const LegalFooter = () => (
  <div className="mt-10 pt-6 border-t border-primary/20 text-xs text-white/40 leading-relaxed space-y-1">
    <p><span className="text-white/60">Legal Name:</span> SUPERLATIVE GROUP &nbsp;|&nbsp; <span className="text-white/60">Trade Name:</span> BORA HONEY&apos;S</p>
    <p><span className="text-white/60">Registered Address:</span> Coming Soon</p>
    <p><span className="text-white/60">GSTIN:</span> 06AIOPN2893G1ZU &nbsp;|&nbsp; <span className="text-white/60">Website:</span> www.borahoneys.in</p>
    <p>
      <span className="text-white/60">Email:</span> orders@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Grievance:</span> grievance@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Legal Notices:</span> notices@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Phone:</span> +91 8570873934
    </p>
  </div>
)

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Legal</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          Terms &amp; Conditions
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          This page consolidates all policies governing your access to, browsing of, and purchase of
          Products through the BORA HONEY&apos;S website. Last Updated: 18 June 2026.
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

          {/* ── Terms of Use ── */}
          <section id="terms-of-use">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">1</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Terms of Use</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                This Terms of Use (&ldquo;Policy&rdquo;) is published by SUPERLATIVE GROUP, a company incorporated under the
                Companies Act, 2013 and registered under the laws of India, operating the luxury couture label
                &ldquo;BORA HONEY&apos;S&rdquo; through its website at www.borahoneys.in (&ldquo;Website&rdquo;). This Policy forms part of
                the integrated legal framework governing your access to and use of the Website and the purchase of
                Products offered thereon.
              </p>
              <p>
                By accessing, browsing, or using the Website in any manner, you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, &ldquo;your&rdquo;)
                unconditionally agree to be bound by these Terms of Use and all Policies published on the Website,
                each of which is incorporated herein by reference. If you do not agree, please discontinue use of
                the Website immediately.
              </p>
              <p>
                This document constitutes an electronic record within the meaning of the Information Technology
                Act, 2000 (&ldquo;IT Act&rdquo;) and the rules made thereunder, and does not require any physical or digital
                signature.
              </p>

              <h3>1. Definitions</h3>
              <p>1.1 &ldquo;Website&rdquo; means the digital platform operated by BORA HONEY&apos;S at www.borahoneys.in, including all pages, sub-domains, and mobile-optimised versions.</p>
              <p>1.2 &ldquo;Products&rdquo; means all luxury couture garments, accessories, bridal wear, made-to-order pieces, and any other items offered for sale through the Website.</p>
              <p>1.3 &ldquo;Services&rdquo; means all features and functionalities made available through the Website, including browsing, account creation, purchasing, and customer support.</p>
              <p>1.4 &ldquo;User&rdquo; means any natural person who accesses or uses the Website, whether or not a purchase is made.</p>
              <p>1.5 &ldquo;Order&rdquo; means a request by a User through the Website for the purchase of one or more Products.</p>
              <p>1.6 &ldquo;Policies&rdquo; means these Terms of Use together with all other policies published on the Website, including but not limited to the Terms of Sale, Privacy Policy, Shipping and Delivery Policy, Refund Policy, Return and Exchange Policy, Cancellation Policy, Payment and Pricing Policy, Intellectual Property Policy, Product Disclaimer, Website Disclaimer, Cookie Policy, and all others.</p>

              <h3>2. Eligibility</h3>
              <p>2.1 The Website is intended for persons who are 18 years of age or older and legally competent to enter into binding contracts under the Indian Contract Act, 1872. By accessing the Website, you represent and warrant that you satisfy these requirements.</p>
              <p>2.2 Minors under 18 years of age may only use the Website under the direct supervision of a parent or legal guardian who accepts these Terms on their behalf.</p>
              <p>2.3 Use of the Website for any commercial purpose, including resale, is strictly prohibited without our prior written consent.</p>

              <h3>3. Account Registration</h3>
              <p>3.1 You agree to provide accurate, complete, and current information during account registration and to keep your account information updated. You are solely responsible for maintaining the confidentiality of your login credentials and for all activity conducted through your account.</p>
              <p>3.2 You must immediately notify us at orders@borahoneys.in if you become aware of any unauthorised access to your account. We reserve the right to suspend or terminate any user account in the event of suspected fraud, breach of these Terms, or conduct harmful to the Website.</p>
              <p>3.3 Each person may maintain only one account. Multiple accounts created to circumvent restrictions, obtain duplicate benefits, or facilitate fraud are prohibited.</p>

              <h3>4. Permitted Use</h3>
              <p>4.1 You are granted a limited, revocable, non-exclusive, non-transferable license to access and use the Website solely for the purpose of browsing Products and placing Orders for personal use.</p>
              <p>4.2 You must not: (a) use the Website for any unlawful or fraudulent purpose; (b) attempt unauthorised access to any part of the Website or its infrastructure; (c) introduce malicious code of any kind; (d) use automated scraping, crawling, or data-extraction tools; (e) reproduce or commercially exploit any Website content; (f) impersonate any person or entity; (g) interfere with Website performance; or (h) use the Website to collect personal data of other Users.</p>

              <h3>5. Communications Consent</h3>
              <p>5.1 By registering an account or placing an Order, you expressly consent to receive transactional communications from BORA HONEY&apos;S via email, SMS, and WhatsApp, including Order confirmations, dispatch notifications, delivery updates, payment receipts, and care instructions. Transactional communications are mandatory and cannot be opted out of while an Order is active.</p>
              <p>5.2 Marketing communications, including information about new collections, promotional offers, and editorial content, are optional. You may opt out of marketing communications at any time by following the unsubscribe instructions in any such communication, or by writing to orders@borahoneys.in.</p>

              <h3>6. Right to Refuse Service</h3>
              <p>6.1 BORA HONEY&apos;S reserves the right, at its sole discretion and without assigning reasons, to refuse service to any User, decline to accept any Order, cancel a confirmed Order, terminate a consultation, or decline to undertake a custom project, in the following circumstances:</p>
              <ul>
                <li>The User has engaged in abusive, threatening, or harassing conduct towards our team.</li>
                <li>The User has a history of fraudulent activity, unjustified chargebacks, or policy violations.</li>
                <li>The Order is suspected to be for commercial resale or other unauthorised purposes.</li>
                <li>The User has provided false or misleading information.</li>
                <li>We have reasonable grounds to believe that proceeding with the Order or engagement would expose BORA HONEY&apos;S to legal, reputational, or commercial risk.</li>
              </ul>

              <h3>7. Accuracy of Information</h3>
              <p>7.1 We make reasonable efforts to ensure that all content, Product descriptions, pricing, and information on the Website are accurate and current. However, errors may occur. We reserve the right to correct any inaccuracy or omission at any time, including after an Order has been placed.</p>

              <h3>8. Third-Party Links</h3>
              <p>8.1 The Website may contain links to third-party websites. We do not endorse or assume responsibility for such websites. Your use of any third-party website is entirely at your own risk.</p>

              <h3>9. Indemnification</h3>
              <p>9.1 You agree to indemnify and hold harmless BORA HONEY&apos;S, its proprietor, employees, and agents from and against any claims, damages, liabilities, costs, and legal expenses arising out of or in connection with your breach of these Terms, your violation of applicable law, or any content you submit through the Website.</p>

              <h3>10. Limitation of Liability</h3>
              <p>10.1 To the maximum extent permissible under applicable law, BORA HONEY&apos;S aggregate liability for any claim shall not exceed the amount paid by you for the specific Order giving rise to such claim. Nothing in these Terms excludes or limits liability to the extent such exclusion or limitation is prohibited by the Consumer Protection Act, 2019 or any other applicable law.</p>

              <h3>11. Governing Law and Jurisdiction</h3>
              <p>11.1 These Terms are governed by the laws of India. Subject to the Dispute Resolution and Arbitration Policy, any dispute shall be subject to the exclusive jurisdiction of the courts of New Delhi.</p>

              <h3>12. Grievance Officer</h3>
              <p>12.1 Name: Honey Nanda &nbsp;|&nbsp; Designation: Grievance Officer &nbsp;|&nbsp; Email: grievance@borahoneys.in. Grievances will be acknowledged within 48 hours and resolved within 30 days of receipt, in accordance with the Consumer Protection (E-Commerce) Rules, 2020.</p>
              <p>12.2 For formal legal notices, cease and desist communications, and all formal legal correspondence, please write to: notices@borahoneys.in. Communications sent to any other address will not constitute valid legal notice to BORA HONEY&apos;S.</p>

              <h3>13. Modifications, Severability, and Entire Agreement</h3>
              <p>13.1 We may amend these Terms at any time. Updated Terms take effect upon publication on the Website. Your continued use of the Website constitutes acceptance.</p>
              <p>13.2 If any provision is found unlawful or unenforceable, it shall be severed without affecting the remainder. These Terms, together with all Policies, constitute the entire agreement between you and BORA HONEY&apos;S with respect to your use of the Website.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Terms of Sale ── */}
          <section id="terms-of-sale">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">2</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Terms of Sale</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                These Terms of Sale govern every transaction concluded between BORA HONEY&apos;S and a User through
                the Website and are to be read with the Terms of Use and all other Policies.
              </p>

              <h3>1. Products and Availability</h3>
              <p>1.1 Listing of a Product on the Website constitutes an invitation to treat, not an offer capable of acceptance. Placement of an Order by a User constitutes an offer to purchase. A binding contract of sale is formed only upon our issuance of a written Order Confirmation.</p>
              <p>1.2 We reserve the right to withdraw, modify, or limit the availability of any Product at any time. Many Products are handcrafted in extremely limited quantities and availability is not guaranteed.</p>
              <p>1.3 We reserve the right to limit the quantity of any Product purchasable by a single User or household.</p>

              <h3>2. Pricing</h3>
              <p>2.1 All prices are in Indian Rupees (INR), inclusive of all applicable GST. The applicable GST rate, GSTIN, and HSN Code are as confirmed and set out in the GST and Tax Disclosure Policy published on the Website.</p>
              <p>2.2 Prices are subject to change without notice. The price applicable to your Order is that confirmed in the Order Confirmation. Adding a Product to cart does not reserve the price.</p>
              <p>2.3 In the event of a manifest pricing error, we reserve the right to cancel any Order placed at the erroneous price and issue a full refund, irrespective of whether an Order Confirmation has been issued. We will notify you promptly in such circumstances.</p>

              <h3>3. Ordering Process</h3>
              <p>3.1 You are responsible for reviewing your Order carefully before completing payment. Once payment is submitted, the Order cannot be modified. Please refer to the Cancellation Policy for post-payment cancellation terms.</p>
              <p>3.2 For Orders exceeding INR 1,00,000, we may require additional identity verification before confirming the Order. Please refer to the Fraud Prevention and Verification Policy.</p>

              <h3>4. Order Confirmation and Contract Formation</h3>
              <p>4.1 A binding contract of sale is formed when we issue a written Order Confirmation to your registered email address, setting out the Product(s), price, and estimated dispatch timeline.</p>
              <p>4.2 If you do not receive an Order Confirmation within 24 hours of payment, please contact orders@borahoneys.in as this may indicate a payment processing issue.</p>

              <h3>5. GST and Invoicing</h3>
              <p>5.1 A GST-compliant tax invoice will be issued for every Order and sent to your registered email at the time of dispatch, bearing: the registered business name SUPERLATIVE GROUP; registered address (Coming Soon); GSTIN 06AIOPN2893G1ZU; HSN Code 6204; Product description, quantity, unit price, GST rate and amount, and total consideration.</p>
              <p>5.2 Invoice correction requests must be submitted within 48 hours of receipt to orders@borahoneys.in.</p>
              <p>5.3 Interstate supplies attract IGST. Intrastate supplies attract CGST and SGST, as applicable under the GST Act, 2017.</p>

              <h3>6. Luxury Authentication</h3>
              <p>6.1 BORA HONEY&apos;S guarantees the authenticity of all Products sold through the Website and any other officially authorised sales channel expressly communicated by BORA HONEY&apos;S (including authorised trunk shows, exhibitions, pop-up events, or offline appointments confirmed in writing by BORA HONEY&apos;S). We do not authenticate, warrant, or assume any responsibility for Products purchased through unauthorised resellers, multi-brand marketplaces, second-hand platforms, or any channel not expressly authorised by us.</p>
              <p>6.2 Authentic BORA HONEY&apos;S Products are available only through the Website and officially authorised channels confirmed in writing by BORA HONEY&apos;S. If you encounter BORA HONEY&apos;S Products listed on any unauthorised third-party platform or marketplace, please report this to legal@borahoneys.in.</p>

              <h3>7. Anti-Reseller and Personal Use</h3>
              <p>7.1 All Products are for the personal, non-commercial use of the purchasing User. Purchase for resale, commercial use, or arbitrage is strictly prohibited and may result in cancellation of the Order and blacklisting of the account.</p>

              <h3>8. Export Control and Sanctions Compliance</h3>
              <p>8.1 We do not transact with any person, entity, or jurisdiction that is subject to sanctions under applicable Indian law or the laws of other applicable jurisdictions. We reserve the right to cancel any Order that we believe, in our reasonable judgment, involves a sanctioned party or jurisdiction.</p>
              <p>8.2 All international transactions are subject to applicable export control and customs laws. The User is responsible for ensuring that the importation of our Products is lawful in their jurisdiction.</p>

              <h3>9. Exclusion of Consequential, Event-Related, and Ceremonial Losses</h3>
              <p>9.1 BORA HONEY&apos;S shall not be liable for any indirect, incidental, special, consequential, ceremonial, emotional, reputational, or event-related loss or damage arising from or in connection with any Order, production timeline, delay in delivery, fit dissatisfaction, styling preference, or inability to use a Product for a specific occasion or purpose. Without limiting the generality of the foregoing, this exclusion applies specifically to:</p>
              <ul>
                <li>Loss or damage arising from a missed, postponed, or disrupted wedding, engagement ceremony, reception, sangeet, mehendi, gala, award function, fashion event, or any other ceremonial or social occasion.</li>
                <li>Costs arising from cancelled or rescheduled photography sessions, editorial shoots, campaign appearances, media engagements, or destination wedding events.</li>
                <li>Stylist fees, hair and makeup costs, venue charges, travel costs, hotel costs, or any other ancillary event expenditure incurred in reliance on an estimated delivery timeline.</li>
                <li>Emotional distress, disappointment, or anxiety arising from delayed delivery, fit issues, or inability to wear a Product for an intended occasion.</li>
                <li>Reputational loss or public embarrassment arising from non-availability of a Product.</li>
                <li>Loss of income, professional opportunity, or commercial engagement.</li>
                <li>Consequential losses arising from fit dissatisfaction, colour variation, or styling preference that do not constitute a defect under these Terms.</li>
              </ul>
              <p>9.2 This clause applies whether the loss is foreseeable or not and whether BORA HONEY&apos;S has been advised of the possibility of such loss or not.</p>
              <p>9.3 Users who require a Product for a specific event or occasion are strongly advised to: (a) place their Order well in advance of the event date, allowing reasonable time for production, delivery, and any alterations; (b) obtain written confirmation of the production and delivery timeline from BORA HONEY&apos;S before finalising event arrangements; and (c) maintain an independent contingency plan that does not depend solely on the estimated delivery date.</p>
              <p>9.4 Nothing in this Clause excludes any liability that cannot be excluded under the Consumer Protection Act, 2019 or other applicable law.</p>

              <h3>10. Governing Law</h3>
              <p>10.1 These Terms of Sale are governed by the laws of India. Disputes arising from any transaction are subject to the exclusive jurisdiction of the courts of New Delhi, subject to the Dispute Resolution and Arbitration Policy.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Made-to-Order ── */}
          <section id="made-to-order">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">3</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Made-to-Order &amp; Custom Couture Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Scope</h3>
              <p>1.1 This Policy applies to all made-to-order garments, custom couture pieces, bridal orders, and any Product specifically produced or customised for an individual User, including Products described on the Website or in communications as made-to-order, bespoke, custom, or bridal.</p>
              <p>1.2 Made-to-order Products are non-returnable, non-exchangeable, and non-cancellable from the moment of Order Confirmation.</p>

              <h3>2. Measurement Responsibility and Fit Tolerance</h3>
              <p>2.1 The User is responsible for providing accurate body measurements using the measurement guide provided by BORA HONEY&apos;S. We strongly recommend that measurements be taken by a qualified tailor or trained professional at the time of Order placement.</p>
              <p>2.2 The User assumes sole responsibility for the accuracy of measurements provided. Fit issues arising from inaccurate, incorrectly recorded, or outdated measurements are not covered under our warranty and do not entitle the User to any remedy, including alteration at BORA HONEY&apos;S cost.</p>
              <p>2.3 Couture garments are constructed to the exact measurements provided at the time of Order. Body fluctuations, weight changes, postural changes, or changes in body composition occurring after the measurement date are outside the scope of our production responsibility. Users who anticipate such changes are advised to communicate this at the time of Order placement.</p>
              <p>2.4 Couture garments are structurally different from stretch or ready-to-wear clothing. Fit expectations based on ready-to-wear sizing, bodycon construction, or stretch fabrics do not apply. BORA HONEY&apos;S garments are constructed using structured couture techniques with defined seam allowances, and fit is based on the measurements provided and not on any subjective expectation of stretch, compression, or generic sizing.</p>
              <p>2.5 Individual body proportions, posture, shoulder slope, hip-to-waist ratio, and torso length may affect the drape and silhouette of a structured garment in ways that cannot be fully accounted for by measurements alone. BORA HONEY&apos;S accepts no liability for fit variations attributable to individual body proportions not separately communicated at the time of Order.</p>
              <p>2.6 A garment measurement tolerance of plus or minus 1.5 centimetres is standard for handcrafted couture production and does not constitute a defect or grounds for any claim.</p>

              <h3>3. Production Timelines</h3>
              <p>3.1 Estimated production timelines are communicated at Order Confirmation and are estimates only. Timelines may be affected by fabric sourcing, artisan availability, and embroidery complexity.</p>
              <p>3.2 We will notify the User in writing if a production delay is anticipated, and provide a revised estimated delivery date.</p>

              <h3>4. Design Approval</h3>
              <p>4.1 Any design approval provided by the User in writing, including by email or messaging platform, constitutes the User&apos;s final acceptance of the design. Material changes after written approval are subject to additional costs and revised timelines and remain at our discretion.</p>

              <h3>5. Alterations at Production Stage</h3>
              <p>5.1 Minor adjustments falling within normal couture production tolerance are included. Material changes to silhouette, construction, or design after production commences will not be accommodated without additional cost, subject to feasibility at that stage of production.</p>

              <h3>6. Payment</h3>
              <p>6.1 Full payment is required at Order Confirmation. The Order will not enter production until full payment is received. All made-to-order payments are non-refundable except in the limited circumstances set out in the Refund Policy.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Pre-Order ── */}
          <section id="pre-order">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">4</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Pre-Order Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                This Policy applies to all Orders placed for Products that are not yet in production or stock at
                the time of purchase, including collection launches, capsule drops, trunk show pieces, festive
                edits, bridal releases, and any Product listed on the Website as a pre-order.
              </p>

              <h3>1. Nature of Pre-Orders</h3>
              <p>1.1 A pre-order constitutes a binding commitment to purchase a Product that is to be produced or released at a future date. By placing a pre-order, you agree that: (a) the Product does not yet exist in finished form; (b) production will commence on or after the date specified in the Product listing; and (c) delivery will occur after the estimated production period has elapsed.</p>

              <h3>2. Timelines</h3>
              <p>2.1 Estimated production and delivery timelines for pre-order Products are provided on the Product listing page and are estimates only. They are not guaranteed. Timelines may be affected by fabric sourcing, artisan availability, embroidery complexity, import lead times, and other production variables.</p>
              <p>2.2 We will notify the User in writing if an anticipated delay is material (i.e., exceeds 30 days beyond the original estimate).</p>

              <h3>3. Limited Allocation</h3>
              <p>3.1 Pre-order Products are produced in limited quantities. Acceptance of a pre-order is subject to allocation availability. In the event that the allocation is exhausted before your Order is processed, we will notify you and issue a full refund.</p>

              <h3>4. Right to Substitute Minor Components</h3>
              <p>4.1 Due to the production lead times inherent in pre-order goods, minor components including trims, lining fabrics, thread colours, and embellishments may be substituted if the original specification becomes unavailable. Any substitution will be aesthetically consistent with the original design. Material changes will be communicated to the User before production.</p>

              <h3>5. Cancellation of Pre-Orders</h3>
              <p>5.1 Pre-orders may be cancelled by the User within 48 hours of placement, subject to a cancellation fee of 25% of the Order value. After 48 hours, pre-orders are non-cancellable as production planning and material sourcing are initiated.</p>
              <p>5.2 BORA HONEY&apos;S reserves the right to cancel a pre-order and issue a full refund in the event of production infeasibility, material unavailability, or other circumstances beyond our reasonable control.</p>

              <h3>6. Payment</h3>
              <p>6.1 Full payment is required at the time of placing a pre-order. Payment will be held and the garment will enter production at the scheduled commencement date.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Alteration Policy ── */}
          <section id="alteration">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">5</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Alteration Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Complimentary Alterations</h3>
              <p>1.1 For made-to-order garments, BORA HONEY&apos;S provides one round of complimentary minor alterations within the following scope: standard length adjustments, minor seam adjustments within available seam allowance, and hook-and-eye or closure adjustments. Complimentary alterations must be requested within 7 (seven) days of delivery and are subject to assessment by our team.</p>
              <p>1.2 Complimentary alterations are available only where the garment has been produced to the measurements provided by the User at the time of Order. Where fit issues arise from inaccurate measurements provided by the User, alterations will be quoted as paid work.</p>

              <h3>2. Paid Alterations</h3>
              <p>2.1 Alterations beyond the complimentary scope, including structural changes, re-embroidery, re-embellishment, conversion alterations, or alterations necessitated by inaccurate measurements provided by the User, are available as paid services, subject to feasibility and at quoted rates.</p>
              <p>2.2 Alteration quotations will be provided in writing. Work will not commence until the quotation is accepted and payment confirmed.</p>

              <h3>3. Alteration Fitting and Scheduling</h3>
              <p>3.1 Where a physical fitting is required for alteration work, the User is responsible for attending the scheduled appointment. Non-attendance without 48 hours notice may result in forfeiture of the complimentary alteration entitlement or re-scheduling charges.</p>

              <h3>4. Shipping for Alteration Returns</h3>
              <p>4.1 For remote alteration requests, the User is responsible for shipping the garment to us in its original or comparable packaging. We recommend insured, tracked shipping. We are not liable for loss or damage in transit to us.</p>
              <p>4.2 Return shipping of the altered garment to the User will be arranged by BORA HONEY&apos;S. The cost of return shipping will be communicated to the User before dispatch and is charged to the User for paid alteration services.</p>

              <h3>5. Third-Party Tailoring</h3>
              <p>5.1 BORA HONEY&apos;S accepts no responsibility or liability for any alteration, modification, or repair carried out by any third-party tailor or alteration service after delivery of the Product. Any alteration by a third party voids any remaining alteration entitlement from BORA HONEY&apos;S and shall not constitute grounds for any claim.</p>

              <h3>6. Post-Delivery Fit Adjustments</h3>
              <p>6.1 Any fit adjustment request made after delivery must be submitted in writing within 14 (fourteen) days. Requests submitted beyond this period will be assessed at our sole discretion and may be treated as paid alteration work.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Product Disclaimer ── */}
          <section id="product-disclaimer">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">6</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Product Disclaimer</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Colour and Visual Representation</h3>
              <p>1.1 Product photographs are captured under professional studio lighting. Colour, tone, and saturation may differ from the actual Product due to: monitor calibration and screen resolution differences across devices; studio lighting conditions; the light-absorbing or reflective properties of the fabric, thread, or embellishment; and post-production image editing. Such variations are not defects and do not constitute grounds for any claim.</p>

              <h3>2. Handcrafted and Artisanal Variation</h3>
              <p>2.1 BORA HONEY&apos;S Products are crafted using traditional Indian artisanal techniques including hand embroidery, zardozi, zari work, resham embroidery, sequin and bead application, mirror work, block printing, and handloom weaving. The following inherent variations are to be expected and are the hallmark of authentic handcrafted luxury couture:</p>
              <ul>
                <li>Minor irregularities in embroidery stitch density, direction, or spacing.</li>
                <li>Variation in placement or density of hand-applied embellishments including sequins, beads, mirrors, and pearls.</li>
                <li>Slight asymmetry in zari, zardozi, or thread detailing across garment panels.</li>
                <li>Variations in weave, texture, nap, or surface finish of handloom fabrics.</li>
                <li>Dye lot inconsistencies in naturally dyed, hand-dyed, or artisan-processed fabrics.</li>
                <li>Natural variation in beadwork placement or bead oxidation over time due to material properties.</li>
                <li>Sequin fall-out or minor embellishment loss from delicate or heavily embellished garments, particularly after use or dry cleaning, within acceptable industry tolerance.</li>
                <li>Slight variation in weight, drape, or fall of the fabric relative to the Product photograph.</li>
                <li>Handcrafted asymmetry or artisanal irregularity as an inherent characteristic of the piece.</li>
              </ul>
              <p>2.2 None of the above constitute manufacturing defects. They are inherent and celebrated characteristics of luxury handcrafted production.</p>

              <h3>3. Size and Fit</h3>
              <p>3.1 Size guides are indicative references. BORA HONEY&apos;S garments are designed with specific couture proportions that may differ from standard ready-to-wear sizing. Fit is influenced by individual body proportions that cannot be fully accounted for in a size guide.</p>
              <p>3.2 Slight dimensional deviations of up to 1 to 2 centimetres are within standard tolerance for handcrafted production and are not defects.</p>
              <p>3.3 Pre-Order sizing consultations are available at orders@borahoneys.in. Incorrect size selection is the User&apos;s responsibility and does not constitute grounds for any return, exchange, or refund.</p>

              <h3>4. Storage and Condition</h3>
              <p>4.1 Luxury couture garments require careful storage. We recommend storing in breathable garment bags away from direct sunlight, humidity, and chemical exposure; avoiding prolonged compression or folding of heavily embellished garments; and keeping garments away from perfume, hairspray, and chemical solvents, which may damage embellishments, dyes, and delicate fabrics.</p>

              <h3>5. Bridal and Event Urgency</h3>
              <p>5.1 Where a Product is intended for a specific event or occasion, the User assumes full responsibility for placing the Order sufficiently in advance to allow for production and delivery. BORA HONEY&apos;S does not guarantee delivery by a specific date unless expressly confirmed in writing. We shall not be liable for any loss, inconvenience, or disappointment arising from an Order placed too close to the event date.</p>

              <h3>6. Care Label and Textile Compliance</h3>
              <p>6.1 All Products comply with the Textile (Consumer Protection) Regulations, 1988 and applicable BIS guidelines. Care labels will be affixed to each garment and care instructions will be displayed on the Product page. Please follow care instructions strictly. We bear no liability for damage resulting from improper care.</p>

              <h3>7. No Warranty Beyond Applicable Law</h3>
              <p>7.1 To the extent permitted by law, all Products are sold on an as-is basis. We make no representations or warranties beyond those expressly stated in our Policies and as required by the Consumer Protection Act, 2019.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Website Disclaimer ── */}
          <section id="website-disclaimer">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">7</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Website Disclaimer</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. As-Is and As-Available Basis</h3>
              <p>1.1 The Website and all content, Services, and functionality provided through it are made available on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis, without any representation, warranty, or guarantee of any kind, whether express, implied, or statutory.</p>
              <p>1.2 We do not warrant or represent that: (a) the Website will be available, uninterrupted, timely, or error-free at all times; (b) any defects or errors in the Website will be corrected; (c) the Website or the servers on which it operates are free from viruses, malware, or other harmful components; (d) all content, Product descriptions, pricing, and availability information on the Website will be accurate or current at all times; or (e) the Website is compatible with all devices, browsers, or operating systems.</p>

              <h3>2. No Professional or Advisory Warranty</h3>
              <p>2.1 Any editorial content, styling guidance, fashion recommendations, size advice, fabric descriptions, or care information published on the Website is provided for general informational and illustrative purposes only. It does not constitute professional advice of any kind.</p>
              <p>2.2 Any sizing suggestions, fit recommendations, or styling guidance provided on the Website, whether through written descriptions, size guides, or any future AI-assisted tool, are indicative only and do not constitute a guarantee of fit or suitability for any individual User. The User remains solely responsible for their purchase decision.</p>
              <p>2.3 We are not liable for any decision made in reliance on editorial content, styling recommendations, or any other informational content published on the Website.</p>

              <h3>3. Third-Party Content</h3>
              <p>3.1 The Website may display or link to content generated by third parties, including reviews, social media posts, or press features. We do not endorse, verify, or assume responsibility for the accuracy or reliability of third-party content.</p>

              <h3>4. Availability Errors</h3>
              <p>4.1 Product availability displayed on the Website is updated on a reasonable-efforts basis but may not reflect real-time inventory. We are not liable for any inconvenience caused by availability errors, including Orders placed for Products that subsequently prove to be out of stock.</p>

              <h3>5. Technical Issues</h3>
              <p>5.1 We are not liable for any loss, damage, or inconvenience arising from: Website downtime, maintenance, or outage; errors in the checkout process caused by technical glitches; failed or duplicate transactions caused by connectivity or browser issues; or delays in Order Confirmation due to email delivery failures.</p>

              <h3>6. Viruses and Security</h3>
              <p>6.1 We take reasonable measures to keep the Website secure and free from malicious code. However, we cannot guarantee that the Website is completely virus-free or secure at all times. You are responsible for maintaining appropriate security software on your own device.</p>

              <h3>7. Limitation of Liability</h3>
              <p>7.1 To the maximum extent permissible under applicable law, BORA HONEY&apos;S shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your access to or inability to access the Website or your reliance on any content published thereon. Nothing herein limits any liability that cannot be excluded under the Consumer Protection Act, 2019 or other applicable law.</p>
            </div>

            <LegalFooter />
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}
