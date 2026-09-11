import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface EstimateBody {
  type:         'estimate'
  size:         string
  pkg:          string
  addons:       string[]
  fulfillment:  string
  total:        number
  name:         string
  email:        string
  phone:        string
  address?:     string
  notes?:       string
}

interface CustomBody {
  type:     'custom'
  service:  string
  name:     string
  email:    string
  phone:    string
  details:  string
  message:  string
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as EstimateBody | CustomBody

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const isEstimate = body.type === 'estimate'

    const subject = isEstimate
      ? `New Quote Request — ${body.pkg} (${body.size}) | ${body.name}`
      : `New Quote Request — ${body.service} | ${body.name}`

    const detailRows = isEstimate
      ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px; width: 150px;">Vehicle Size</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px; font-weight: 600;">${body.size}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Package</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px; font-weight: 600;">${body.pkg}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Add-Ons</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px;">${body.addons.length ? body.addons.join(', ') : 'None'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Service Type</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #FF8A3D; font-size: 14px; font-weight: 700;">${body.fulfillment}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Estimated Total</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #FF8A3D; font-size: 18px; font-weight: 800;">$${body.total}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Address</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${body.address || '—'}</td>
        </tr>
      `
      : `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px; width: 150px;">Requested Service</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #FF8A3D; font-size: 14px; font-weight: 700;">${body.service}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Vehicle / Fleet / RV Details</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${body.details || '—'}</td>
        </tr>
      `

    const messageBlock = isEstimate
      ? (body.notes
          ? `<div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Notes</p>
              <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.7;">${body.notes.replace(/\n/g, '<br>')}</p>
            </div>`
          : '')
      : `<div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Message</p>
          <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.7;">${body.message.replace(/\n/g, '<br>')}</p>
        </div>`

    await resend.emails.send({
      from:    'GP Mobile Car Wash & Detail <noreply@housecallwebs.com>',
      to:      ['gpmobilecarwash@gmail.com'],
      replyTo: body.email,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
          <div style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="margin: 0 0 4px; font-size: 22px; color: #ffffff;">${isEstimate ? 'New Quote Request' : 'New Custom Quote Request'}</h1>
            <p style="margin: 0; font-size: 13px; color: #64748b;">GP Mobile Car Wash &amp; Detail</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px; width: 150px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px; font-weight: 600;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px;">${body.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px;">${body.phone || '—'}</td>
            </tr>
            ${detailRows}
          </table>

          ${messageBlock}

          <a href="mailto:${body.email}" style="display: inline-block; background: #FF6A00; color: #000000; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
            Reply to ${body.name}
          </a>

          <p style="margin: 24px 0 0; font-size: 11px; color: #334155;">
            This message was submitted via the quote tool at gpmobilecarwash.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote form error:', err)
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 })
  }
}
