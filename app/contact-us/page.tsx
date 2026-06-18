'use client'

import { useState } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/footer'

const COUNTRY_CODES = [
  { code: '+971', label: 'UAE', flag: '🇦🇪' },
  { code: '+91', label: 'IND', flag: '🇮🇳' },
  { code: '+1', label: 'USA', flag: '🇺🇸' },
  { code: '+44', label: 'UK', flag: '🇬🇧' },
  { code: '+966', label: 'KSA', flag: '🇸🇦' },
  { code: '+974', label: 'QAT', flag: '🇶🇦' },
  { code: '+965', label: 'KWT', flag: '🇰🇼' },
  { code: '+973', label: 'BHR', flag: '🇧🇭' },
]

const SERVICES = [
  'Bridal Couture',
  'Reception & Mehendi Wear',
  'Sangeet & Cocktail',
  'Evening & Occasion Wear',
  'Custom Couture',
  'General Enquiry',
]

const CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone Call', 'Video Consultation']

// TODO: Replace with actual FormsPress endpoint once credentials are provided
const FORMSPRESS_ENDPOINT = 'https://api.formspress.com/v1/YOUR_FORM_ID/submit'

export default function ContactUsPage() {
  const [subject, setSubject] = useState<'enquire' | 'appointment'>('enquire')
  const [countryCode, setCountryCode] = useState('+971')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      phone: `${countryCode}${data.get('phone')}`,
      subject,
      service: data.get('service'),
      contactMethod: data.get('contactMethod'),
      message: data.get('message'),
    }

    try {
      const res = await fetch(FORMSPRESS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
      setSubject('enquire')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center border-b border-primary/15">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Reach Out</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-foreground">
          Contact Us
        </h1>
        <p className="mt-5 text-sm text-white/50 font-light max-w-xl mx-auto leading-relaxed">
          Whether you are planning your bridal trousseau or simply wish to learn more, we would love to hear from you.
        </p>
      </div>

      {/* Form + Info grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-0 border border-primary/15">

          {/* Form */}
          <div className="p-10 md:p-14">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border border-primary/20 px-4 py-3.5 text-sm font-light text-foreground placeholder:text-white/25 focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Email ID
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent border border-primary/20 px-4 py-3.5 text-sm font-light text-foreground placeholder:text-white/25 focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Mobile Number
                </label>
                <div className="flex border border-primary/20 focus-within:border-primary/60 transition-colors">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-primary/5 border-r border-primary/20 px-3 py-3.5 text-sm font-light text-white/70 focus:outline-none appearance-none cursor-pointer pr-6"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-background">
                        {c.flag} {c.label} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter your number"
                    className="flex-1 bg-transparent px-4 py-3.5 text-sm font-light text-foreground placeholder:text-white/25 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Subject
                </label>
                <div className="flex gap-8">
                  {([
                    { value: 'enquire', label: 'Enquire' },
                    { value: 'appointment', label: 'Book an Appointment' },
                  ] as const).map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <span
                        onClick={() => setSubject(opt.value)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                          subject === opt.value
                            ? 'border-primary'
                            : 'border-white/30 group-hover:border-primary/50'
                        }`}
                      >
                        {subject === opt.value && (
                          <span className="w-2 h-2 rounded-full bg-primary block" />
                        )}
                      </span>
                      <span
                        onClick={() => setSubject(opt.value)}
                        className={`text-sm font-light transition-colors ${
                          subject === opt.value ? 'text-foreground' : 'text-white/50'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Service */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Select Service
                </label>
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border border-primary/20 px-4 py-3.5 text-sm font-light text-white/70 focus:outline-none focus:border-primary/60 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-background text-white/30">
                    Select Service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-background text-foreground">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border border-primary/20 px-4 py-3.5 text-sm font-light text-white/70 focus:outline-none focus:border-primary/60 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-background text-white/30">
                    Select a method
                  </option>
                  {CONTACT_METHODS.map((m) => (
                    <option key={m} value={m} className="bg-background text-foreground">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.35em] uppercase text-primary">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message"
                  className="w-full bg-transparent border border-primary/20 px-4 py-3.5 text-sm font-light text-foreground placeholder:text-white/25 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
              </div>

              {/* Status */}
              {status === 'success' && (
                <p className="text-primary text-xs tracking-[0.2em] uppercase">
                  Your message has been sent. We will be in touch shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs tracking-[0.2em] uppercase">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.4em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Submit'}
              </button>

            </form>
          </div>

          {/* Info Panel */}
          <div className="border-t border-primary/15 lg:border-t-0 lg:border-l lg:border-primary/15 p-10 md:p-14 flex flex-col justify-between gap-14">

            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary">Studio</p>
                <p className="text-sm font-light text-white/70 leading-relaxed">
                  Mumbai, India
                </p>
              </div>

              <div className="w-full border-t border-primary/15" />

              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary">Email</p>
                <a
                  href="mailto:studio@borahoneys.com"
                  className="text-sm font-light text-white/70 hover:text-primary transition-colors"
                >
                  studio@borahoneys.com
                </a>
              </div>

              <div className="w-full border-t border-primary/15" />

              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary">WhatsApp</p>
                <a
                  href="https://wa.me/971000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-white/70 hover:text-primary transition-colors"
                >
                  +971 00 000 0000
                </a>
              </div>

              <div className="w-full border-t border-primary/15" />

              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary">Hours</p>
                <p className="text-sm font-light text-white/70 leading-relaxed">
                  Monday – Saturday<br />
                  10:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>

            <p className="text-[11px] font-light text-white/30 leading-relaxed tracking-wide">
              Appointments are recommended for bridal consultations. We respond to all enquiries within 24 hours.
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
