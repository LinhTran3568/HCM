import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type BgRevealProps = {
  children: ReactNode
}

/* Ease used to shape the scroll progress so the bloom feels organic. */
function easeInOutCubic(v: number) {
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2
}

/**
 * "Golden bloom" reveal for full-bleed section backgrounds.
 * As the section scrolls into view the photo opens from the center like a
 * lotus / water ripple (iris clip-path), while a glowing gold ring expands
 * along the leading edge. The new background scene literally blossoms out of
 * the page seam instead of sitting statically next to the previous photo.
 */
export function BgReveal({ children }: BgRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.55'],
  })

  const bloomClip = useTransform(scrollYProgress, (v) => {
    const e = easeInOutCubic(Math.min(Math.max(v, 0), 1))
    return `circle(${(3 + e * 150).toFixed(2)}% at 50% 50%)`
  })

  const layerOpacity = useTransform(scrollYProgress, (v) => 0.55 + 0.45 * easeInOutCubic(v))
  const layerScale = useTransform(scrollYProgress, (v) => 1.06 - 0.06 * easeInOutCubic(v))

  const ringScale = useTransform(scrollYProgress, (v) => 0.4 + easeInOutCubic(v) * 11)
  const ringOpacity = useTransform(scrollYProgress, (v) => {
    const p = Math.min(Math.max(v, 0), 1)
    if (p < 0.8) return Math.min(1, p * 2.4)
    return Math.max(0, (1 - p) / 0.2)
  })

  return (
    <>
      <motion.div
        ref={ref}
        className="section-bg-image-layer"
        aria-hidden="true"
        style={
          reduce
            ? undefined
            : {
                clipPath: bloomClip,
                opacity: layerOpacity,
                scale: layerScale,
                willChange: 'clip-path, transform, opacity',
              }
        }
      >
        {children}
      </motion.div>
      {!reduce && (
        <motion.div
          className="bg-bloom-ring"
          style={{ scale: ringScale, opacity: ringOpacity, x: '-50%', y: '-50%' }}
        />
      )}
    </>
  )
}
