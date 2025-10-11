"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const speedRef = useRef(0.9)
  const phaseRef = useRef(0)
  const mouseYRef = useRef(0)
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMouse = (e: MouseEvent) => {
      mouseYRef.current = e.clientY / window.innerHeight
    }
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const p = Math.min(Math.max(window.scrollY / max, 0), 1)
      const eased = 1 - Math.pow(1 - p, 1.3)
      let target = Math.max(0.06, 1 - 0.94 * eased) // top ≈1 → bottom ≈0.06
      if (p > 0.985) target = 0.045 // extra calm at absolute bottom
      // ease towards target
      speedRef.current += (target - speedRef.current) * 0.06
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("scroll", onScroll)

    let raf = 0
    const draw = () => {
      if (!ctx) return
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // subtle vignette background
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.9)
      bg.addColorStop(0, "rgba(10,12,18,0.65)")
      bg.addColorStop(1, "rgba(6,7,10,0.9)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Aurora ribbons
      const ribbons = 4
      for (let i = 0; i < ribbons; i++) {
        const t = phaseRef.current * (0.6 + i * 0.08)
        const baseY = h * (0.25 + 0.18 * i) + (mouseYRef.current - 0.5) * 24
        const amp = 26 + i * 10
        const freq = 0.003 + i * 0.0007

        const grad = ctx.createLinearGradient(0, baseY - amp, w, baseY + amp)
        // deep blue to coral mixing with transparency
        grad.addColorStop(0, "rgba(70,120,255,0.10)")
        grad.addColorStop(0.5, i % 2 === 0 ? "rgba(255,120,100,0.12)" : "rgba(120,180,255,0.12)")
        grad.addColorStop(1, "rgba(50,90,220,0.08)")

        ctx.lineWidth = 1.5 + i * 0.6
        ctx.strokeStyle = grad
        ctx.beginPath()

        for (let x = 0; x <= w; x += 6) {
          const y = baseY + Math.sin(x * freq + t) * amp * (1 - i * 0.08)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // soft glow under each ribbon
        ctx.save()
        ctx.globalCompositeOperation = "lighter"
        ctx.shadowColor = i % 2 === 0 ? "rgba(255,120,100,0.12)" : "rgba(120,180,255,0.12)"
        ctx.shadowBlur = 24 + i * 4
        ctx.beginPath()
        ctx.moveTo(0, baseY)
        ctx.lineTo(w, baseY)
        ctx.stroke()
        ctx.restore()
      }

      if (!reduceMotion) {
        phaseRef.current += 0.8 * speedRef.current
      }
      raf = requestAnimationFrame(draw)
    }

    draw()
    onScroll()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ height: "100vh" }}
      aria-hidden="true"
    />
  )
}
