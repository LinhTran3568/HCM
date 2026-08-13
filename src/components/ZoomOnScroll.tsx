import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ZoomOnScrollProps = {
  children: ReactNode
  className?: string
  /** Start scale (default 1.1) — scrubs down to 1 as the element passes. */
  zoom?: number
}

/**
 * Scroll-scrubbed "camera push-in": the element starts slightly zoomed in
 * while below the viewport and settles to its natural size as it scrolls
 * into view. Meant for frames with `overflow: hidden`.
 */
export function ZoomOnScroll({ children, className = '', zoom = 1.1 }: ZoomOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.7], [zoom, 1])

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { scale }}>
      {children}
    </motion.div>
  )
}
