"use client"

import { useEffect, useRef } from "react"

type TokenBridgeCanvasProps = {
  tokenCount?: number
  speed?: number
}

type Token = {
  t: number // param along the loop [0,1)
  rot: number // rotation in radians
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function TokenBridgeCanvas({ tokenCount = 6, speed = 0.06 }: TokenBridgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const tokens: Token[] = new Array(tokenCount).fill(0).map((_, i) => ({
      t: (i / tokenCount) % 1,
      rot: Math.random() * Math.PI * 2,
    }))

    let width = 0
    let height = 0

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    resize()
    window.addEventListener("resize", resize)

    // Path control points in normalized space
    function upperPath(xn: number) {
      // Bezier along top, slight slope
      const p0 = { x: 0.08, y: 0.28 }
      const p1 = { x: 0.38, y: 0.24 }
      const p2 = { x: 0.62, y: 0.22 }
      const p3 = { x: 0.92, y: 0.26 }
      const t = xn
      const x = (1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t * t * p2.x + t ** 3 * p3.x
      const y = (1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t * t * p2.y + t ** 3 * p3.y
      return { x: x * width, y: y * height }
    }

    function lowerPath(xn: number) {
      const p0 = { x: 0.12, y: 0.78 }
      const p1 = { x: 0.42, y: 0.74 }
      const p2 = { x: 0.66, y: 0.70 }
      const p3 = { x: 0.92, y: 0.74 }
      const t = xn
      const x = (1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t * t * p2.x + t ** 3 * p3.x
      const y = (1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t * t * p2.y + t ** 3 * p3.y
      return { x: x * width, y: y * height }
    }

    const portal = { x: 0.5, y: 0.5 }

    function drawBridge() {
      // upper
      ctx.save()
      ctx.strokeStyle = "rgba(255,255,255,0.08)"
      ctx.lineWidth = Math.max(10, height * 0.06)
      ctx.lineCap = "round"
      ctx.beginPath()
      for (let i = 0; i <= 60; i++) {
        const p = upperPath(i / 60)
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
      ctx.restore()

      // lower
      ctx.save()
      ctx.strokeStyle = "rgba(255,255,255,0.08)"
      ctx.lineWidth = Math.max(10, height * 0.06)
      ctx.lineCap = "round"
      ctx.beginPath()
      for (let i = 0; i <= 60; i++) {
        const p = lowerPath(i / 60)
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
      ctx.restore()
    }

    function drawPortal() {
      const x = portal.x * width
      const y = portal.y * height
      const r = Math.min(width, height) * 0.12
      const grd = ctx.createRadialGradient(x, y, 2, x, y, r)
      grd.addColorStop(0, "rgba(236,72,153,0.55)")
      grd.addColorStop(0.6, "rgba(168,85,247,0.25)")
      grd.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "rgba(236,72,153,0.7)"
      ctx.lineWidth = 2
      ctx.shadowColor = "rgba(236,72,153,0.8)"
      ctx.shadowBlur = 20
      ctx.beginPath()
      ctx.arc(x, y, r * 0.55, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    function drawCoin(x: number, y: number, r: number, progressed: boolean, rot: number) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      // rim
      ctx.beginPath()
      const grad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r)
      if (progressed) {
        grad.addColorStop(0, "#f0abfc")
        grad.addColorStop(0.7, "#a855f7")
        grad.addColorStop(1, "#6b21a8")
      } else {
        grad.addColorStop(0, "#94a3b8")
        grad.addColorStop(0.7, "#334155")
        grad.addColorStop(1, "#0f172a")
      }
      ctx.fillStyle = grad
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()

      // inner circle
      ctx.beginPath()
      ctx.fillStyle = progressed ? "rgba(10,7,20,0.9)" : "rgba(9,12,20,0.9)"
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2)
      ctx.fill()

      // emblem
      ctx.lineWidth = r * 0.18
      ctx.lineCap = "round"
      ctx.strokeStyle = progressed ? "#f0abfc" : "#b6c3d1"
      ctx.beginPath()
      if (progressed) {
        // check mark
        ctx.moveTo(-r * 0.35, 0)
        ctx.lineTo(-r * 0.05, r * 0.3)
        ctx.lineTo(r * 0.38, -r * 0.28)
      } else {
        // ring
        ctx.arc(0, 0, r * 0.28, Math.PI * 0.25, Math.PI * 1.75)
      }
      ctx.stroke()

      // glow
      if (progressed) {
        ctx.shadowColor = "rgba(236,72,153,0.45)"
        ctx.shadowBlur = 24
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(236,72,153,0.2)"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.restore()
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height)
      drawBridge()
      drawPortal()

      const coinR = Math.min(width, height) * 0.035

      for (const coin of tokens) {
        if (!prefersReduced) coin.t = (coin.t + speed / 600 * Math.max(16, width)) % 1

        // piecewise path: upper roll (0..0.38), drop (0.38..0.58), lower roll (0.58..1)
        let x = 0, y = 0, progressed = false
        let phase = 0
        if (coin.t < 0.38) {
          phase = coin.t / 0.38
          const p = upperPath(phase)
          x = p.x; y = p.y
          coin.rot -= 0.22
        } else if (coin.t < 0.58) {
          const tt = (coin.t - 0.38) / 0.20
          const e = easeInOut(tt)
          const from = upperPath(0.5)
          const to = lowerPath(0.1)
          x = from.x + (to.x - from.x) * e
          y = from.y + (to.y - from.y) * e
          coin.rot -= 0.24
          progressed = tt > 0.2 // becomes converted mid drop
        } else {
          const tt = (coin.t - 0.58) / 0.42
          const p = lowerPath(tt)
          x = p.x; y = p.y
          coin.rot -= 0.26
          progressed = true
        }

        drawCoin(x, y, coinR, progressed, coin.rot)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [tokenCount, speed])

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}


