'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { siteConfig } from '@/lib/config'

type Status = 'idle' | 'loading' | 'success' | 'error'
type YN = '' | 'yes' | 'no'

const inputClass = `w-full px-4 py-3 rounded-xl border text-white text-sm placeholder-slate-500 outline-none transition-all focus:border-[#FF6A00]/50 focus:shadow-[0_0_0_2px_rgba(255,106,0,0.12)]`
const inputStyle = { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }
const labelClass = 'block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'

function Field({
  label, name, required, type = 'text', placeholder, autoComplete, inputMode, className = '', maxLength = 200,
}: {
  label: string; name: string; required?: boolean; type?: string; placeholder?: string
  autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  className?: string; maxLength?: number
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}{required && ' *'}</label>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder}
        autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength}
        className={inputClass} style={inputStyle}
      />
    </div>
  )
}

function TextArea({ label, name, required, placeholder, rows = 3 }: {
  label: string; name: string; required?: boolean; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>{label}{required && ' *'}</label>
      <textarea
        id={name} name={name} required={required} rows={rows} placeholder={placeholder} maxLength={2000}
        className={inputClass + ' resize-y'} style={inputStyle}
      />
    </div>
  )
}

function YesNo({ question, name, value, onChange, required }: {
  question: string; name: string; value: YN; onChange: (v: YN) => void; required?: boolean
}) {
  return (
    <fieldset>
      <legend className="text-sm text-slate-200 leading-relaxed mb-2.5">
        {question}{required && <span className="text-slate-500"> *</span>}
      </legend>
      <div className="flex gap-3">
        {(['yes', 'no'] as const).map(opt => {
          const active = value === opt
          return (
            <label key={opt}
              className="relative flex-1 sm:flex-none sm:min-w-[110px] cursor-pointer select-none rounded-xl border px-5 py-2.5 text-sm font-semibold text-center transition-all"
              style={{
                background:  active ? 'rgba(255,106,0,0.12)' : 'rgba(255,255,255,0.04)',
                borderColor: active ? 'rgba(255,106,0,0.55)' : 'rgba(255,255,255,0.1)',
                color:       active ? '#FF8A3D' : '#cbd5e1',
              }}>
              <input
                type="radio" name={name} value={opt} required={required}
                checked={active} onChange={() => onChange(opt)}
                className="absolute opacity-0 inset-0 cursor-pointer"
              />
              {opt === 'yes' ? 'Yes' : 'No'}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Section({ step, title, subtitle, children }: {
  step: number; title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/8 p-5 sm:p-8"
      style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-start gap-3 mb-6">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
          style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)', color: '#FF6A00' }}>
          {step}
        </span>
        <div>
          <h2 className="font-display font-bold text-white uppercase text-lg tracking-wide leading-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

const initialYN = {
  usCitizen: '' as YN, authorizedToWork: '' as YN, workedHereBefore: '' as YN, driversLicense: '' as YN,
  convicted: '' as YN, limitations: '' as YN, relatedExperience: '' as YN,
  hsGraduated: '' as YN, collegeGraduated: '' as YN,
}

export default function CareersForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [yn, setYn] = useState(initialYN)
  const [today, setToday] = useState('')
  const startedAt = useRef<number>(0)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
    setToday(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }, [])

  const set = (k: keyof typeof initialYN) => (v: YN) => setYn(prev => ({ ...prev, [k]: v }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const data: Record<string, unknown> = {}
    fd.forEach((v, k) => { if (typeof v === 'string') data[k] = v })
    data.certify   = fd.get('certify') === 'on'
    data.startedAt = startedAt.current
    try {
      const res = await fetch('/api/careers', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      formRef.current?.reset()
      setYn(initialYN)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-white/8 p-8 sm:p-12 text-center shadow-card"
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#FF6A00' }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">Application Received!</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Thanks for your interest in joining GP Mobile Car Wash &amp; Detail. We&apos;ll review your
          application and reach out if it&apos;s a fit. Questions? Call {siteConfig.company.phone}.
        </p>
        <button onClick={() => { startedAt.current = Date.now(); setStatus('idle') }}
          className="btn-orange px-6 py-3 text-sm">
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      {/* Honeypot — hidden from humans; bots tend to fill every field */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Section step={1} title="Applicant Information">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Full Name" name="fullName" required autoComplete="name" placeholder="Jane Smith" className="sm:col-span-2" />
          <div>
            <span className={labelClass}>Date</span>
            <div className={inputClass + ' text-slate-300'} style={inputStyle}>{today || '\u00A0'}</div>
          </div>
        </div>
        <Field label="Address" name="address" required autoComplete="street-address" placeholder="123 Main St" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="City" name="city" required autoComplete="address-level2" placeholder="Lincoln" className="col-span-2" />
          <Field label="State" name="state" required autoComplete="address-level1" placeholder="NE" maxLength={30} />
          <Field label="Zip Code" name="zip" required autoComplete="postal-code" inputMode="numeric" placeholder="68507" maxLength={10} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="(402) 555-0000" />
          <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Position Desired" name="position" required placeholder="Detailer" />
          <Field label="Desired Pay" name="desiredPay" placeholder="$ per hour" />
        </div>
        <Field label="When are you available to start?" name="startAvailability" required placeholder="Immediately, 2 weeks, a specific date…" />
      </Section>

      <Section step={2} title="Emergency Contacts" subtitle="Who should we contact in case of an emergency?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Contact 1 Phone" name="emergency1Phone" type="tel" required placeholder="(402) 555-0000" />
          <Field label="Contact 1 Relationship" name="emergency1Relationship" required placeholder="Parent, spouse, friend…" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Contact 2 Phone" name="emergency2Phone" type="tel" placeholder="(402) 555-0000" />
          <Field label="Contact 2 Relationship" name="emergency2Relationship" placeholder="Parent, spouse, friend…" />
        </div>
      </Section>

      <Section step={3} title="Eligibility & Background">
        <YesNo question="Are you a citizen of the United States?" name="usCitizen" required value={yn.usCitizen} onChange={set('usCitizen')} />
        {yn.usCitizen === 'no' && (
          <YesNo question="If not, are you authorized to work in the U.S.?" name="authorizedToWork" required value={yn.authorizedToWork} onChange={set('authorizedToWork')} />
        )}
        <YesNo question="Have you ever worked for this company before?" name="workedHereBefore" required value={yn.workedHereBefore} onChange={set('workedHereBefore')} />
        {yn.workedHereBefore === 'yes' && (
          <Field label="If yes, when?" name="workedHereWhen" required placeholder="Summer 2024" />
        )}
        <YesNo question="Do you have a current driver’s license?" name="driversLicense" required value={yn.driversLicense} onChange={set('driversLicense')} />
        <YesNo question="Have you ever been convicted of a crime?" name="convicted" required value={yn.convicted} onChange={set('convicted')} />
        {yn.convicted === 'yes' && (
          <TextArea label="If yes, explain" name="convictedExplain" required />
        )}
        <YesNo
          question="Do you have any limitations that would prevent you from using power tools, working outside, standing on your feet for extended periods of time, or bending down to the ground in order to clean?"
          name="limitations" required value={yn.limitations} onChange={set('limitations')} />
        {yn.limitations === 'yes' && (
          <TextArea label="If yes, explain" name="limitationsExplain" required />
        )}
        <Field label="How did you hear about our company?" name="heardAbout" placeholder="Facebook, Google, a friend…" />
      </Section>

      <Section step={4} title="Education">
        {([['hs', 'High School'], ['college', 'College']] as const).map(([p, title]) => (
          <div key={p} className="space-y-4 pb-5 border-b border-white/6 last:border-0 last:pb-0">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={`${title} Name`} name={`${p}Name`} />
              <Field label="Address" name={`${p}Address`} placeholder="City, State" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Start Year" name={`${p}Start`} inputMode="numeric" placeholder="YYYY" maxLength={4} />
              <Field label="End Year" name={`${p}End`} inputMode="numeric" placeholder="YYYY" maxLength={4} />
              <Field label="Degree" name={`${p}Degree`} className="col-span-2" placeholder={p === 'hs' ? 'Diploma, GED…' : 'Associate, Bachelor’s…'} />
            </div>
            <YesNo question="Did you graduate?" name={`${p}Graduated`}
              value={p === 'hs' ? yn.hsGraduated : yn.collegeGraduated}
              onChange={set(p === 'hs' ? 'hsGraduated' : 'collegeGraduated')} />
          </div>
        ))}
      </Section>

      <Section step={5} title="Work Experience" subtitle="List your 3 most recent jobs and the work you performed.">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4 pb-5 border-b border-white/6 last:border-0 last:pb-0">
            <h3 className="text-sm font-semibold text-white">Job {i}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Employer" name={`job${i}Employer`} />
              <Field label="Dates" name={`job${i}Dates`} placeholder="Jan 2023 – Present" />
            </div>
            <TextArea label="Position / Job Performed" name={`job${i}Duties`} rows={2} />
          </div>
        ))}
        <YesNo question="Do you have any experience related to the position that you are applying for?"
          name="relatedExperience" required value={yn.relatedExperience} onChange={set('relatedExperience')} />
        {yn.relatedExperience === 'yes' && (
          <TextArea label="If yes, please describe it" name="relatedExperienceDescribe" required rows={4} />
        )}
      </Section>

      <Section step={6} title="References" subtitle="List three (3) references from your previous work.">
        {[1, 2, 3].map(i => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-white/6 last:border-0 last:pb-0">
            <Field label={`Reference ${i} Name`} name={`ref${i}Name`} />
            <Field label="Phone Number" name={`ref${i}Phone`} type="tel" />
            <Field label="Relationship" name={`ref${i}Relationship`} placeholder="Former manager…" />
          </div>
        ))}
      </Section>

      <Section step={7} title="Acknowledgment">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="certify" required
            className="mt-1 w-5 h-5 flex-shrink-0 rounded accent-[#FF6A00]" />
          <span className="text-sm text-slate-300 leading-relaxed">
            I certify that the information in this application is true and complete to the best of my
            knowledge, and I understand that false or missing information may disqualify me from employment. *
          </span>
        </label>
        <Field label="Signature (type your full name)" name="signature" required autoComplete="name" />
        <p className="text-xs text-slate-500 leading-relaxed">
          For your security, we never ask for your Social Security Number online. If you&apos;re hired,
          we&apos;ll collect it in person with your new-hire paperwork.
        </p>
      </Section>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 rounded-xl text-sm" role="alert"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong sending your application. Please try again, or call us at {siteConfig.company.phone}.
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="btn-orange w-full py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading' ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
        ) : (
          <><Send className="w-5 h-5" /> Submit Application</>
        )}
      </button>
    </form>
  )
}
