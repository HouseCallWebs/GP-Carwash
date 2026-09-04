'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink, Quote } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'

const reviews = [
  {
    name: 'Google Reviewer',
    text: 'I had an absolutely wonderful experience with GP Mobile Car Wash and the owner Nelson. He was incredibly kind and accommodating from start to finish. I surprised my mom by having her car fully detailed as a gift and the results were beyond perfect.',
  },
  {
    name: 'Krista Marie Couton',
    text: "Absolutely thrilled with my interior detail. My car looks fresh off the lot! Wendy and Karen really knocked it out of the park. All the dog hair that I could never vacuum out of the seats is gone and they're fresh as can be.",
  },
  {
    name: 'Google Reviewer',
    text: "This was my first time getting my car buffed and waxed. Looks like a brand new car! I'm so satisfied and happy. I will definitely keep going back and will recommend anyone and my family too.",
  },
  {
    name: 'Google Reviewer',
    text: "GP mobile detailing is the best!!! My 2018 car looks brand new. It was full of dog hair and there isn't a strand to be found. Prompt and friendly.",
  },
  {
    name: 'Google Reviewer',
    text: 'I have had 2 cars detailed and was very happy with the results! I recommend this business to friends and will not hesitate to use this service in the future.',
  },
]

function Stars({ size = 'w-4 h-4' }: { size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={size} style={{ color: '#FF6A00', fill: '#FF6A00' }} />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0f0f0f' }}>
      <div className="absolute inset-0 diagonal-texture opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.04)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="badge-accent">Customer Reviews</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center mb-3">
              <Stars size="w-6 h-6" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display font-bold text-section text-white uppercase mb-3">
              {siteConfig.reviews.rating} <span className="gradient-text-accent">Out of 5</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-slate-400 text-lg">
              Based on {siteConfig.reviews.count} Google Reviews
            </p>
          </ScrollReveal>
        </div>

        {/* Review cards — swipeable row */}
        <ScrollReveal delay={0.2}>
          <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {reviews.map((r, i) => (
              <motion.div
                key={`${r.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-shine flex-shrink-0 w-[85%] sm:w-[340px] snap-start p-6 rounded-2xl border border-white/6 bg-card-gradient hover:border-white/12 hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <Stars />
                  <Quote className="w-6 h-6 flex-shrink-0" style={{ color: 'rgba(255,106,0,0.25)' }} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-sm font-semibold text-white">{r.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,106,0,0.1)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.15)' }}>
                    via Google
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="text-center mt-6">
          <a
            href={siteConfig.reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3.5 text-sm inline-flex"
          >
            See All Reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
