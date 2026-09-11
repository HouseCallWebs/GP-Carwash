'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Phone, ArrowRight, Anchor, Caravan } from 'lucide-react'
import { siteConfig, getRvBoatTotal, type RvBoatCategory } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

const categories: { id: RvBoatCategory; label: string; icon: typeof Anchor }[] = [
  { id: 'boat', label: 'Boat Detailing', icon: Anchor },
  { id: 'rv',   label: 'RV Detailing',   icon: Caravan },
]

export default function RvBoatSection() {
  const [category, setCategory] = useState<RvBoatCategory>('boat')
  const [length, setLength]     = useState('')

  const lengthFeet = parseFloat(length) || 0
  const packages = siteConfig.rvBoatPackages[category]

  return (
    <section className="relative py-16" style={{ background: '#0f0f0f' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <ScrollReveal>
            <span className="badge-accent">Priced by the Foot</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-bold text-3xl text-white uppercase">
              RV &amp; Boat <span className="gradient-text-accent">Detailing</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto">
              Real pricing, no waiting for a callback. Pick a package, enter your
              length in feet, and see your total instantly.
            </p>
          </ScrollReveal>
        </div>

        {/* Category toggle */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            {categories.map(c => {
              const Icon = c.icon
              const active = category === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${
                    active ? 'text-black' : 'text-slate-300 hover:text-white'
                  }`}
                  style={active
                    ? { background: '#FF6A00', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Icon className="w-4 h-4" />
                  {c.label}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Length input */}
        <ScrollReveal delay={0.25}>
          <div className="max-w-xs mx-auto mb-10">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 text-center">
              {category === 'boat' ? "Your Boat's" : "Your RV's"} Length (Feet)
            </label>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={length}
              onChange={e => setLength(e.target.value)}
              placeholder="e.g. 24"
              className="w-full px-4 py-3 rounded-xl border text-white text-center text-lg font-display font-bold outline-none transition-all focus:border-[#FF6A00]/50 focus:shadow-[0_0_0_2px_rgba(255,106,0,0.12)]"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
            />
          </div>
        </ScrollReveal>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {packages.map((pkg, i) => {
            const total = getRvBoatTotal(pkg.pricePerFoot, lengthFeet)
            return (
              <ScrollReveal key={pkg.id} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/6 bg-card-gradient overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide mb-1">
                      {pkg.name}
                    </h3>
                    <div className="font-display font-bold text-2xl mb-4" style={{ color: '#FF8A3D' }}>
                      ${pkg.pricePerFoot}<span className="text-sm text-slate-500">/ft</span>
                    </div>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {pkg.includes.map(item => (
                        <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                          <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#FF6A00' }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/5 mb-4">
                      {lengthFeet > 0 ? (
                        <>
                          <div className="text-xs text-slate-500 mb-1">
                            {pkg.pricePerFoot} × {lengthFeet} ft
                          </div>
                          <div className="font-display font-bold text-3xl text-white">${total}</div>
                        </>
                      ) : (
                        <div className="text-xs text-slate-500 italic">
                          Enter your length above to see your price
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <Link href="/quote" className="btn-orange w-full py-2.5 text-sm">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a href={siteConfig.company.phoneHref} className="btn-outline w-full py-2.5 text-sm">
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
