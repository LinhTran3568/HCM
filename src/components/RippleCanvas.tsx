import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  speed: number
  opacity: number
}

/**
 * Gentle, colorless water ripples: wherever the pointer glides, a soft white
 * band spreads slowly outward and fades — like a quiet ripple on still water.
 * No color, no rotation, no hard edges.
 */
export function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationFrameId: number
    let lastSpawn = 0
    let lastSpawnX = -1
    let lastSpawnY = -1

    const ripples: Ripple[] = []

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const spawn = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 2,
        maxRadius: 90 + Math.random() * 110,
        speed: 1.7 + Math.random() * 1.1,
        opacity: 0.4,
      })
      // Keep a bounded pool so long sessions stay cheap.
      if (ripples.length > 40) ripples.shift()
    }

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now()
      const x = e.clientX
      const y = e.clientY

      if (lastSpawnX < 0) {
        lastSpawnX = x
        lastSpawnY = y
        lastSpawn = now
        return
      }

      // Space ripples out along the path: only spawn after the pointer has
      // traveled a good distance, so there are far fewer of them.
      const dist = Math.hypot(x - lastSpawnX, y - lastSpawnY)
      if (now - lastSpawn < 120 || dist < 70) return
      lastSpawn = now
      lastSpawnX = x
      lastSpawnY = y
      spawn(x, y)
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += r.speed
        r.opacity -= 0.005

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        const crest = r.radius / r.maxRadius
        const alpha = r.opacity * (1 - crest)

        // One soft colorless band: wide, smooth falloff on both sides.
        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.maxRadius)
        const inner = Math.max(0, crest - 0.16)
        const outer = Math.min(1, crest + 0.22)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
        grad.addColorStop(inner, 'rgba(255, 255, 255, 0)')
        grad.addColorStop(crest, `rgba(255, 255, 255, ${alpha * 0.55})`)
        grad.addColorStop(outer, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.maxRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [reduce])

  if (reduce) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 6,
      }}
    />
  )
}
