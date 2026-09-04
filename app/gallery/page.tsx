import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import FinalCTA from '@/components/FinalCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.company.name}`,
  description: `Before and after photos from GP Mobile Car Wash & Detail — mobile detailing serving Lincoln, NE and the surrounding area.`,
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      <section className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.04)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="badge-accent">Our Work</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-section text-white uppercase mb-6">
              Before &amp; After{' '}
              <span className="gradient-text-accent">Gallery</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Drag the sliders to see real results from jobs around Lincoln — more
              get added after every appointment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Gallery />
      <FinalCTA />
      <Footer />
    </main>
  )
}
