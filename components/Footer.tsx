'use client'

import { Phone, Mail, MapPin, Gift } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import { siteConfig } from '@/lib/config'

const quickLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/services', label: 'Services' },
  { href: '/quote',    label: 'Get a Quote' },
  { href: '/gallery',  label: 'Gallery'  },
  { href: '/reviews',  label: 'Reviews'  },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="block mb-5 w-fit">
              <Logo className="h-16 w-auto" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Car wash and detailing serving Lincoln, NE and a 35-mile radius.
              Drop off at our shop, or we&apos;ll bring the equipment to you.
            </p>
            <SocialLinks
              itemClassName="w-9 h-9 rounded-lg border border-white/10 bg-white/3 flex items-center justify-center text-slate-400 hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors"
              iconClassName="w-4 h-4"
              className="flex items-center gap-3 mb-5"
            />
            <a href={siteConfig.company.giftCardUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-[#FF8A3D] transition-colors">
              <Gift className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
              Buy a Gift Card
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors hover:pl-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">
              Service Area
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Proudly serving Lincoln, NE and every community within a 35-mile radius.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a href={siteConfig.company.phoneHref} className="group flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    style={{ color: '#FF6A00' }} strokeWidth={2} />
                  <div>
                    <div className="text-white font-semibold">{siteConfig.company.phone}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Call or text</div>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.company.email}`} className="group flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                    style={{ color: '#FF6A00' }} strokeWidth={2} />
                  <span className="text-slate-400 group-hover:text-white transition-colors break-all">
                    {siteConfig.company.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FF6A00' }} strokeWidth={2} />
                <div>
                  <div className="text-slate-300 leading-relaxed">{siteConfig.company.address.full}</div>
                  <div className="text-slate-500 text-xs mt-0.5">Drop off at our shop, or we&apos;ll come to you</div>
                  <div className="text-slate-600 text-xs mt-1.5">{siteConfig.company.serviceArea}</div>
                </div>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-3">Hours</div>
              <div className="space-y-1.5 text-sm">
                {siteConfig.hours.map(h => (
                  <div key={h.day} className="flex justify-between">
                    <span className="text-slate-400">{h.day}</span>
                    <span className="text-white font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {year} {siteConfig.company.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
