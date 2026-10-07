'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { siteConfig, type VehicleSize } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

type Package = (typeof siteConfig.packages)[number]

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [size, setSize] = useState<VehicleSize>('small')
  const sizeLabel = siteConfig.vehicleSizes.find(s => s.id === size)!.label

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="relative"
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10"
          style={{ background: '#FF6A00', color: '#000' }}>
          Most Popular
        </div>
      )}
      <div className="card-shine flex flex-col h-full p-6 rounded-2xl border border-white/6 bg-card-gradient hover:border-white/12 hover:shadow-card-hover transition-all">
        <h3 className="font-display font-bold text-lg text-white mb-2 uppercase tracking-wide">
          {pkg.name}
        </h3>
        <div className="w-6 h-0.5 rounded-full mb-4" style={{ background: '#FF6A00' }} />
        <ul className="space-y-1.5 mb-5 flex-1">
          {pkg.includes.slice(0, 4).map(item => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
              <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#FF6A00' }} />
              {item}
            </li>
          ))}
        </ul>
        <div className="pt-3 border-t border-white/5">
          <label htmlFor={`size-${pkg.id}`} className="sr-only">Vehicle size for {pkg.name}</label>
          <div className="relative mb-3">
            <select
              id={`size-${pkg.id}`}
              value={size}
              onChange={e => setSize(e.target.value as VehicleSize)}
              className="w-full appearance-none pl-3 pr-9 py-2 rounded-lg border text-sm font-semibold text-white outline-none cursor-pointer transition-all focus:border-[#FF6A00]/50"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {siteConfig.vehicleSizes.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#141414', color: '#fff' }}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>
          <div className="text-xs text-slate-500 mb-1">
            {size === 'small' ? 'Starting at' : `${sizeLabel} price`}
          </div>
          <div className="font-display font-bold text-2xl text-white mb-4">${pkg.prices[size]}</div>
          <Link href={`/quote?pkg=${pkg.id}&size=${size}`} className="btn-orange w-full py-2.5 text-sm">
            Book This Package
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServiceOverview() {
  return (
    <section id="overview" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 diagonal-texture opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.04)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="badge-accent">What We Do</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-bold text-section text-white uppercase mb-5">
              Five Packages.{' '}
              <span className="gradient-text-accent">One Mobile Team.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From a quick exterior wash to a full ceramic coating — priced by vehicle
              size, and ready wherever you park.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {siteConfig.packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2} className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-orange px-8 py-4 text-base inline-flex">
            Build My Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services" className="btn-outline px-8 py-4 text-base inline-flex">
            See Full Pricing
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
