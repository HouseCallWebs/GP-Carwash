'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Check, Phone, Send, Loader2, CheckCircle, AlertCircle, Sparkles, HelpCircle, Store, Truck,
  Anchor, Caravan, Plus, Trash2,
} from 'lucide-react'
import { siteConfig, getPrice, getRvBoatTotal, type VehicleSize, type PackageTier, type RvBoatCategory } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

type Mode = 'estimate' | 'rvboat' | 'custom'
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
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-14">
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
            onClick={() => setMode('rvboat')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${
              mode === 'rvboat' ? 'text-black' : 'text-slate-300 hover:text-white'
            }`}
            style={mode === 'rvboat'
              ? { background: '#FF6A00', borderColor: '#FF6A00' }
              : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <Anchor className="w-4 h-4" />
            RV &amp; Boat Detailing
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
            Ceramic, Fleet &amp; More
          </button>
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        {mode === 'estimate' ? (
          <motion.div key="estimate" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <EstimateFlow />
          </motion.div>
        ) : mode === 'rvboat' ? (
          <motion.div key="rvboat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            <RvBoatFlow />
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

const optionalAddons = siteConfig.addons
const petHairFee = siteConfig.petHairFee

interface VehicleConfig {
  id:           string
  size:         VehicleSize | null
  pkg:          PackageTier | null
  petHair:      boolean | null
  addonIds:     string[]
  vehicleColor: string
  licensePlate: string
}

let vehicleIdCounter = 0
function newVehicleId() {
  vehicleIdCounter += 1
  return `vehicle-${vehicleIdCounter}-${Date.now()}`
}

function makeVehicle(): VehicleConfig {
  return { id: newVehicleId(), size: null, pkg: null, petHair: null, addonIds: [], vehicleColor: '', licensePlate: '' }
}

function vehicleAddonsTotal(v: VehicleConfig): number {
  return v.addonIds.reduce((sum, id) => {
    const a = siteConfig.addons.find(a => a.id === id)
    return sum + (a ? a.price : 0)
  }, 0)
}

function vehicleTotal(v: VehicleConfig): number {
  const base = v.size && v.pkg ? getPrice(v.pkg, v.size) : 0
  return base + vehicleAddonsTotal(v) + (v.petHair ? petHairFee : 0)
}

function vehicleComplete(v: VehicleConfig): boolean {
  return !!v.size && !!v.pkg && v.petHair !== null
}

function EstimateFlow() {
  const [vehicles, setVehicles] = useState<VehicleConfig[]>([makeVehicle()])
  const [fulfillment, setFulfillment] = useState<Fulfillment | null>(null)
  const [form, setForm]     = useState({ name: '', email: '', phone: '', address: '', notes: '' })
  const [status, setStatus] = useState<Status>('idle')

  const total = useMemo(() => vehicles.reduce((sum, v) => sum + vehicleTotal(v), 0), [vehicles])
  const canSubmit = vehicles.every(vehicleComplete) && !!fulfillment && !!form.name && !!form.email

  function updateVehicle(id: string, patch: Partial<VehicleConfig>) {
    setVehicles(prev => prev.map(v => (v.id === id ? { ...v, ...patch } : v)))
  }

  function addVehicle() {
    setVehicles(prev => [...prev, makeVehicle()])
  }

  function removeVehicle(id: string) {
    setVehicles(prev => (prev.length > 1 ? prev.filter(v => v.id !== id) : prev))
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!vehicles.every(vehicleComplete) || !fulfillment) return
    setStatus('loading')
    try {
      const fulfillmentObj = fulfillmentOptions.find(f => f.id === fulfillment)!
      const address = fulfillment === 'dropoff' ? siteConfig.company.address.full : form.address

      const vehiclePayload = vehicles.map(v => {
        const sizeObj = siteConfig.vehicleSizes.find(s => s.id === v.size)!
        const pkgObj  = siteConfig.packages.find(p => p.id === v.pkg)!
        const addonLabels = v.addonIds.map(id => siteConfig.addons.find(a => a.id === id)!.label)
        return {
          size:         sizeObj.label,
          pkg:          pkgObj.name,
          petHair:      v.petHair ? 'Yes' : 'No',
          addons:       addonLabels,
          vehicleColor: v.vehicleColor,
          licensePlate: v.licensePlate,
          subtotal:     vehicleTotal(v),
        }
      })

      const res = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'estimate',
          vehicles: vehiclePayload,
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
          We&apos;ll reach out shortly to confirm your ${total} estimate
          {vehicles.length > 1 ? ` for ${vehicles.length} vehicles` : ''} and get you booked.
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

        {/* Step 1 — vehicle(s) */}
        <div>
          <StepLabel n={1} label={vehicles.length > 1 ? 'Your Vehicles' : 'Your Vehicle'} />
          <div className="space-y-6">
            {vehicles.map((v, i) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                index={i}
                canRemove={vehicles.length > 1}
                onChange={patch => updateVehicle(v.id, patch)}
                onRemove={() => removeVehicle(v.id)}
              />
            ))}
          </div>
          <button
            onClick={addVehicle}
            type="button"
            className="btn-outline w-full py-3.5 text-sm mt-4"
          >
            <Plus className="w-4 h-4" /> Add Another Vehicle
          </button>
        </div>

        {/* Step 2 — drop off or mobile */}
        <div>
          <StepLabel n={2} label="Drop Off or We Come to You" />
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

        {/* Step 3 — contact */}
        <div>
          <StepLabel n={3} label="Your Contact Info" />
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
                <><Send className="w-5 h-5" /> Book {vehicles.length > 1 ? `${vehicles.length} Vehicles` : 'This Estimate'} — ${total}</>
              )}
            </button>
            {!canSubmit && (
              <p className="text-xs text-slate-500 text-center">
                Finish configuring each vehicle (size, package, pet hair question),
                choose a drop-off or mobile option, and enter your name &amp; email to book.
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

          <div className="space-y-4 mb-5 text-sm">
            {vehicles.map((v, i) => (
              <div key={v.id} className={i > 0 ? 'pt-3 border-t border-white/5' : ''}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {vehicles.length > 1 ? `Vehicle ${i + 1}` : 'Vehicle'}
                  </span>
                  <span className="text-white font-semibold">${vehicleTotal(v)}</span>
                </div>
                <SummaryRow label="Size" value={v.size ? siteConfig.vehicleSizes.find(s => s.id === v.size)!.label : '—'} />
                <SummaryRow label="Package" value={v.pkg ? siteConfig.packages.find(p => p.id === v.pkg)!.name : '—'} />
                {v.petHair !== null && (
                  <div className="flex justify-between text-xs text-slate-400 pt-1">
                    <span>Pet Hair</span>
                    <span>{v.petHair ? `Yes (+$${petHairFee})` : 'No'}</span>
                  </div>
                )}
                {v.addonIds.map(id => {
                  const a = siteConfig.addons.find(a => a.id === id)!
                  return (
                    <div key={id} className="flex justify-between text-xs text-slate-400 pt-1">
                      <span>{a.label}</span>
                      <span>+${a.price}</span>
                    </div>
                  )
                })}
              </div>
            ))}
            <div className="pt-3 border-t border-white/5">
              <SummaryRow label="Service Type" value={fulfillment ? fulfillmentOptions.find(f => f.id === fulfillment)!.label : '—'} />
            </div>
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

function VehicleCard({
  vehicle, index, canRemove, onChange, onRemove,
}: {
  vehicle:   VehicleConfig
  index:     number
  canRemove: boolean
  onChange:  (patch: Partial<VehicleConfig>) => void
  onRemove:  () => void
}) {
  function toggleAddon(id: string) {
    onChange({
      addonIds: vehicle.addonIds.includes(id)
        ? vehicle.addonIds.filter(x => x !== id)
        : [...vehicle.addonIds, id],
    })
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card-gradient p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm text-black"
            style={{ background: '#FF6A00' }}>
            {index + 1}
          </div>
          <h4 className="font-display font-bold text-white uppercase tracking-wide text-lg">
            Vehicle {index + 1}
          </h4>
        </div>
        {canRemove && (
          <button type="button" onClick={onRemove}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      {/* Size */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">Vehicle Size</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {siteConfig.vehicleSizes.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange({ size: s.id })}
              className="text-left rounded-xl border overflow-hidden transition-all"
              style={vehicle.size === s.id
                ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="relative aspect-[4/3] bg-black/20">
                <Image
                  src={s.image}
                  alt={`${s.label} vehicle size example — ${s.sub}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-display font-bold text-white uppercase tracking-wide text-sm">{s.label}</span>
                  {vehicle.size === s.id && <Check className="w-4 h-4" style={{ color: '#FF6A00' }} />}
                </div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Package */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">Package</div>
        {!vehicle.size && (
          <p className="text-xs text-slate-500 mb-2 italic">Select a vehicle size to see pricing.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {siteConfig.packages.map(p => {
            const price = vehicle.size ? p.prices[vehicle.size] : null
            const selected = vehicle.pkg === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange({ pkg: p.id })}
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
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-white uppercase tracking-wide">{p.name}</span>
                  {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
                </div>
                <div className="font-display font-bold text-lg" style={{ color: price ? '#FF8A3D' : '#475569' }}>
                  {price ? `$${price}` : 'Select size'}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pet hair */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
          Is There Pet Hair in This Vehicle?
        </div>
        <div className="grid grid-cols-2 gap-3">
          {([
            { value: true,  label: 'Yes', sub: `Adds a $${petHairFee} pet hair removal fee` },
            { value: false, label: 'No',  sub: 'No pet hair to remove' },
          ] as const).map(opt => {
            const selected = vehicle.petHair === opt.value
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onChange({ petHair: opt.value })}
                className="text-left p-4 rounded-xl border transition-all"
                style={selected
                  ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                  : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-bold text-white uppercase tracking-wide">{opt.label}</span>
                  {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
                </div>
                <div className="text-xs text-slate-500">{opt.sub}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">Optional Extras</div>
        <div className="space-y-3">
          {optionalAddons.map(a => {
            const checked = vehicle.addonIds.includes(a.id)
            return (
              <button
                key={a.id}
                type="button"
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

      {/* Vehicle color / plate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Vehicle Color</label>
          <input value={vehicle.vehicleColor} onChange={e => onChange({ vehicleColor: e.target.value })}
            placeholder="e.g. Silver" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">License Plate</label>
          <input value={vehicle.licensePlate} onChange={e => onChange({ licensePlate: e.target.value })}
            placeholder="e.g. ABC-1234" className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-sm text-slate-400">Vehicle {index + 1} Subtotal</span>
        <span className="font-display font-bold text-2xl text-white">${vehicleTotal(vehicle)}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────── */
/*  RV & Boat Detailing — priced per foot                              */
/* ─────────────────────────────────────────────────────────────────── */

const rvBoatCategories: { id: RvBoatCategory; label: string; icon: typeof Anchor }[] = [
  { id: 'boat', label: 'Boat', icon: Anchor },
  { id: 'rv',   label: 'RV',   icon: Caravan },
]

function RvBoatFlow() {
  const [category, setCategory] = useState<RvBoatCategory | null>(null)
  const [pkgId, setPkgId]       = useState<string | null>(null)
  const [length, setLength]     = useState('')
  const [form, setForm]         = useState({ name: '', email: '', phone: '', address: '', notes: '' })
  const [status, setStatus]     = useState<Status>('idle')

  const lengthFeet = parseFloat(length) || 0
  const packages   = category ? siteConfig.rvBoatPackages[category] : []
  const selectedPkg = packages.find(p => p.id === pkgId) ?? null
  const total = selectedPkg ? getRvBoatTotal(selectedPkg.pricePerFoot, lengthFeet) : 0
  const canSubmit = !!category && !!selectedPkg && lengthFeet > 0 && !!form.name && !!form.email

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function selectCategory(c: RvBoatCategory) {
    setCategory(c)
    setPkgId(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category || !selectedPkg || lengthFeet <= 0) return
    setStatus('loading')
    try {
      const res = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type:         'rvboat',
          category:     category === 'boat' ? 'Boat' : 'RV',
          pkg:          selectedPkg.name,
          pricePerFoot: selectedPkg.pricePerFoot,
          length:       lengthFeet,
          total,
          ...form,
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

        {/* Step 1 — boat or RV */}
        <div>
          <StepLabel n={1} label="Boat or RV?" />
          <div className="grid grid-cols-2 gap-3">
            {rvBoatCategories.map(c => {
              const Icon = c.icon
              const selected = category === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => selectCategory(c.id)}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border text-left transition-all"
                  style={selected
                    ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className="w-4 h-4" style={{ color: '#FF6A00' }} />
                  <span className="font-display font-bold text-white uppercase tracking-wide">{c.label}</span>
                  {selected && <Check className="w-4 h-4" style={{ color: '#FF6A00' }} />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2 — package */}
        <div>
          <StepLabel n={2} label="Choose Your Package" />
          {!category && (
            <p className="text-sm text-slate-500 mb-3 italic">Select Boat or RV to see packages.</p>
          )}
          <div className="space-y-3">
            {packages.map(p => {
              const selected = pkgId === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setPkgId(p.id)}
                  className="w-full text-left p-4 rounded-xl border transition-all"
                  style={selected
                    ? { background: 'rgba(255,106,0,0.1)', borderColor: '#FF6A00' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-white uppercase tracking-wide">{p.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-lg" style={{ color: '#FF8A3D' }}>
                        ${p.pricePerFoot}/ft
                      </span>
                      {selected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6A00' }} />}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{p.includes.join(' · ')}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 3 — length */}
        <div>
          <StepLabel n={3} label="Enter Your Length (Feet)" />
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={length}
            onChange={e => setLength(e.target.value)}
            placeholder="e.g. 24"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {/* Step 4 — contact */}
        <div>
          <StepLabel n={4} label="Your Contact Info" />
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
                Where Is It Located?
              </label>
              <input name="address" value={form.address} onChange={handleFormChange}
                placeholder="Marina, storage lot, or home address" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Notes</label>
              <textarea name="notes" rows={3} value={form.notes} onChange={handleFormChange}
                placeholder="Make/model, preferred day/time, anything else we should know…"
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
                Select Boat or RV, choose a package, enter your length, and enter
                your name &amp; email to book.
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
            <SummaryRow label="Type" value={category ? (category === 'boat' ? 'Boat' : 'RV') : '—'} />
            <SummaryRow label="Package" value={selectedPkg ? selectedPkg.name : '—'} />
            <SummaryRow label="Length" value={lengthFeet > 0 ? `${lengthFeet} ft` : '—'} />
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

          {selectedPkg && lengthFeet > 0 && (
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              ${selectedPkg.pricePerFoot}/ft × {lengthFeet} ft = ${total}
            </p>
          )}
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
/*  Custom Quote — Ceramic Coating / Fleet / Not Sure                  */
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
        Ceramic coating and fleet washing are priced individually based on the
        job. Tell us what you need and we&apos;ll send a custom quote.
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
            Vehicle / Fleet Details
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
