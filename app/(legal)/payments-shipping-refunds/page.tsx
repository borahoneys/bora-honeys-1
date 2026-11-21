import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payments, Shipping & Refunds | BORA HONEY\'S',
  description: 'Payment, Shipping, Cancellation, Refund, Return & Exchange, Fraud Prevention, and GST policies for BORA HONEY\'S.',
}

const sections = [
  { id: 'payment-pricing', label: 'Payment & Pricing' },
  { id: 'shipping-delivery', label: 'Shipping & Delivery' },
  { id: 'cancellation', label: 'Cancellation Policy' },
  { id: 'refund', label: 'Refund Policy' },
  { id: 'return-exchange', label: 'Return & Exchange' },
  { id: 'fraud-prevention', label: 'Fraud Prevention' },
  { id: 'gst-tax', label: 'GST & Tax Disclosure' },
]

const LegalFooter = () => (
  <div className="mt-10 pt-6 border-t border-primary/20 text-xs text-white/40 leading-relaxed space-y-1">
    <p><span className="text-white/60">Legal Name:</span> SUPERLATIVE GROUP &nbsp;|&nbsp; <span className="text-white/60">Trade Name:</span> BORA HONEY&apos;S</p>
    <p><span className="text-white/60">Registered Address:</span> Second Floor, Ramnath House, 4, Sri Aurobindo Marg, Qila Rai Pithora, New Delhi, Delhi 110030</p>
    <p><span className="text-white/60">GSTIN:</span> 06AIOPN2893G1ZU &nbsp;|&nbsp; <span className="text-white/60">Website:</span> www.borahoneys.in</p>
    <p>
      <span className="text-white/60">Email:</span> orders@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Grievance:</span> info@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Legal Notices:</span> info@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Phone:</span> +91 9138881112
    </p>
  </div>
)

export default function PaymentsShippingRefundsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Legal</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          Payments, Shipping &amp; Refunds
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          This page consolidates all policies governing the financial and logistical lifecycle of an Order —
          from payment through shipping, delivery, cancellation, refunds, and returns. Last Updated: 18 June 2026.
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

          {/* ── Payment & Pricing ── */}
          <section id="payment-pricing">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">1</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Payment and Pricing Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Payment Obligations</h3>
              <p>1.1 Full payment is required at the time of placing an Order. No Order will be confirmed without receipt of full payment. All prices are in INR, inclusive of all applicable taxes.</p>
              <p>1.2 Accepted payment modes are displayed at checkout and may include credit cards, debit cards, net banking, and UPI. We reserve the right to add or remove payment modes without notice.</p>

              <h3>2. Payment Security</h3>
              <p>2.1 All payment transactions are processed through PCI-DSS compliant third-party payment gateways. We do not receive, store, or transmit full card numbers, CVV codes, or net banking credentials.</p>
              <p>2.2 You warrant that any payment instrument used belongs to you or that you are lawfully authorised to use it. Use of a third party&apos;s payment instrument without their authorisation constitutes fraud.</p>

              <h3>3. High-Value Verification</h3>
              <p>3.1 For Orders exceeding INR 1,00,000, we may require OTP verification, government-issued identity documentation, verification calls, and address cross-referencing. Failure to complete verification within 48 hours may result in Order cancellation and refund.</p>

              <h3>4. Failed and Declined Transactions</h3>
              <p>4.1 We are not liable for payment failures arising from your bank, card issuer, or payment gateway. If payment is debited but no Order Confirmation is received within 24 hours, please contact orders@borahoneys.in immediately.</p>

              <h3>5. Chargebacks and Payment Reversals</h3>
              <p>5.1 You agree not to initiate a chargeback or payment reversal for any legitimate transaction unless you have first raised the matter with us and we have failed to respond within a reasonable period.</p>
              <p>5.2 Raising a chargeback or payment reversal in respect of a legitimately completed transaction, where the Product has been delivered as described, is inconsistent with the terms of purchase. BORA HONEY&apos;S maintains comprehensive records of all transactions, delivery confirmations, and communications and reserves all legal rights and remedies available under applicable law in such circumstances.</p>

              <h3>6. Pricing Errors</h3>
              <p>6.1 We reserve the right to correct pricing errors at any time. We are not obligated to honour Orders placed at manifestly erroneous prices and may cancel such Orders with a full refund.</p>

              <h3>7. GST</h3>
              <p>7.1 All prices are inclusive of GST. The applicable GST rate, GSTIN, and HSN Code are as set out in the GST and Tax Disclosure section below. For international shipments, export of goods may be treated as zero-rated supply under GST; all customs duties and destination-country taxes remain the User&apos;s sole responsibility.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Shipping & Delivery ── */}
          <section id="shipping-delivery">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">2</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Shipping and Delivery Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Domestic Shipping</h3>
              <p>1.1 We currently ship all Products within India. Estimated dispatch timelines are communicated in the Order Confirmation and are indicative only. Timelines may vary based on the nature of the Product, delivery location, and logistical conditions.</p>
              <p>1.2 For handcrafted or made-to-order Products, additional production time is required before dispatch. The estimated production and dispatch timeline will be specified in the Order Confirmation.</p>
              <p>1.3 Estimated dispatch and delivery timelines are indicative only and should not be treated as guaranteed delivery commitments unless expressly confirmed in writing by BORA HONEY&apos;S. Users are strongly advised not to schedule fittings, travel, photography sessions, bridal ceremonies, or any time-sensitive event in immediate proximity to the estimated delivery date. BORA HONEY&apos;S shall not be liable for any consequential loss, including event disruption, arising from reliance on estimated delivery timelines.</p>
              <p>1.4 If a firm delivery deadline is required, it must be communicated to us in writing at the time of Order placement, and we must expressly confirm in writing that such deadline can be accommodated. Verbal or informal commitments regarding delivery dates will not be binding.</p>
              <p>1.5 Shipping charges, if applicable, will be disclosed at checkout before payment is completed.</p>

              <h3>2. High-Value Delivery Protocols</h3>
              <p>2.1 As all Products are priced in excess of INR 1,00,000, the following protocols apply:</p>
              <ul>
                <li>All Orders will be dispatched via insured, tracked courier services.</li>
                <li>Delivery will require OTP-based confirmation or a physical signature from the recipient. Delivery will not be completed without such confirmation.</li>
                <li>Re-routing or address changes after dispatch are not permitted.</li>
                <li>The User must record a complete, unedited unboxing video at the time of delivery, documenting the condition of the outer packaging and the Product as it is opened. Recording an unboxing video is strongly recommended and will be required to substantiate any claim relating to transit damage or incorrect Product delivery. Claims submitted without contemporaneous unboxing video evidence may not be considered.</li>
              </ul>
              <p>2.2 We advise Users not to accept delivery of any parcel that appears visibly damaged, tampered with, or improperly sealed. In such cases, the User should refuse delivery and contact us immediately at orders@borahoneys.in.</p>

              <h3>3. Risk Transfer</h3>
              <p>3.1 Risk of loss, damage, or destruction transfers from BORA HONEY&apos;S to the User upon physical delivery of the Product and execution of the OTP confirmation or signed delivery acknowledgement. Following such confirmation, BORA HONEY&apos;S bears no liability for loss, theft, or damage to the Product.</p>

              <h3>4. Courier Liability and Insurance</h3>
              <p>4.1 We take reasonable precautions in selecting and engaging reputable, insured courier partners. All high-value shipments are dispatched with transit insurance coverage.</p>
              <p>4.2 In the event of loss or damage in transit before delivery, BORA HONEY&apos;S will reasonably assist the User in initiating an insurance claim with the courier. Any compensation payable to the User will reflect the amount recoverable under the courier&apos;s insurance, subject to applicable policy caps and applicable law. We will not charge the User for our reasonable assistance in this process.</p>
              <p>4.3 We shall not be liable for delays caused by the courier following dispatch, provided we have fulfilled our own dispatch obligations.</p>

              <h3>5. Failed and Refused Delivery</h3>
              <p>5.1 If delivery is unsuccessful due to the User&apos;s absence or an incorrect address, the courier will attempt re-delivery or hold the parcel for a limited period. Re-delivery charges for failed deliveries caused by the User&apos;s absence or incorrect address will be borne by the User.</p>
              <p>5.2 If a parcel is returned to us as undeliverable, we will contact you to arrange re-dispatch subject to payment of re-delivery charges. We are not liable for any condition of the Product during return transit caused by courier handling.</p>

              <h3>6. International Shipping</h3>
              <p>6.1 International shipping is not currently offered as a standard service. International Orders may be considered on a case-by-case basis. Where accepted, applicable terms including shipping charges, customs duties, estimated timelines, and insurance will be confirmed in writing before Order confirmation.</p>
              <p>6.2 All customs duties, import taxes, and other levies in the destination country are the sole responsibility of the User. BORA HONEY&apos;S is not liable for delays, seizures, or additional costs arising from customs procedures in any jurisdiction.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Cancellation ── */}
          <section id="cancellation">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">3</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Cancellation Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                Due to the made-to-order, handcrafted, and luxury nature of our Products, BORA HONEY&apos;S follows
                a highly restrictive cancellation framework. Please review your Order carefully before completing payment.
              </p>

              <h3>1. General Position</h3>
              <p>1.1 Given that production processes are typically initiated within a short period of Order confirmation, cancellations cannot be accommodated in most circumstances. By completing payment, you acknowledge the binding nature of the Order and your agreement to this Policy.</p>

              <h3>2. User-Initiated Cancellation</h3>
              <p>2.1 A cancellation request may only be considered if all of the following conditions are satisfied:</p>
              <ul>
                <li>The request is submitted in writing to orders@borahoneys.in within 2 (two) hours of placing the Order.</li>
                <li>The Order is for a finished, in-stock Product (not a made-to-order, custom, or bespoke piece).</li>
                <li>Production, packaging, or dispatch preparation has not yet commenced at the time the request is received.</li>
              </ul>
              <p>2.2 Whether the above conditions are satisfied is assessed by us in good faith, having regard to the production status of the Order at the time of receipt of the request. Acceptance remains at our discretion, subject always to applicable consumer protection law, including the Consumer Protection Act, 2019.</p>
              <p>2.3 If a cancellation request is accepted, a cancellation fee of 25% of the Order value will be deducted to cover transaction and handling costs. The balance will be refunded to the original payment mode within 14 business days.</p>
              <p>2.4 Cancellation requests for made-to-order, custom, or bespoke pieces are not accepted once Order Confirmation has been issued, as materials and artisanal resources are committed at that stage.</p>

              <h3>3. Cancellation of Made-to-Order and Bespoke Orders</h3>
              <p>3.1 Orders for made-to-order garments, bespoke couture pieces, bridal orders, and customised Products are non-cancellable from the moment of Order Confirmation. Materials are sourced and artisanal work is commissioned immediately upon confirmation. Each piece is created exclusively for the User and cannot be resold.</p>

              <h3>4. Pre-Order Cancellations</h3>
              <p>4.1 Orders placed for Pre-Order Products are subject to the Pre-Order Policy published on the Website at the time of purchase, which governs cancellation rights in respect of such Orders.</p>

              <h3>5. Cancellation by BORA HONEY&apos;S</h3>
              <p>5.1 We may cancel any Order in circumstances including: pricing errors; Product unavailability; suspected fraud; failed identity verification; infeasibility of delivery to the specified address; or User breach of these Terms. We will notify the User promptly and process a full refund within 14 business days.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Refund Policy ── */}
          <section id="refund">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">4</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Refund Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                Due to the made-to-order, handcrafted, and luxury nature of our Products, BORA HONEY&apos;S follows
                a highly restrictive refund framework. All statutory rights available to consumers under applicable
                law, including under the Consumer Protection Act, 2019, are preserved.
              </p>

              <h3>1. General Position</h3>
              <p>1.1 The significant artisanal, material, and operational investment in each piece means that all sales are final in the ordinary course. By completing a purchase, you confirm that you have reviewed the Product description, photographs, size guide, and Product Disclaimer and that you accept this Policy.</p>
              <p>1.2 Refunds are not available for: change of mind; subjective dissatisfaction with styling, drape, or aesthetics; colour variation between on-screen depiction and physical Product; minor handcrafted or artisanal variations covered by our Product Disclaimer; incorrect size selected by the User; delivery delays outside our control; event cancellation or change in personal circumstances; or Products purchased during a promotional sale or with a discount code.</p>

              <h3>2. Limited Exceptions</h3>
              <p>2.1 A refund may be considered solely in the following circumstances:</p>
              <ul>
                <li>A materially incorrect Product was dispatched, meaning a Product wholly different from that described in the Order Confirmation was delivered.</li>
                <li>The Product was delivered with structural transit damage directly attributable to the courier.</li>
              </ul>
              <p>2.2 Claims under Clause 2.1 are subject to all of the following mandatory conditions:</p>
              <ul>
                <li>Written notification to orders@borahoneys.in within 24 hours of delivery.</li>
                <li>Where available, a clear and unedited unboxing video showing the outer packaging and the Product as it is opened. Such evidence may materially assist the investigation. Where this is not available, claims will be reviewed on the basis of all other supporting evidence submitted, including photographs, courier documentation, and written correspondence.</li>
                <li>The Product must be unused, unworn, unaltered, and in original condition with all tags, packaging, and accessories intact.</li>
              </ul>
              <p>2.3 We will review and communicate our determination within 7 business days of receiving the claim. Our determination shall be final and binding, subject to any rights the User may have under the Consumer Protection Act, 2019.</p>

              <h3>3. Refund Process</h3>
              <p>3.1 Approved refunds will be processed to the original payment mode within 14 business days of written confirmation of approval. Credit to your account may take a further 5 to 7 business days depending on your financial institution.</p>
              <p>3.2 Shipping charges are non-refundable unless the refund arises from an error on our part.</p>
              <p>3.3 Payment gateway transaction fees may be deducted from the refund amount where applicable.</p>

              <h3>4. Consumer Protection Act, 2019</h3>
              <p>4.1 Nothing in this Policy is intended to override or exclude any remedy to which a consumer is entitled under the Consumer Protection Act, 2019 in the event of a defective product or proven deficiency in service. If you believe you have such a right, please contact our Grievance Officer at info@borahoneys.in.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Return & Exchange ── */}
          <section id="return-exchange">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">5</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Return and Exchange Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                Due to the made-to-order, handcrafted, and luxury nature of our Products, BORA HONEY&apos;S follows
                a highly restrictive return and exchange framework. All statutory rights available to consumers
                under applicable law are preserved.
              </p>

              <h3>1. No Return Policy</h3>
              <p>1.1 Returns are not accepted for any reason, including change of mind, size dissatisfaction, colour variation, aesthetic preference, event cancellation, or delayed personal use. Each piece represents a significant artisanal and material investment and cannot be returned to stock or resold.</p>
              <p>1.2 By placing an Order, you expressly accept this condition, subject always to any non-waivable rights available under applicable consumer protection law, including the Consumer Protection Act, 2019.</p>

              <h3>2. No Exchange Policy</h3>
              <p>2.1 Exchanges are not offered for a different size, colour, Product, or value equivalent, subject always to applicable consumer protection law, including the Consumer Protection Act, 2019.</p>
              <p>2.2 We strongly encourage Users to review the Product description, size guide, and Disclaimer before placing an Order. Pre-Order sizing consultations are available at orders@borahoneys.in. Size selection errors by the User do not constitute grounds for any remedy.</p>
              <p>2.3 In exceptional circumstances, and at our discretion, we may agree to an exchange arrangement. Any such arrangement will be confirmed in writing and subject to separate agreed terms. No exchange right shall be inferred from any communication unless confirmed in writing by BORA HONEY&apos;S.</p>

              <h3>3. Defective or Incorrect Product</h3>
              <p>3.1 Where a Product is defective in a manner constituting a deficiency in service under the Consumer Protection Act, 2019, or where an incorrect Product has been delivered, the User may raise a claim under our Refund Policy above. Such claims are governed exclusively by the Refund Policy.</p>

              <h3>4. Consumer Rights</h3>
              <p>4.1 Nothing in this Policy restricts a consumer&apos;s statutory rights under the Consumer Protection Act, 2019. Users who believe their statutory rights have not been met may contact our Grievance Officer at info@borahoneys.in or approach the relevant Consumer Disputes Redressal Commission.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Fraud Prevention ── */}
          <section id="fraud-prevention">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">6</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Fraud Prevention and Verification Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Fraud Screening</h3>
              <p>1.1 BORA HONEY&apos;S screens all Orders for indicators of fraud, identity theft, unauthorised payment instrument use, and suspicious transactional patterns. This applies particularly to high-value Orders.</p>
              <p>1.2 Fraud screening may include: automated checks by our payment gateway; manual review; billing and delivery address verification; contact detail cross-referencing; and Order history review.</p>

              <h3>2. Identity Verification</h3>
              <p>2.1 We may request identity verification from any User in connection with any Order. Acceptable documents include Aadhaar card, PAN card, passport, or government-issued photo identity.</p>
              <p>2.2 Failure to provide documentation within 48 hours may result in Order cancellation and refund of payment received. Identity documents are processed in accordance with our Privacy Policy and are not retained beyond the verification period.</p>

              <h3>3. Right to Refuse and Blacklist</h3>
              <p>3.1 We reserve the right, acting reasonably and in good faith, to refuse to process any Order, cancel a confirmed Order, or decline to serve any User, subject always to applicable law, where: the User has a history of fraud or unjustified chargebacks; the Order is flagged as high-risk; the address is associated with fraud indicators; multiple high-value Orders are placed from the same device; the User has breached any Policy; or we have reasonable grounds to believe the Order is for commercial resale.</p>
              <p>3.2 Accounts associated with confirmed fraudulent activity may be suspended or permanently barred from the Website, subject to applicable law.</p>

              <h3>4. Chargeback Fraud</h3>
              <p>4.1 Initiating a chargeback for a legitimately delivered Product constitutes chargeback fraud. We maintain full documentary records of all transactions, communications, and delivery confirmations and reserve all rights and remedies available under applicable law in such circumstances.</p>

              <h3>5. Cooperation with Authorities</h3>
              <p>5.1 BORA HONEY&apos;S reserves the right to report instances of suspected fraud to relevant law enforcement and financial regulatory authorities and will cooperate with any resulting investigation as required by law.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── GST & Tax ── */}
          <section id="gst-tax">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">7</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">GST and Tax Disclosure</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. Registration Details</h3>
              <div className="mt-4 p-5 border border-primary/20 bg-card space-y-2 text-sm font-light text-white/70">
                <p><span className="text-white/50">Registered Business Name:</span> SUPERLATIVE GROUP</p>
                <p><span className="text-white/50">Registered Address:</span> Second Floor, Ramnath House, 4, Sri Aurobindo Marg, Qila Rai Pithora, New Delhi, Delhi 110030</p>
                <p><span className="text-white/50">GSTIN:</span> 06AIOPN2893G1ZU</p>
                <p><span className="text-white/50">HSN Code:</span> 6204 (Apparel and Textile Products)</p>
              </div>

              <h3>2. Applicable GST Rate</h3>
              <p>2.1 GST is levied at 12% on all Products, as all Products are priced above INR 1,000 per item. All Website prices are inclusive of GST. No additional tax is charged to the User at checkout for domestic Indian transactions.</p>
              <p>2.2 GST rates are subject to change by government notification. Prices will be updated accordingly and changes apply prospectively.</p>

              <h3>3. Invoicing</h3>
              <p>3.1 A GST-compliant tax invoice is issued for every Order and sent to the registered email at dispatch. Invoices include all mandatory particulars under the GST Invoice Rules.</p>
              <p>3.2 If you require a business invoice with your company GSTIN, provide your GSTIN and registered business name at checkout. Retrospective invoice amendments to add GSTIN details are not possible.</p>

              <h3>4. Supply Classification</h3>
              <p>4.1 Interstate supplies attract IGST. Intrastate supplies attract CGST and SGST, in each case at applicable rates under the GST Act, 2017.</p>

              <h3>5. International Transactions</h3>
              <p>5.1 Export of goods under GST may be treated as zero-rated supply. All customs duties, import taxes, and levies in the destination country are the User&apos;s sole responsibility.</p>
            </div>

            <LegalFooter />
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}
