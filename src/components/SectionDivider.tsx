import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as const

const CLOUD_W = 1440

/** Builds an SVG path: solid cream band at the top, scalloped cloud puffs
 *  hanging below it that fade into transparency. */
function buildCloudsPath() {
  let d = `M0 0 L${CLOUD_W} 0 L${CLOUD_W} 18 L0 18 Z M0 18 `
  let x = -30
  let i = 0
  while (x < CLOUD_W + 60) {
    const w = 64 + (i % 3) * 26
    d += `L${x} 18 A${w / 2} ${w / 2} 0 0 1 ${x + w} 18 `
    x += w * 0.6
    i++
  }
  d += `L${CLOUD_W} 90 L0 90 Z`
  return d
}

/**
 * Decorative divider placed at the top of a section's background: a soft
 * cream cloud band (solid at the very top edge to cover the seam with the
 * previous section) that fades into the photo below.
 */
export function SectionDivider() {
  const gradId = `divider-cloud-${useId().replace(/:/g, '')}`
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="section-divider"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, y: -14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: easeOut }}
    >
      <svg
        className="divider-clouds"
        viewBox={`0 0 ${CLOUD_W} 90`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF6EE" />
            <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={buildCloudsPath()} fill={`url(#${gradId})`} />
      </svg>
    </motion.div>
  )
}
