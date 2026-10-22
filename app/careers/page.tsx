import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CareersForm from '@/components/CareersForm'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'
import { Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: `Careers | ${siteConfig.company.name}`,
  description: `Join the team at GP Mobile Car Wash & Detail in Lincoln, NE. Fill out our employment application online and submit it in minutes.`,
}

export default function CareersPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      <section className="relative pt-52 pb-24 overflow-hidden">
        <div className="absolute inset-0 diagonal-texture opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.05)' }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="badge-accent">Careers</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display font-bold text-section text-white uppercase mb-5">
                Join the{' '}
                <span className="gradient-text-accent">GP Mobile Team</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Fill out the employment application below and submit it right here. No printing needed.
                It goes straight to our inbox and we&apos;ll be in touch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-sm">
                <a href={siteConfig.company.phoneHref} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                  {siteConfig.company.phone}
                </a>
                <a href={`mailto:${siteConfig.company.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors break-all">
                  <Mail className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                  {siteConfig.company.email}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <CareersForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
