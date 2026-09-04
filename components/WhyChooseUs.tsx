'use client'

import { motion } from 'framer-motion'
import { Truck, MapPin, Clock, Droplets, type LucideIcon } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

const iconMap: Record<string, LucideIcon> = {
  Truck, MapPin, Clock, Droplets,
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0f0f0f' }}>
      <div className="absolute inset-0 diagonal-texture opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.03)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="badge-accent">Why GP Mobile</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-bold text-section text-white uppercase mb-5">
              Detailing That{' '}
              <span className="gradient-text-accent">Comes to You.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No drop-off, no waiting room, no second trip. We show up with everything
              we need and leave your vehicle looking sharp.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Truck
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="card-shine p-6 rounded-2xl border border-white/6 bg-card-gradient hover:shadow-card-hover transition-all group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all"
                  style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#FF6A00' }} strokeWidth={1.8} />
                </div>
                <div className="w-6 h-0.5 rounded-full mb-3 group-hover:w-10 transition-all duration-300"
                  style={{ background: '#FF6A00' }} />
                <h3 className="font-display font-bold text-base text-white mb-2 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
