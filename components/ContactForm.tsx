'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', vehicle: '', message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', vehicle: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl border text-white text-sm placeholder-slate-500 outline-none transition-all focus:border-[#FF6A00]/50 focus:shadow-[0_0_0_2px_rgba(255,106,0,0.12)]`
  const inputStyle = { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/8 p-8 shadow-card"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      {status === 'success' ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)' }}>
            <CheckCircle className="w-8 h-8" style={{ color: '#FF6A00' }} />
          </div>
          <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">
            Message Sent!
          </h3>
          <p className="text-slate-400 mb-6">
            We&apos;ll get back to you shortly. For same-day help, call us directly.
          </p>
          <button onClick={() => setStatus('idle')}
            className="btn-orange px-6 py-3 text-sm">
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                name="name" type="text" required placeholder="Jane Smith"
                value={form.name} onChange={handleChange}
                className={inputClass} style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                name="phone" type="tel" placeholder="(402) 555-0000"
                value={form.phone} onChange={handleChange}
                className={inputClass} style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              name="email" type="email" required placeholder="jane@email.com"
              value={form.email} onChange={handleChange}
              className={inputClass} style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Vehicle (year, make, model)
            </label>
            <input
              name="vehicle" type="text" placeholder="2021 Ford Explorer"
              value={form.vehicle} onChange={handleChange}
              className={inputClass} style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Message *
            </label>
            <textarea
              name="message" required rows={5}
              placeholder="Tell us what you need, your address, and when you're available…"
              value={form.message} onChange={handleChange}
              className={inputClass + ' resize-none'} style={inputStyle}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <button type="submit" disabled={status === 'loading'}
            className="btn-orange w-full py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed">
            {status === 'loading' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
            ) : (
              <><Send className="w-5 h-5" /> Send Message</>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center">
            We typically respond within a few hours during business hours.
          </p>
        </form>
      )}
    </motion.div>
  )
}
