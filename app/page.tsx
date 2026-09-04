import Navigation      from '@/components/Navigation'
import Hero            from '@/components/Hero'
import TrustStrip      from '@/components/TrustStrip'
import ServiceOverview from '@/components/ServiceOverview'
import WhyChooseUs     from '@/components/WhyChooseUs'
import Gallery         from '@/components/Gallery'
import FinalCTA        from '@/components/FinalCTA'
import Footer          from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navigation />
      <Hero />
      <TrustStrip />
      <ServiceOverview />
      <WhyChooseUs />
      <Gallery />
      <FinalCTA />
      <Footer />
    </main>
  )
}
