'use client'

import { motion } from 'framer-motion'
import { Store, MapPin, Clock, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Store,       label: 'Drop Off or Mobile', sub: 'Your choice, same price' },
  { icon: MapPin,      label: '35-Mile Radius',    sub: 'Around Lincoln, NE' },
  { icon: Clock,       label: 'Mon – Fri, 8–4',     sub: 'Sat by appointment' },
  { icon: ShieldCheck, label: 'Locally Based',      sub: 'Greater Lincoln, Nebraska' },
]

export default function TrustStrip() {
  return (
    <section className="relative border-y border-white/5 py-5 overflow-hidden"
      style={{ background: '#0f0f0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center gap-3 py-1"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                <Icon className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white leading-tight">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
