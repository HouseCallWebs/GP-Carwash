import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/FinalCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'
import { Truck, MapPin, Clock, ShieldCheck, Droplets, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.company.name}`,
  description: `GP Mobile Car Wash & Detail brings full-service detailing straight to you, anywhere within a 35-mile radius of Lincoln, NE.`,
}

const values = [
  { icon: Truck,       title: 'Fully Mobile',      body: 'Our equipment travels with us — pressure washer, water tank, vacuums, and detailing supplies. All we need is a parking spot.' },
  { icon: MapPin,      title: '35-Mile Radius',    body: 'Based in Lincoln, we serve homes, offices, and job sites throughout the metro and surrounding communities.' },
  { icon: Clock,       title: 'Flexible Hours',    body: 'Weekday appointments Monday through Friday, 8am to 4pm, with Saturday availability by appointment.' },
  { icon: Droplets,    title: 'Every Vehicle Size', body: 'From compact sedans to full-size trucks and 3-row SUVs, our packages are priced by vehicle size so you know exactly what to expect.' },
  { icon: Sparkles,    title: 'Detail-First Approach', body: 'Whether it is a quick exterior wash or a full buff and seal, we take the same care on every vehicle we touch.' },
  { icon: ShieldCheck, title: 'Straightforward Pricing', body: 'Package pricing is published up front. Specialty jobs like ceramic coating or fleet work get a custom quote before we start.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.05)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="badge-accent">About Us</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-section text-white uppercase mb-6">
              Mobile Detailing.{' '}
              <span className="gradient-text-accent">We Come to You.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              GP Mobile Car Wash &amp; Detail brings the full car wash and detail shop
              experience directly to your driveway, your office parking lot, or
              wherever your vehicle happens to be parked — anywhere within 35 miles
              of Lincoln, NE.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 overflow-hidden" style={{ background: '#0f0f0f' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden border border-white/6"
                style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)', minHeight: 320 }}>
                <div className="absolute inset-0 diagonal-texture opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <Truck className="w-14 h-14 mx-auto mb-4" style={{ color: '#FF6A00' }} strokeWidth={1.5} />
                    <div className="text-xl font-display font-bold uppercase tracking-widest text-white">
                      35-Mile Service Area
                    </div>
                    <div className="text-slate-500 text-sm mt-1">Centered on Lincoln, NE</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.05}>
                <span className="badge-accent">Mobile by Design</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-bold text-3xl text-white uppercase mb-5">
                  No Drop-Off.<br />
                  <span className="gradient-text-accent">No Waiting Room.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    A traditional car wash means driving there, waiting around, and
                    driving back. GP Mobile flips that around — we load up our
                    equipment and come to you, wherever that is.
                  </p>
                  <p>
                    Whether your vehicle is parked at home, at the office, or on a job
                    site, we set up on location and get to work. You keep your day
                    moving while your vehicle gets the attention it needs.
                  </p>
                  <p>
                    Every package is priced by vehicle size so pricing stays clear
                    from the start, and specialty jobs like ceramic coating, fleet
                    washing, and RV or boat detailing get a custom quote built around
                    the specifics of the job.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="badge-accent">What We Stand For</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl text-white uppercase">
                How We <span className="gradient-text-accent">Work</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 0.08}>
                <div className="card-shine p-6 rounded-2xl border border-white/6 bg-card-gradient hover:shadow-card-hover transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.15)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#FF6A00' }} strokeWidth={1.8} />
                  </div>
                  <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: '#FF6A00' }} />
                  <h3 className="font-display font-bold text-base text-white uppercase mb-2 tracking-wide">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* License / certification placeholder */}
      <section className="py-8 border-y border-white/5" style={{ background: '#0f0f0f' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            License &amp; certification badges — coming soon ·{' '}
            Serving Lincoln, NE and a 35-mile radius
          </p>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  )
}
