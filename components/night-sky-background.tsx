"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function NightSkyBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 15000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Add subtle rotation to stars
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0002
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none select-none">
      <div ref={mountRef} className="absolute inset-0" />
      {/* Merge with existing gradient effects */}
      <div className="absolute inset-0 gradient-purple opacity-15" />
      <div className="absolute inset-0 gradient-pink opacity-10" />
    </div>
  )
}
