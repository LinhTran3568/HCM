import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  petalType: number
}

export function LotusPetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate falling lotus petals
    const count = Math.min(28, Math.floor(width / 50))
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 14,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: -0.4 + Math.random() * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.35 + Math.random() * 0.45,
      petalType: Math.floor(Math.random() * 3),
    }))

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity

      // Soft pink lotus petal gradient
      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size)
      grad.addColorStop(0, 'rgba(242, 168, 187, 0.95)') // Soft pink top
      grad.addColorStop(0.6, 'rgba(235, 130, 155, 0.85)') // Lotus pink middle
      grad.addColorStop(1, 'rgba(215, 90, 120, 0.75)') // Deep petal base

      ctx.fillStyle = grad
      ctx.beginPath()

      // Organic lotus petal curve shape
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.4, p.size * 0.65, p.size * 0.6, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.65, p.size * 0.6, -p.size * 0.75, -p.size * 0.4, 0, -p.size)
      ctx.closePath()
      ctx.fill()

      // Center subtle vein line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, -p.size * 0.8)
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.7)
      ctx.stroke()

      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i]
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.5
        p.rotation += p.rotationSpeed

        if (p.y > height + 20) {
          p.y = -20
          p.x = Math.random() * width
        }
        if (p.x > width + 20) {
          p.x = -20
        } else if (p.x < -20) {
          p.x = width + 20
        }

        drawPetal(p)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [reduce])

  if (reduce) return null

  return (
    <canvas
      ref={canvasRef}
      className="lotus-petals-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}
