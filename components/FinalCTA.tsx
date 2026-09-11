'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#0f0f0f' }}>
      <div className="absolute inset-0 diagonal-texture opacity-60" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.06)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 opacity-50"
        style={{ background: 'linear-gradient(to bottom, transparent, #FF6A00, transparent)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <ScrollReveal>
          <span className="badge-accent">Ready to Book?</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-bold text-section text-white uppercase mb-6">
            Your Detail Is{' '}
            <span className="gradient-text-accent">One Call Away.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-12">
            Build your price online or call us directly — either way, we&apos;ll come
            straight to you with everything we need to get the job done.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">

            <motion.a href={siteConfig.company.phoneHref}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl text-white shadow-glow-orange"
              style={{ background: 'linear-gradient(135deg, #FF6A00, #CC5500)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <Phone className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-0.5">Call or Text</div>
                <div className="font-bold text-base text-black">{siteConfig.company.phone}</div>
              </div>
              <span className="text-xs font-medium text-black/60">Fastest response</span>
            </motion.a>

            <motion.a href={`mailto:${siteConfig.company.email}`}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/4 border border-white/10 text-white hover:bg-white/7 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,106,0,0.12)' }}>
                <Mail className="w-6 h-6" style={{ color: '#FF6A00' }} strokeWidth={2} />
              </div>
              <div>
                <div className="font-bold text-base">Send Email</div>
                <div className="text-slate-400 text-sm">Quotes &amp; questions</div>
              </div>
              <span className="text-xs text-slate-500 font-medium">gpmobilecarwash@gmail.com</span>
            </motion.a>

            <Link href="/quote"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/4 border border-white/10 text-white hover:bg-white/7 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,106,0,0.12)' }}>
                <Calendar className="w-6 h-6" style={{ color: '#FF6A00' }} strokeWidth={2} />
              </div>
              <div>
                <div className="font-bold text-base">Book Online</div>
                <div className="text-slate-400 text-sm">Use our quote tool</div>
              </div>
              <span className="text-xs text-slate-500 font-medium">Takes 2 minutes</span>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
            {['✓ Instant online pricing', '✓ Drop off or we come to you', '✓ 35-mile service area', '✓ Flexible scheduling'].map(item => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
