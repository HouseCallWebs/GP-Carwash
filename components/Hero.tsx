'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, ChevronDown, MapPin, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

const headlineWords = [
  { text: 'We',    accent: false },
  { text: 'Come',  accent: false },
  { text: 'to',    accent: false },
  { text: 'You!',  accent: true  },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY            = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '9%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden hero-bg">

      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.08)' }} />
      </motion.div>

      {/* Orange left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50"
        style={{ background: 'linear-gradient(to bottom, transparent, #FF6A00, transparent)' }} />

      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 w-full">

        <div className="max-w-4xl">

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ borderColor: 'rgba(255,106,0,0.3)', background: 'rgba(255,106,0,0.07)' }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: '#FF8A3D' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF8A3D' }}>
                Lincoln, NE · 35-Mile Service Area
              </span>
            </div>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3" style={{ color: '#FF6A00', fill: '#FF6A00' }} />
                ))}
              </div>
              <span className="text-xs font-bold text-white">{siteConfig.reviews.rating}</span>
              <span className="text-xs text-slate-400">· {siteConfig.reviews.count} Google Reviews</span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold text-hero text-white uppercase mb-4 leading-none">
            <span className="block text-white/90">Mobile Car Wash &amp; Detail.</span>
            {headlineWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`inline-block mr-[0.2em] ${w.accent ? 'gradient-text-accent' : 'text-white'}`}
              >
                {w.text}
              </motion.span>
            ))}
          </h1>

          {/* Orange rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.55, ease: [0.77, 0, 0.18, 1] }}
            style={{ originX: 0, background: 'linear-gradient(to right, #FF6A00, transparent)' }}
            className="w-20 h-1 mb-6 rounded-full"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-hero-sub text-slate-300 max-w-2xl mb-10"
          >
            Full-service mobile detailing that comes straight to your driveway, office
            parking lot, or job site. Wash, detail, buffing, and ceramic coating —
            booked in minutes, done without you lifting a finger.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-10"
          >
            <Link href="/quote" className="btn-orange px-7 py-4 text-base gap-3 animate-pulse-orange">
              Get an Instant Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={siteConfig.company.phoneHref} className="btn-outline px-7 py-4 text-base">
              <Phone className="w-4 h-4" strokeWidth={2} />
              Call {siteConfig.company.phone}
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95 }}
            className="flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
              We come to you — no drop-off required
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
              Mon – Fri, Saturdays by appointment
            </span>
          </motion.div>
        </div>

        {/* Floating quote card */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-72"
        >
          <div className="rounded-2xl border border-white/8 bg-dark-800/90 backdrop-blur-sm p-6 shadow-card">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FF8A3D' }}>
              Popular Packages
            </div>
            <div className="space-y-2 mb-5">
              {siteConfig.packages.slice(0, 3).map(p => (
                <div key={p.id}
                  className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <span className="text-sm font-medium text-white">{p.name}</span>
                  <span className="text-xs font-bold" style={{ color: '#FF8A3D' }}>from ${p.prices.small}</span>
                </div>
              ))}
            </div>
            <Link href="/quote" className="btn-orange w-full py-3 text-sm">
              Build My Quote
            </Link>
            <div className="text-center text-xs text-slate-500 mt-3">
              Price updates live as you choose
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#overview"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
      </motion.a>
    </section>
  )
}
