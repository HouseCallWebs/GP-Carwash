'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { siteConfig } from '@/lib/config'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/quote',    label: 'Get a Quote' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/reviews',  label: 'Reviews' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-dark-900/96 backdrop-blur-md border-b border-white/6 shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
        : 'bg-dark-900/40 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo className="h-11 lg:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/"
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/4">
              Home
            </Link>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/4">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={siteConfig.company.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4" style={{ color: '#FF6A00' }} strokeWidth={2} />
              {siteConfig.company.phone}
            </a>
            <Link href="/quote" className="btn-orange px-5 py-2.5 text-sm">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-dark-850/98 backdrop-blur-md border-b border-white/6"
          >
            <div className="px-4 py-5 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link href="/" onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/4 transition-all">
                Home
              </Link>
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/4 transition-all">
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/6 mt-3">
                <a href={siteConfig.company.phoneHref} className="btn-orange w-full py-3 text-sm">
                  <Phone className="w-4 h-4" strokeWidth={2} />
                  Call {siteConfig.company.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
