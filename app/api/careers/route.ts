import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Employment application submissions from /careers.
// Uses the same Resend setup (RESEND_API_KEY + housecallwebs.com sender) as /api/contact.
// NOTE: Social Security Number is intentionally NOT collected online — collect it at hire.

const TO_EMAIL   = 'gpmobilecarwash@gmail.com'
const FROM_EMAIL = 'GP Mobile Car Wash & Detail <noreply@housecallwebs.com>'
const MIN_FILL_MS = 5000 // time trap: real applicants can't finish this form in under 5s

type Data = Record<string, unknown>

function str(d: Data, key: string, max = 2000): string {
  const v = d[key]
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function show(value: string): string {
  return value ? esc(value).replace(/\n/g, '<br>') : '<span style="color:#64748b;">—</span>'
}

function yn(value: string): string {
  if (value === 'yes') return '<span style="color:#FF8A3D;font-weight:700;">Yes</span>'
  if (value === 'no')  return 'No'
  return show('')
}

const labelCell = 'padding: 9px 12px 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px; width: 190px; vertical-align: top;'
const valueCell = 'padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px; vertical-align: top;'

function rows(items: [string, string][]): string {
  return items.map(([l, v]) => `
    <tr>
      <td style="${labelCell}">${esc(l)}</td>
      <td style="${valueCell}">${v}</td>
    </tr>`).join('')
}

function section(title: string, body: string): string {
  return `
    <h2 style="margin: 28px 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #FF6A00;">${esc(title)}</h2>
    <table style="width: 100%; border-collapse: collapse;">${body}</table>`
}

const isYesNo = (v: string) => v === 'yes' || v === 'no'

export async function POST(req: NextRequest) {
  let d: Data
  try {
    d = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // ── Spam protection ────────────────────────────────────────────
  // Honeypot: hidden "website" field humans never see. Time trap: form
  // submitted implausibly fast. Bots get a fake success and nothing is sent.
  const honeypot  = str(d, 'website')
  const startedAt = Number(d.startedAt)
  const elapsed   = Date.now() - startedAt
  if (honeypot || !Number.isFinite(startedAt) || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ success: true })
  }

  const f = (k: string, max?: number) => str(d, k, max)

  const fullName = f('fullName', 120)
  const email    = f('email', 200)
  const position = f('position', 120)

  // ── Required fields ────────────────────────────────────────────
  const required = [
    'fullName', 'address', 'city', 'state', 'zip', 'phone', 'email', 'position', 'startAvailability',
    'emergency1Phone', 'emergency1Relationship', 'signature',
  ]
  const yesNoRequired = ['usCitizen', 'workedHereBefore', 'driversLicense', 'convicted', 'limitations', 'relatedExperience']

  const missing = required.filter(k => !f(k))
  for (const k of yesNoRequired) if (!isYesNo(f(k))) missing.push(k)
  if (f('usCitizen') === 'no' && !isYesNo(f('authorizedToWork'))) missing.push('authorizedToWork')
  if (f('workedHereBefore') === 'yes' && !f('workedHereWhen')) missing.push('workedHereWhen')
  if (f('convicted') === 'yes' && !f('convictedExplain')) missing.push('convictedExplain')
  if (f('limitations') === 'yes' && !f('limitationsExplain')) missing.push('limitationsExplain')
  if (f('relatedExperience') === 'yes' && !f('relatedExperienceDescribe')) missing.push('relatedExperienceDescribe')
  if (d.certify !== true) missing.push('certify')

  if (missing.length) {
    return NextResponse.json({ error: 'Missing required fields', fields: missing }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address', fields: ['email'] }, { status: 400 })
  }

  const submitted = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'long',
    timeStyle: 'short',
  })
  const appDate = new Date().toLocaleDateString('en-US', { timeZone: 'America/Chicago' })

  // ── Email body ─────────────────────────────────────────────────
  const applicant = section('Applicant Information', rows([
    ['Full Name',          show(fullName)],
    ['Date',               show(appDate)],
    ['Address',            show(f('address'))],
    ['City / State / Zip', show([f('city'), f('state'), f('zip')].filter(Boolean).join(', '))],
    ['Phone',              show(f('phone'))],
    ['Email',              `<a href="mailto:${esc(email)}" style="color:#FF8A3D;">${esc(email)}</a>`],
    ['Desired Pay',        show(f('desiredPay'))],
    ['Position Desired',   `<strong>${show(position)}</strong>`],
    ['Available to Start', show(f('startAvailability'))],
  ]))

  const emergency = section('Emergency Contacts', rows([
    ['Contact 1 Phone',        show(f('emergency1Phone'))],
    ['Contact 1 Relationship', show(f('emergency1Relationship'))],
    ['Contact 2 Phone',        show(f('emergency2Phone'))],
    ['Contact 2 Relationship', show(f('emergency2Relationship'))],
  ]))

  const eligibilityRows: [string, string][] = [
    ['U.S. citizen?', yn(f('usCitizen'))],
  ]
  if (f('usCitizen') === 'no') eligibilityRows.push(['If not, authorized to work in the U.S.?', yn(f('authorizedToWork'))])
  eligibilityRows.push(['Worked for this company before?', yn(f('workedHereBefore'))])
  if (f('workedHereBefore') === 'yes') eligibilityRows.push(['If yes, when', show(f('workedHereWhen'))])
  eligibilityRows.push(['Current driver’s license?', yn(f('driversLicense'))])
  eligibilityRows.push(['Ever convicted of a crime?', yn(f('convicted'))])
  if (f('convicted') === 'yes') eligibilityRows.push(['Explanation', show(f('convictedExplain'))])
  eligibilityRows.push(['Limitations (power tools, outdoors, standing, bending)?', yn(f('limitations'))])
  if (f('limitations') === 'yes') eligibilityRows.push(['Explanation', show(f('limitationsExplain'))])
  eligibilityRows.push(['How did you hear about us?', show(f('heardAbout'))])
  const eligibility = section('Eligibility & Background', rows(eligibilityRows))

  const edu = (prefix: 'hs' | 'college', title: string) => rows([
    [`${title}`,         show(f(`${prefix}Name`))],
    ['Address',          show(f(`${prefix}Address`))],
    ['Start / End Year', show([f(`${prefix}Start`), f(`${prefix}End`)].filter(Boolean).join(' – '))],
    ['Graduated?',       yn(f(`${prefix}Graduated`))],
    ['Degree',           show(f(`${prefix}Degree`))],
  ])
  const education = section('Education', edu('hs', 'High School') + edu('college', 'College'))

  const jobs = [1, 2, 3].map(i => rows([
    [`Job ${i}: Employer`,  show(f(`job${i}Employer`))],
    ['Position / Duties',   show(f(`job${i}Duties`))],
    ['Dates',               show(f(`job${i}Dates`))],
  ])).join('')
  const relatedRows: [string, string][] = [['Related experience?', yn(f('relatedExperience'))]]
  if (f('relatedExperience') === 'yes') relatedRows.push(['Description', show(f('relatedExperienceDescribe'))])
  const work = section('Work Experience (3 most recent)', jobs + rows(relatedRows))

  const refs = section('References', [1, 2, 3].map(i => rows([
    [`Reference ${i}: Name`, show(f(`ref${i}Name`))],
    ['Phone',                show(f(`ref${i}Phone`))],
    ['Relationship',         show(f(`ref${i}Relationship`))],
  ])).join(''))

  const ack = section('Acknowledgment', rows([
    ['Certified accurate', '<span style="color:#FF8A3D;font-weight:700;">Yes</span>'],
    ['Signature (typed)',  show(f('signature'))],
    ['Submitted',          show(`${submitted} (Central)`)],
  ]))

  const html = `
    <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; background: #0a0a0a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
      <div style="margin-bottom: 8px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <h1 style="margin: 0 0 4px; font-size: 22px; color: #ffffff;">New Job Application</h1>
        <p style="margin: 0; font-size: 14px; color: #f1f5f9;">${esc(fullName)} &middot; <span style="color:#FF8A3D;">${esc(position)}</span></p>
        <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">GP Mobile Car Wash &amp; Detail</p>
      </div>
      ${applicant}
      ${emergency}
      ${eligibility}
      ${education}
      ${work}
      ${refs}
      ${ack}
      <a href="mailto:${esc(email)}" style="display: inline-block; margin-top: 28px; background: #FF6A00; color: #000000; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
        Reply to ${esc(fullName)}
      </a>
      <p style="margin: 24px 0 0; font-size: 11px; color: #475569;">
        Submitted via the employment application at gpmobilecarwash.com/careers.
        Social Security Number is not collected online. Collect it at time of hire.
      </p>
    </div>
  `

  const subjectSafe = (s: string) => s.replace(/[\r\n]+/g, ' ')

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from:    FROM_EMAIL,
      to:      [TO_EMAIL],
      replyTo: email,
      subject: subjectSafe(`New Job Application: ${fullName} - ${position}`),
      html,
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Careers application error:', err)
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 })
  }
}
