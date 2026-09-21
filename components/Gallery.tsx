'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'

interface GalleryProps {
  showHeader?: boolean
}

export default function Gallery({ showHeader = true }: GalleryProps) {
  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 diagonal-texture opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(255,106,0,0.04)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {showHeader && (
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="badge-accent">Before &amp; After</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-bold text-section text-white uppercase mb-5">
                The Proof Is in{' '}
                <span className="gradient-text-accent">the Shine.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Drag the sliders below to see real before &amp; after results. More
                photos are added after every job.
              </p>
            </ScrollReveal>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.beforeAfterPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <BeforeAfterSlider
                beforeSrc={photo.beforeSrc}
                afterSrc={photo.afterSrc}
                label={photo.label}
              />
            </motion.div>
          ))}
          {siteConfig.photoGalleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <h3 className="text-sm font-bold text-white">{item.label}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,106,0,0.1)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.15)' }}>
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
