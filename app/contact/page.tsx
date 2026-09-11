import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: `Contact & Booking | ${siteConfig.company.name}`,
  description: `Reach GP Mobile Car Wash & Detail by phone, email, or the booking form. Drop off at our shop at ${siteConfig.company.address.full} or request mobile service anywhere in Greater Lincoln, Nebraska.`,
}

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.company.address.full)}&z=13&output=embed`

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 diagonal-texture opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.05)' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="badge-accent">Contact &amp; Booking</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display font-bold text-section text-white uppercase mb-5">
                Let&apos;s Get Your{' '}
                <span className="gradient-text-accent">Vehicle Booked</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Send us a message and we&apos;ll follow up to confirm your booking —
                or use our <a href="/quote" className="underline" style={{ color: '#FF8A3D' }}>quote tool</a> for
                instant pricing.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

            {/* Left — contact info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <div className="rounded-2xl border border-white/6 p-6 bg-card-gradient">
                  <h3 className="font-display font-bold text-white uppercase text-sm tracking-widest mb-5">
                    Contact Info
                  </h3>
                  <div className="space-y-5">
                    <a href={siteConfig.company.phoneHref}
                      className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                        <Phone className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Phone</div>
                        <div className="text-white font-semibold group-hover:text-[#FF8A3D] transition-colors">
                          {siteConfig.company.phone}
                        </div>
                      </div>
                    </a>
                    <a href={`mailto:${siteConfig.company.email}`}
                      className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                        <Mail className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Email</div>
                        <div className="text-white font-semibold group-hover:text-[#FF8A3D] transition-colors break-all">
                          {siteConfig.company.email}
                        </div>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                        <MapPin className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Shop Address</div>
                        <div className="text-slate-300 leading-relaxed">{siteConfig.company.address.full}</div>
                        <div className="text-slate-500 text-xs mt-1">
                          Drop off at our shop, or request mobile service — {siteConfig.company.serviceArea}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-white/6 p-6 bg-card-gradient">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                    <h3 className="font-display font-bold text-white uppercase text-sm tracking-widest">
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {siteConfig.hours.map(h => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-slate-400">{h.day}</span>
                        <span className="text-white font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,106,0,0.05)', border: '1px solid rgba(255,106,0,0.12)' }}>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Need us today?</span> Call
                    or text directly — we&apos;ll let you know about same-day availability.
                  </p>
                  <a href={siteConfig.company.phoneHref}
                    className="btn-orange w-full py-3 text-sm mt-4">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                    {siteConfig.company.phone}
                  </a>
                </div>
              </ScrollReveal>

              {/* Google Business Profile placeholder */}
              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-dashed border-white/15 p-6 flex items-center gap-4">
                  <Star className="w-6 h-6 flex-shrink-0 text-slate-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-400">Google Business Profile</div>
                    <div className="text-xs text-slate-600 mt-0.5">Reviews embed placeholder — to be added later</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1} direction="right">
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>

          {/* Map */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-white/6" style={{ minHeight: 340 }}>
              <iframe
                src={mapSrc}
                width="100%"
                height="340"
                style={{ border: 0, filter: 'grayscale(0.3) invert(0.92) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GP Mobile Car Wash & Detail service area map"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
