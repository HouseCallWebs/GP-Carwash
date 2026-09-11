import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QuoteFlow from '@/components/QuoteFlow'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `Get a Quote | ${siteConfig.company.name}`,
  description: `Build your instant detailing price by vehicle size and package — drop off at our shop or request mobile service — or request a custom quote for ceramic coating, fleet washing, or RV & boat detailing.`,
}

export default function QuotePage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 diagonal-texture opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.06)' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="badge-accent">Build Your Quote</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display font-bold text-section text-white uppercase mb-5">
                Get Your{' '}
                <span className="gradient-text-accent">Instant Price</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Pick your vehicle size and package to see live pricing, or jump to a
                custom quote for ceramic coating, fleet washing, or RV &amp; boat detailing.
              </p>
            </ScrollReveal>
          </div>

          <QuoteFlow />
        </div>
      </section>

      <Footer />
    </main>
  )
}
