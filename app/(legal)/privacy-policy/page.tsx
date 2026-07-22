import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy & Cookies | BORA HONEY\'S',
  description: 'Privacy Policy and Cookie Policy for BORA HONEY\'S — how we collect, store, and protect your personal data.',
}

const sections = [
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'cookie-policy', label: 'Cookie Policy' },
]

const LegalFooter = () => (
  <div className="mt-10 pt-6 border-t border-primary/20 text-xs text-white/40 leading-relaxed space-y-1">
    <p><span className="text-white/60">Legal Name:</span> SUPERLATIVE GROUP &nbsp;|&nbsp; <span className="text-white/60">Trade Name:</span> BORA HONEY&apos;S</p>
    <p><span className="text-white/60">Registered Address:</span> Coming Soon</p>
    <p><span className="text-white/60">GSTIN:</span> 06AIOPN2893G1ZU &nbsp;|&nbsp; <span className="text-white/60">Website:</span> www.borahoneys.in</p>
    <p>
      <span className="text-white/60">Email:</span> orders@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Grievance:</span> info@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Legal Notices:</span> info@borahoneys.in &nbsp;|&nbsp;
      <span className="text-white/60"> Phone:</span> +91 9138881112
    </p>
  </div>
)

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Legal</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          Privacy &amp; Cookies
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          This page consolidates the Privacy Policy and Cookie Policy of BORA HONEY&apos;S, describing
          how we collect, store, process, use, disclose, and protect personal information, and how
          cookies are used on our Website. Last Updated: 18 June 2026.
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

          {/* ── Privacy Policy ── */}
          <section id="privacy-policy">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">1</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Privacy Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <p>
                This Privacy Policy describes how we collect, store, process, use, disclose, and protect
                personal information provided by Users. This Policy complies with the Information Technology
                Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data
                or Information) Rules, 2011 (&ldquo;SPDI Rules&rdquo;), the Consumer Protection (E-Commerce) Rules,
                2020, and the principles of the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) to
                the extent applicable.
              </p>

              <h3>1. Information We Collect</h3>
              <p><strong className="text-white/90 font-normal">1.1 Information Provided by You</strong></p>
              <ul>
                <li><strong className="text-white/80 font-normal">Identity data:</strong> full name, date of birth, gender.</li>
                <li><strong className="text-white/80 font-normal">Contact data:</strong> address, city, state, PIN code, phone number, email address.</li>
                <li><strong className="text-white/80 font-normal">Transaction data:</strong> Order history, Products purchased, payment method type, delivery preferences, and Order-related correspondence.</li>
                <li><strong className="text-white/80 font-normal">Account data:</strong> username and encrypted password.</li>
                <li><strong className="text-white/80 font-normal">Communications:</strong> queries, complaints, feedback, and reviews submitted to us.</li>
                <li><strong className="text-white/80 font-normal">Measurement data:</strong> body measurements provided in connection with made-to-order garments.</li>
                <li><strong className="text-white/80 font-normal">Media and editorial content:</strong> photographs, testimonials, or styling images shared with us or tagged on social media.</li>
              </ul>
              <p><strong className="text-white/90 font-normal">1.2 Information Collected Automatically</strong></p>
              <ul>
                <li><strong className="text-white/80 font-normal">Technical data:</strong> IP address, browser type, operating system, device identifiers, and time zone.</li>
                <li><strong className="text-white/80 font-normal">Usage data:</strong> pages visited, Products viewed, time on page, and referral URLs.</li>
                <li><strong className="text-white/80 font-normal">Cookie data:</strong> collected through cookies and similar technologies. See our Cookie Policy below.</li>
              </ul>
              <p><strong className="text-white/90 font-normal">1.3 Information from Third Parties</strong></p>
              <ul>
                <li>Payment verification data from payment gateway providers.</li>
                <li>Delivery data from courier and logistics partners.</li>
              </ul>

              <h3>2. Purpose and Legal Basis of Processing</h3>
              <p>2.1 We process personal information: (a) to perform our contractual obligations to you, including processing Orders, arranging delivery, and issuing invoices; (b) to comply with legal and regulatory obligations; (c) for our legitimate interests in fraud prevention, security, and business improvement; and (d) where required, with your consent.</p>
              <p>2.2 We will not use personal information for any purpose inconsistent with those disclosed here without your prior consent.</p>

              <h3>3. Disclosure of Information</h3>
              <p>3.1 We do not sell, license, or rent your personal information to any third party for independent commercial purposes.</p>
              <p>3.2 We may share personal information with: payment gateway providers (for payment processing); courier and logistics partners (for Order delivery); technology service providers maintaining the Website (subject to confidentiality agreements); professional advisors; and regulatory or law enforcement authorities where required by law.</p>
              <p>3.3 All third parties receiving personal information are contractually required to maintain confidentiality and to use such data solely for the disclosed purpose.</p>

              <h3>4. Data Retention</h3>
              <p>4.1 Personal information is retained for as long as necessary to fulfil the purposes for which it was collected, and in any event for a minimum of seven years from the date of the relevant transaction, as required under applicable Indian tax and financial laws, unless a longer retention period is required by applicable law.</p>
              <p>4.2 You may request deletion of your account and personal information by writing to info@borahoneys.in. Requests will be processed within 30 days, subject to any legal retention obligations.</p>

              <h3>5. Your Rights</h3>
              <p>5.1 Subject to applicable law, you have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion subject to legal retention requirements; and withdraw consent at any time, without affecting prior lawful processing. Requests should be submitted to info@borahoneys.in.</p>

              <h3>6. Data Security</h3>
              <p>6.1 We implement commercially reasonable technical and organisational security measures, including SSL/TLS encryption, access controls, and password hashing. To the maximum extent permissible under applicable law, no electronic transmission or storage is completely secure and we do not guarantee absolute security. We will notify affected Users and relevant authorities in the event of a reportable data breach.</p>

              <h3>7. Children&apos;s Privacy</h3>
              <p>7.1 We do not knowingly collect personal information from persons under 18. If we become aware of such collection without appropriate parental consent, we will delete the information promptly.</p>

              <h3>8. DPDP Act: Future Compliance and Data Principal Rights</h3>
              <p>8.1 The Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) has received Presidential assent. Its operative provisions and rules are expected to come into force in a phased manner. Once applicable, BORA HONEY&apos;S will implement the following mechanisms as required:</p>
              <ul>
                <li>A Consent Manager or equivalent mechanism enabling Data Principals to give, manage, review, and withdraw consent to data processing.</li>
                <li>A formal Data Principal rights framework covering the right to access, correct, and erase personal data.</li>
                <li>A nomination mechanism enabling Data Principals to nominate another individual to exercise rights in the event of death or incapacity.</li>
                <li>Cross-border data transfer compliance in accordance with the restrictions and conditions notified under the DPDP Act.</li>
                <li>A dedicated DPDP Notice setting out the basis and purpose of each category of data processing once the applicable rules are notified.</li>
              </ul>
              <p>8.2 In the interim, we process personal data in accordance with the IT Act, 2000 and the SPDI Rules, 2011. Users who wish to access, correct, or request deletion of their personal data may contact us at info@borahoneys.in and we will respond within 30 days.</p>
              <p>8.3 We will update this Privacy Policy as and when material changes are required to reflect compliance with the DPDP Act rules upon their notification.</p>

              <h3>9. Modifications and Contact</h3>
              <p>9.1 We reserve the right to amend this Policy. Continued use of the Website following any amendment constitutes acceptance. Grievances: Honey Nanda, Grievance Officer, info@borahoneys.in. Governing law: India. Jurisdiction: New Delhi.</p>
            </div>

            <LegalFooter />
          </section>

          {/* ── Cookie Policy ── */}
          <section id="cookie-policy">
            <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">2</p>
            <h2 className="text-xl font-light tracking-widest uppercase text-foreground mb-1">Cookie Policy</h2>
            <p className="text-xs text-white/40 mb-8">Last Updated: 18 June 2026 &nbsp;·&nbsp; Effective Date: 18 June 2026</p>

            <div className="prose-legal">
              <h3>1. What Are Cookies</h3>
              <p>1.1 Cookies are small text files placed on your device when you visit the Website. They enable core Website functionality, enhance User experience, and provide analytical data. Cookies may be session-based or persistent.</p>

              <h3>2. Types of Cookies</h3>

              <div className="mt-6 space-y-6">
                <div className="p-5 border border-primary/20 bg-card">
                  <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">Strictly Necessary Cookies</p>
                  <p className="text-sm font-light text-white/70 leading-relaxed">Required for the Website to function, including secure login, shopping cart, checkout, and fraud prevention. Consent is not required for these cookies.</p>
                </div>
                <div className="p-5 border border-primary/20 bg-card">
                  <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">Analytics and Performance Cookies</p>
                  <p className="text-sm font-light text-white/70 leading-relaxed">Collect aggregate, anonymised information about Website usage to improve our services. Your consent will be sought before these are placed.</p>
                </div>
                <div className="p-5 border border-primary/20 bg-card">
                  <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">Functionality Cookies</p>
                  <p className="text-sm font-light text-white/70 leading-relaxed">Remember your preferences to enhance your browsing experience. Not essential but improve usability.</p>
                </div>
                <div className="p-5 border border-primary/20 bg-card">
                  <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">Third-Party Cookies</p>
                  <p className="text-sm font-light text-white/70 leading-relaxed">Third-party services embedded in the Website, including payment gateways and analytics providers, may set their own cookies governed by their respective policies.</p>
                </div>
              </div>

              <h3>3. Managing Cookies</h3>
              <p>3.1 You may manage cookie preferences through your browser settings. Disabling certain cookies may affect Website functionality, including your ability to complete a purchase. A cookie consent banner will be presented on your first visit to the Website.</p>
            </div>

            <LegalFooter />
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}
