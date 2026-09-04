'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 diagonal-texture opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.04)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="badge-accent">Before &amp; After</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-bold text-section text-white uppercase mb-5">
              The Proof Is in{' '}
              <span className="gradient-text-accent">the Shine.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Photos from real jobs will populate this gallery as they come in.
              Here&apos;s a preview of the layout.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/6 overflow-hidden bg-card-gradient hover:border-white/12 hover:shadow-card-hover transition-all"
            >
              {/* Before placeholder */}
              <div className="relative h-32 flex items-center justify-center border-b border-white/5"
                style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1.5">Before</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.before}</div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>
                  BEFORE
                </div>
              </div>

              {/* After placeholder */}
              <div className="relative h-32 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0e0e0e 0%, #141414 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#FF8A3D' }}>
                      After
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">{item.after}</div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{ background: 'rgba(255,106,0,0.12)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.2)' }}>
                  AFTER
                </div>
              </div>

              {/* Label */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{item.label}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,106,0,0.1)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.15)' }}>
                    {item.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="text-center mt-10">
          <p className="text-slate-500 text-sm italic">
            Photo gallery coming soon — check back after our next round of jobs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
