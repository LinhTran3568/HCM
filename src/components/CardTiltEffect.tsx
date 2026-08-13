import { useEffect } from 'react'

const CARD_SELECTOR = '.book-card-frame'
const MAX_TILT = 6
const HOVER_TRANSITION = 'transform 0.12s ease-out'
const RESET_TRANSITION = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Site-wide 3D tilt for every `.book-card-frame` card.
 * The card gently rotates toward the pointer and lifts slightly;
 * it springs back when the pointer leaves.
 * Disabled for `prefers-reduced-motion` and touch devices (hover: none).
 */
export function CardTiltEffect() {
  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqHover = window.matchMedia('(hover: hover)')
    if (mqReduce.matches || !mqHover.matches) return

    let current: HTMLElement | null = null
    let raf = 0
    let resetTimer = 0

    const release = (card: HTMLElement) => {
      card.style.transition = RESET_TRANSITION
      card.style.transform = ''
      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        card.style.transition = ''
      }, 620)
    }

    const onPointerMove = (e: MouseEvent) => {
      const target = e.target as Element | null
      cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(() => {
        const card = target ? (target.closest(CARD_SELECTOR) as HTMLElement | null) : null

        // Pointer left the previous card → let it spring back.
        if (current && current !== card) release(current)
        if (!card) {
          current = null
          return
        }

        const rect = card.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
        const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
        const rx = (0.5 - py) * MAX_TILT
        const ry = (px - 0.5) * MAX_TILT

        card.style.transition = HOVER_TRANSITION
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-5px)`
        current = card
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      if (current) release(current)
      current = null
    }

    document.addEventListener('mousemove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onPointerMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      window.clearTimeout(resetTimer)
    }
  }, [])

  return null
}
