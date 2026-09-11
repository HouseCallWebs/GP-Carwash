'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, Phone, Send, Loader2, CheckCircle, AlertCircle, Sparkles, HelpCircle, Store, Truck,
} from 'lucide-react'
import { siteConfig, getPrice, type VehicleSize, type PackageTier } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

type Mode = 'estimate' | 'custom'
type Status = 'idle' | 'loading' | 'success' | 'error'
type Fulfillment = 'dropoff' | 'mobile'

const fulfillmentOptions: { id: Fulfillment; label: string; sub: string; icon: typeof Store }[] = [
  { id: 'dropoff', label: 'Drop Off at Our Shop', sub: siteConfig.company.address.full, icon: Store },
  { id: 'mobile',  label: 'We Come to You',       sub: 'We bring the equipment to your location', icon: Truck },
]

const inputStyle = { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }
const inputClass = 'w-full px-4 py-3 rounded-xl border text-white text-sm placeholder-slate-500 outline-none transition-all focus:border-[#FF6A00]/50 focus:shadow-[0_0_0_2px_rgba(255,106,0,0.12)]'

export default function QuoteFlow() {
  const [mode, setMode] = useState<Mode>('estimate')

  return (
    <div>
      {/* Mode toggle */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-14">
          <button
            onClick={() => setMode('estimate')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'estimate' ? 'text-black' : 'text-slate-300 hover:text-white'
            }`}
            style={mode === 'estimate'
              ? { background: '#FF6A00', borderColor: '#FF6A00' }
              : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <Sparkles className="w-4 h-4" />
            Instant Price Estimate
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'custom' ? 'text-black' : 'text-slate-300 hover:text-white'
            }`}
            style={mode === 'custom'
              ? { background: '#FF6A00', borderColor: '#FF6A00' }
              : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <HelpCircle className="w-4 h-4" />
            Ceramic, Fleet, RV &amp; More
          </button>
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        {mode === 'estimate' ? (
          <motion.div key="estimate" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <EstimateFlow />
          </motion.div>
        ) : (
          <motion.div key="custom" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <CustomFlow />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Instant Price Estimate                                              */
/* ─────────────────────────────────────────────────────────────────── */

function EstimateFlow() {
  const [size, setSize]     = useState<VehicleSize | null>(null)
  const [pkg, setPkg]       = useState<PackageTier | null>(null)
  const [addonIds, setAddonIds] = useState<string[]>([])
  const [fulfillment, setFulfillment] = useState<Fulfillment | null>(null)
  const [form, setForm]     = useState({ name: '', email: '', phone: '', address: '', notes: '' })
  const [status, setStatus] = useState<Status>('idle')

  const basePrice = size && pkg ? getPrice(pkg, size) : 0
  const addonsTotal = useMemo(
    () => addonIds.reduce((sum, id) => {
      const a = siteConfig.addons.find(a => a.id === id)
      return sum + (a ? a.price : 0)
    }, 0),
    [addonIds],
  )
  const total = basePrice + addonsTotal
  const canSubmit = !!size && !!pkg && !!fulfillment && !!form.name && !!form.email

  function toggleAddon(id: string) {
    setAddonIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!size || !pkg || !fulfillment) return
    setStatus('loading')
    try {
      const pkgObj  = siteConfig.packages.find(p => p.id === pkg)!
      const sizeObj = siteConfig.vehicleSizes.find(s => s.id === size)!
      const addonLabels = addonIds.map(id => siteConfig.addons.find(a => a.id === id)!.label)
      const fulfillmentObj = fulfillmentOptions.find(f => f.id === fulfillment)!
      const address = fulfillment === 'dropoff' ? siteConfig.company.address.full : form.address

      const res = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'estimate',
          size: sizeObj.label,
          pkg:  pkgObj.name,
          addons: addonLabels,
          fulfillment: fulfillmentObj.label,
          total,
          ...form,
          address,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#FF6A00' }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">Quote Request Sent!</h3>
        <p className="text-slate-400 mb-6">
          We&apos;ll reach out shortly to confirm your ${total} estimate and get you booked.
          Need it faster? Call us directly.
        </p>
        <a href={siteConfig.company.phoneHref} className="btn-orange px-6 py-3 text-sm inline-flex">
          <Phone className="w-4 h-4" /> {siteConfig.company.phone}
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">

        {/* Step 1 — size */}
        <div>
          <StepLabel n={1} label="Choose Your Vehicle Size" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {siteConfig.vehicleSizes.map(s => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className="text-left p-4 rounded-xl border transition-all"
                style={size === s.id
                  ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                  : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-white uppercase tracking-wide">{s.label}</span>
                  {size === s.id && <Check className="w-4 h-4" style={{ color: '#FF6A00' }} />}
                </div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — package */}
        <div>
          <StepLabel n={2} label="Choose Your Package" />
          {!size && (
            <p className="text-sm text-slate-500 mb-3 italic">Select a vehicle size to see pricing.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {siteConfig.packages.map(p => {
              const price = size ? p.prices[size] : null
              const selected = pkg === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setPkg(p.id)}
                  className="relative text-left p-4 rounded-xl border transition-all"
                  style={selected
                    ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  {p.popular && (
                    <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
                      style={{ background: '#FF6A00', color: '#000' }}>
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-white uppercase tracking-wide">{p.name}</span>
                    {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{p.tagline}</div>
                  <div className="font-display font-bold text-lg" style={{ color: price ? '#FF8A3D' : '#475569' }}>
                    {price ? `$${price}` : 'Select size'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 3 — add-ons */}
        <div>
          <StepLabel n={3} label="Add Optional Extras" />
          <div className="space-y-3">
            {siteConfig.addons.map(a => {
              const checked = addonIds.includes(a.id)
              return (
                <button
                  key={a.id}
                  onClick={() => toggleAddon(a.id)}
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border text-left transition-all"
                  style={checked
                    ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0"
                      style={checked ? { background: '#FF6A00', borderColor: '#FF6A00' } : { borderColor: 'rgba(255,255,255,0.25)' }}>
                      {checked && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{a.label}</div>
                      <div className="text-xs text-slate-500">{a.description}</div>
                    </div>
                  </div>
                  <div className="font-display font-bold text-sm flex-shrink-0" style={{ color: '#FF8A3D' }}>
                    +${a.price}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 4 — drop off or mobile */}
        <div>
          <StepLabel n={4} label="Drop Off or We Come to You" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fulfillmentOptions.map(f => {
              const selected = fulfillment === f.id
              const Icon = f.icon
              return (
                <button
                  key={f.id}
                  onClick={() => setFulfillment(f.id)}
                  className="text-left p-4 rounded-xl border transition-all"
                  style={selected
                    ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                      <Icon className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
                    </div>
                    {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
                  </div>
                  <div className="font-display font-bold text-white uppercase tracking-wide mb-1">{f.label}</div>
                  <div className="text-xs text-slate-500">{f.sub}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 5 — contact */}
        <div>
          <StepLabel n={5} label="Your Contact Info" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Name *</label>
                <input name="name" required value={form.name} onChange={handleFormChange}
                  placeholder="Jane Smith" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleFormChange}
                  placeholder="(402) 555-0000" className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleFormChange}
                placeholder="jane@email.com" className={inputClass} style={inputStyle} />
            </div>
            {fulfillment === 'dropoff' ? (
              <div className="p-3 rounded-xl text-sm flex items-start gap-2.5"
                style={{ background: 'rgba(255,106,0,0.05)', border: '1px solid rgba(255,106,0,0.12)' }}>
                <Store className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6A00' }} strokeWidth={2} />
                <span className="text-slate-300">
                  You&apos;ll drop off at our shop — {siteConfig.company.address.full}
                </span>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Service Address</label>
                <input name="address" value={form.address} onChange={handleFormChange}
                  placeholder="Where should we meet you?" className={inputClass} style={inputStyle} />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Notes</label>
              <textarea name="notes" rows={3} value={form.notes} onChange={handleFormChange}
                placeholder="Preferred day/time, gate code, anything else we should know…"
                className={inputClass + ' resize-none'} style={inputStyle} />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <button type="submit" disabled={!canSubmit || status === 'loading'}
              className="btn-orange w-full py-4 text-base font-bold disabled:opacity-40 disabled:cursor-not-allowed">
              {status === 'loading' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
              ) : (
                <><Send className="w-5 h-5" /> Book This Estimate — ${total}</>
              )}
            </button>
            {!canSubmit && (
              <p className="text-xs text-slate-500 text-center">
                Select a size, a package, a drop-off or mobile option, and enter your name &amp; email to book.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Sticky summary */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-28 rounded-2xl border border-white/8 p-6 shadow-card"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#FF8A3D' }}>
            Your Estimate
          </div>

          <div className="space-y-3 mb-5 text-sm">
            <SummaryRow label="Vehicle Size" value={size ? siteConfig.vehicleSizes.find(s => s.id === size)!.label : '—'} />
            <SummaryRow label="Package" value={pkg ? siteConfig.packages.find(p => p.id === pkg)!.name : '—'} />
            <SummaryRow label="Service Type" value={fulfillment ? fulfillmentOptions.find(f => f.id === fulfillment)!.label : '—'} />
            {addonIds.length > 0 && (
              <div className="pt-2 border-t border-white/5">
                {addonIds.map(id => {
                  const a = siteConfig.addons.find(a => a.id === id)!
                  return (
                    <div key={id} className="flex justify-between text-xs text-slate-400 py-1">
                      <span>{a.label}</span>
                      <span>+${a.price}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-end justify-between">
            <span className="text-sm text-slate-400">Running Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.15, color: '#FF8A3D' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.35 }}
              className="font-display font-bold text-4xl text-white"
            >
              ${total}
            </motion.span>
          </div>

          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Final price confirmed at booking. Add-ons stack on top of your selected package.
          </p>
        </div>
      </div>
    </div>
  )
}

function StepLabel({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm text-black"
        style={{ background: '#FF6A00' }}>
        {n}
      </div>
      <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">{label}</h3>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Custom Quote — Ceramic Coating / Fleet / RV & Boat / Not Sure       */
/* ─────────────────────────────────────────────────────────────────── */

function CustomFlow() {
  const [service, setService] = useState('')
  const [form, setForm]       = useState({ name: '', email: '', phone: '', details: '', message: '' })
  const [status, setStatus]   = useState<Status>('idle')

  const options = [...siteConfig.quoteOnlyServices, { id: 'not-sure', name: 'Not Sure / Something Else', description: 'Tell us what you need and we’ll figure out the right service together.' }]
  const canSubmit = !!service && !!form.name && !!form.email

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!service) return
    setStatus('loading')
    try {
      const serviceObj = options.find(o => o.id === service)!
      const res = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'custom', service: serviceObj.name, ...form }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#FF6A00' }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">Request Sent!</h3>
        <p className="text-slate-400 mb-6">
          These jobs are priced individually, so we&apos;ll follow up with a custom quote shortly.
        </p>
        <a href={siteConfig.company.phoneHref} className="btn-orange px-6 py-3 text-sm inline-flex">
          <Phone className="w-4 h-4" /> {siteConfig.company.phone}
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-slate-400 mb-8">
        Ceramic coating, fleet washing, and RV/boat detailing are priced individually
        based on the job. Tell us what you need and we&apos;ll send a custom quote.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {options.map(o => {
          const selected = service === o.id
          return (
            <button
              key={o.id}
              onClick={() => setService(o.id)}
              className="text-left p-4 rounded-xl border transition-all"
              style={selected
                ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-white text-sm uppercase tracking-wide">{o.name}</span>
                {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
              </div>
              <div className="text-xs text-slate-500">{o.description}</div>
            </button>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Name *</label>
            <input name="name" required value={form.name} onChange={handleFormChange}
              placeholder="Jane Smith" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleFormChange}
              placeholder="(402) 555-0000" className={inputClass} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handleFormChange}
            placeholder="jane@email.com" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Vehicle / Fleet / RV / Boat Details
          </label>
          <input name="details" value={form.details} onChange={handleFormChange}
            placeholder="Year, make, model, or fleet size" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Message *</label>
          <textarea name="message" required rows={4} value={form.message} onChange={handleFormChange}
            placeholder="Tell us more about what you need…" className={inputClass + ' resize-none'} style={inputStyle} />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <button type="submit" disabled={!canSubmit || status === 'loading'}
          className="btn-orange w-full py-4 text-base font-bold disabled:opacity-40 disabled:cursor-not-allowed">
          {status === 'loading' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
          ) : (
            <><Send className="w-5 h-5" /> Request a Quote</>
          )}
        </button>
      </form>
    </div>
  )
}
