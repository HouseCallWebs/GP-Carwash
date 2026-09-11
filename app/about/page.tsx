import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/FinalCTA'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/config'
import { Truck, MapPin, Clock, ShieldCheck, Droplets, Sparkles, Store } from 'lucide-react'

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.company.name}`,
  description: `GP Mobile Car Wash & Detail — drop off at our Lincoln, NE shop or we'll come to you. Same service, same price, your choice.`,
}

const values = [
  { icon: Store,       title: 'Drop Off or We Come to You', body: `Bring your vehicle to our shop at ${siteConfig.company.address.full}, or we'll come to you. It's entirely your call, and the price is exactly the same either way.` },
  { icon: Truck,       title: 'Fully Equipped',    body: 'Our mobile unit carries everything needed on-site — pressure washer, water tank, vacuums, and detailing supplies — so we’re ready wherever you are.' },
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
      <section className="relative pt-40 pb-20 overflow-hidden"
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
              GP Mobile Car Wash &amp; Detail gives you two easy ways to get your
              vehicle detailed: drop it off at our shop, or let us come straight to
              your driveway, office, or job site — anywhere within 35 miles of
              Lincoln, NE. Same service, same price, entirely your call.
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
                style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)', height: 320 }}>
                <div className="absolute inset-0 diagonal-texture opacity-60" />
                <div className="relative flex flex-col h-full">
                  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center border-b border-white/6">
                    <Store className="w-11 h-11 mb-3" style={{ color: '#FF6A00' }} strokeWidth={1.5} />
                    <div className="text-lg font-display font-bold uppercase tracking-widest text-white">
                      Drop It Off
                    </div>
                    <div className="text-slate-500 text-sm mt-1">{siteConfig.company.address.full}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <Truck className="w-11 h-11 mb-3" style={{ color: '#FF6A00' }} strokeWidth={1.5} />
                    <div className="text-lg font-display font-bold uppercase tracking-widest text-white">
                      We Come to You
                    </div>
                    <div className="text-slate-500 text-sm mt-1">Anywhere within 35 miles of Lincoln, NE</div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-xs font-display font-bold"
                  style={{ background: '#0a0a0a', color: '#FF8A3D', border: '2px solid rgba(255,106,0,0.4)' }}>
                  OR
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.05}>
                <span className="badge-accent">Your Choice, Your Convenience</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-bold text-3xl text-white uppercase mb-5">
                  Drop It Off.<br />
                  <span className="gradient-text-accent">Or We&apos;ll Come to You.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    However you&apos;d rather do it, GP Mobile has you covered. Swing by
                    our shop at {siteConfig.company.address.full} and drop off your
                    vehicle, or skip the trip entirely and let us come to you —
                    your driveway, your office, or wherever your vehicle is parked.
                  </p>
                  <p>
                    There&apos;s no upcharge either way. Pricing is exactly the same
                    whether you bring it to us or we bring the shop to you — this is
                    purely about whatever&apos;s easiest for your schedule.
                  </p>
                  <p>
                    Every package is priced by vehicle size, and RV and boat
                    detailing is priced by the foot — real numbers, right on our
                    quote page. Specialty jobs like ceramic coating and fleet
                    washing get a custom quote built around the specifics of the job.
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

      <FinalCTA />
      <Footer />
    </main>
  )
}
