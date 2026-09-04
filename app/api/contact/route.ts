import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, phone, vehicle, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from:    'GP Mobile Car Wash & Detail <noreply@housecallwebs.com>',
      to:      ['gpmobilecarwash@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Submission | ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
          <div style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="margin: 0 0 4px; font-size: 22px; color: #ffffff;">New Contact Form Submission</h1>
            <p style="margin: 0; font-size: 13px; color: #64748b;">GP Mobile Car Wash &amp; Detail</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px; width: 130px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f1f5f9; font-size: 14px;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Vehicle</td>
              <td style="padding: 10px 0; color: #FF8A3D; font-size: 14px; font-weight: 600;">${vehicle || '—'}</td>
            </tr>
          </table>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Message</p>
            <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; background: #FF6A00; color: #000000; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
            Reply to ${name}
          </a>

          <p style="margin: 24px 0 0; font-size: 11px; color: #334155;">
            This message was submitted via the contact form at gpmobilecarwash.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
