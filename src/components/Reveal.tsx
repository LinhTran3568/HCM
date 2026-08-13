import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const motionTags = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  blockquote: motion.blockquote,
  figure: motion.figure,
  li: motion.li,
  cite: motion.cite,
  small: motion.small,
  ul: motion.ul,
  em: motion.em,
  strong: motion.strong,
} as const

export type RevealTag = keyof typeof motionTags

type RevealProps = {
  children: ReactNode
  as?: RevealTag
  className?: string
  delay?: number
  y?: number
  amount?: number
  once?: boolean
}

const easeOut = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 30,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motionTags[as]

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: easeOut }}
    >
      {children}
    </MotionTag>
  )
}
