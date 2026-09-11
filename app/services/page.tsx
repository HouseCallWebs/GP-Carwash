import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/FinalCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Services & Pricing | ${siteConfig.company.name}`,
  description: `Full pricing for GP Mobile Car Wash & Detail — Basic, Premium, Extreme, Interior Only, and Buffing packages, plus add-ons. Drop off at our shop or request mobile service across Lincoln, NE and a 35-mile radius.`,
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      {/* Header */}
      <section className="relative pt-40 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.05)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="badge-accent">Services &amp; Pricing</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-section text-white uppercase mb-6">
              Every Package.{' '}
              <span className="gradient-text-accent">Every Price.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Pricing is set by vehicle size — Small (sedan/coupe), Medium (2-row SUV
              or crossover), and Large (van, 3-row SUV, or truck). Every price below
              applies whether you drop off at our shop or request mobile service —
              same price either way. Pick a package below or build your exact price
              on our{' '}
              <Link href="/quote" className="underline" style={{ color: '#FF8A3D' }}>quote tool</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {siteConfig.packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/6 bg-card-gradient overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-white/6">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide">
                        {pkg.name}
                      </h2>
                      {pkg.popular && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                          style={{ background: '#FF6A00', color: '#000' }}>
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-5 mt-2">{pkg.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {pkg.includes.map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6A00' }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Pricing by Size</div>
                    <div className="space-y-3">
                      {siteConfig.vehicleSizes.map(s => (
                        <div key={s.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-sm text-slate-400">{s.label}</span>
                          <span className="font-display font-bold text-xl text-white">${pkg.prices[s.id]}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/quote" className="btn-orange w-full py-3 text-sm mt-6">
                      Build This Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 border-y border-white/5" style={{ background: '#0f0f0f' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <ScrollReveal>
              <span className="badge-accent">Add-Ons</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl text-white uppercase">
                Stack on <span className="gradient-text-accent">Any Package</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {siteConfig.addons.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-white/6 bg-card-gradient h-full">
                  <div className="font-display font-bold text-lg text-white mb-1">{a.label}</div>
                  <p className="text-sm text-slate-400 mb-4">{a.description}</p>
                  <div className="font-display font-bold text-2xl" style={{ color: '#FF8A3D' }}>+${a.price}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote-only services */}
      <section className="py-16" style={{ background: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <ScrollReveal>
              <span className="badge-accent">Priced Individually</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl text-white uppercase">
                Custom <span className="gradient-text-accent">Quote Services</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-slate-400 mt-3 max-w-xl mx-auto">
                These jobs vary too much to price with a flat rate — request a free
                custom quote and we&apos;ll follow up with a number.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {siteConfig.quoteOnlyServices.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border h-full flex flex-col"
                  style={{ background: 'rgba(255,106,0,0.05)', borderColor: 'rgba(255,106,0,0.15)' }}>
                  <div className="font-display font-bold text-lg text-white mb-2">{s.name}</div>
                  <p className="text-sm text-slate-400 mb-5 flex-1">{s.description}</p>
                  <Link href="/quote" className="btn-outline w-full py-2.5 text-sm">
                    Request a Quote
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  )
}
