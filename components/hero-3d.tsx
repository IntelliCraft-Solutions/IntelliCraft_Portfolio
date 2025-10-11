"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { useRef } from "react"

function Torus() {
  const mesh = useRef<any>(null)
  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.15
    mesh.current.rotation.x += delta * 0.06
  })
  const colorA = "#6ca3ff" // blue
  const colorB = "#ff8a6c" // coral
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 220, 36]} />
      <meshStandardMaterial
        color={colorA}
        metalness={0.75}
        roughness={0.2}
        emissive={colorB}
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

export function Hero3DBackground() {
  // honor reduced motion
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false

  if (prefersReduced) {
    return (
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(60rem 40rem at 50% 45%, rgba(108,163,255,0.20), rgba(255,138,108,0.10) 40%, transparent 70%)",
        }}
      />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={0.6} />
        <directionalLight position={[-4, -2, 2]} intensity={0.3} />
        <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.4}>
          <Torus />
        </Float>
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
