"use client"

import { useEffect, useMemo, useRef, useState } from "react"

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mql.matches)
    onChange()
    mql.addEventListener?.("change", onChange)
    return () => mql.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

export function InteractiveOrb() {
  const prefersReduced = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const orb = orbRef.current
    if (!container || !orb || prefersReduced) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let rotX = 0
    let rotY = 0

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      targetX = nx
      targetY = ny
    }

    const loop = () => {
      rotX += (targetY * -12 - rotX) * 0.08
      rotY += (targetX * 18 - rotY) * 0.08
      orb.style.transform = `translateZ(0) rotateX(${rotX}deg) rotateY(${rotY}deg)`
      raf = requestAnimationFrame(loop)
    }

    container.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener("mousemove", onMove)
    }
  }, [prefersReduced])

  const bg = useMemo(
    () =>
      "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.55), transparent 45%)," +
      "radial-gradient(circle at 70% 70%, rgba(236,72,153,0.5), transparent 40%)," +
      "conic-gradient(from 0deg, rgba(168,85,247,0.6), rgba(236,72,153,0.6), rgba(168,85,247,0.6))",
    []
  )

  return (
    <div ref={containerRef} className="absolute inset-0 grid place-items-center">
      <div className="relative w-[70%] max-w-[28rem] aspect-square">
        <div
          ref={orbRef}
          className="w-full h-full rounded-full shadow-2xl"
          style={{
            background: bg,
            filter: "saturate(120%) blur(0.2px)",
            boxShadow:
              "0 30px 80px rgba(168,85,247,0.25), 0 10px 30px rgba(236,72,153,0.25)",
            transition: prefersReduced ? "transform 200ms ease" : undefined,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.08), rgba(255,255,255,0) 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  )
}

export default InteractiveOrb


