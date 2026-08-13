import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** Vertical drift in percent of the layer's own height (default 14). */
  drift?: number
  /** When set, the layer also scales from this value down to 1 as it passes. */
  zoom?: number
}

/**
 * Wraps content so it drifts vertically slower than the page scroll,
 * creating a background-depth effect. The wrapper must be given extra
 * vertical overscan via CSS (e.g. `.parallax-bg-layer`'s negative insets)
 * so no gaps appear while it translates.
 */
export function Parallax({ children, className = '', drift = 14, zoom }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Background lag: at the start of the pass the layer is pulled up slightly,
  // at the end pushed down, so it crosses the viewport slower than the page.
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`])
  // Entry-weighted zoom: the photo starts most zoomed in as the section
  // arrives and settles to its natural size halfway through — a cinematic
  // push-in whenever a new background enters.
  const scale = useTransform(scrollYProgress, [0, 0.55], [zoom ?? 1, 1])

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { y, ...(zoom ? { scale } : {}) }}
        className="parallax-inner"
      >
        {children}
      </motion.div>
    </div>
  )
}
