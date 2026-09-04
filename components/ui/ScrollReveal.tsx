'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children:   ReactNode
  direction?: Direction
  delay?:     number
  duration?:  number
  distance?:  number
  className?: string
}

const map: Record<Direction, Record<string, number | string>> = {
  up:    { y: 36 },
  down:  { y: -36 },
  left:  { x: 48 },
  right: { x: -48 },
  none:  {},
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay     = 0,
  duration  = 0.65,
  distance,
  className,
}: ScrollRevealProps) {
  const initial: Record<string, number | string> = { opacity: 0, ...map[direction] }

  if (distance !== undefined) {
    if (direction === 'up')    initial.y = distance
    if (direction === 'down')  initial.y = -distance
    if (direction === 'left')  initial.x = distance
    if (direction === 'right') initial.x = -distance
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
