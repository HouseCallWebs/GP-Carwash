'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeSrc:  string
  afterSrc:   string
  label:      string
  beforeAlt?: string
  afterAlt?:  string
  className?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  label,
  beforeAlt = `${label} — before`,
  afterAlt  = `${label} — after`,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  function handlePointerDown(e: React.PointerEvent) {
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return
    updateFromClientX(e.clientX)
  }

  function handlePointerUp(e: React.PointerEvent) {
    setDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft')  setPosition(p => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + 5))
    if (e.key === 'Home')       setPosition(0)
    if (e.key === 'End')        setPosition(100)
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* After image — full base layer */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover pointer-events-none"
          priority={false}
        />

        {/* Before image — clipped to the slider position */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Before / After tags */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-widest pointer-events-none"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>
          BEFORE
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-widest pointer-events-none"
          style={{ background: 'rgba(255,106,0,0.15)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.25)' }}>
          AFTER
        </div>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
          style={{ left: `${position}%`, background: '#FF6A00', boxShadow: '0 0 12px rgba(255,106,0,0.7)' }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${label} before/after comparison slider`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            left: `${position}%`,
            background: '#FF6A00',
            boxShadow: '0 2px 14px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,106,0,0.18)',
          }}
        >
          <ArrowLeftRight className="w-4 h-4 text-black" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <h3 className="text-sm font-bold text-white">{label}</h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(255,106,0,0.1)', color: '#FF8A3D', border: '1px solid rgba(255,106,0,0.15)' }}>
          Drag to compare
        </span>
      </div>
    </div>
  )
}
