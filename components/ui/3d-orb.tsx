"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"

type GlobeProps = {
  mode?: "background" | "contained"
  className?: string
}

export default function Globe({ mode = "background", className }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const getSize = () => {
      if (mode === "contained" && mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current
        return { w: Math.max(1, clientWidth), h: Math.max(1, clientHeight) }
      }
      return { w: window.innerWidth, h: window.innerHeight }
    }

    const { w: startW, h: startH } = getSize()
    const camera = new THREE.PerspectiveCamera(75, startW / startH, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(startW, startH)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Starfield removed - keeping only globe components

    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const atmosphereFragmentShader = `
     uniform vec3 glowColor;
     varying vec3 vNormal;
     void main() {
       float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
       gl_FragColor = vec4(glowColor, 1.0) * intensity;
     }
   `
    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 32, 32)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        glowColor: { value: new Color(0x3a86ff) },
      },
    })
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphereMesh)

    const wireframeGeometry = new THREE.SphereGeometry(5, 32, 32)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3a86ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const wireframeGlobe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframeGlobe)

    const solidGeometry = new THREE.SphereGeometry(4.9, 64, 64)
    const solidMaterial = new THREE.MeshPhongMaterial({ color: 0x1a237e, transparent: true, opacity: 0 })
    const solidGlobe = new THREE.Mesh(solidGeometry, solidMaterial)
    scene.add(solidGlobe)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 10

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = mode === "contained"
    controls.enableZoom = mode === "contained"
    controls.autoRotate = mode === "background"
    controls.autoRotateSpeed = 0.25

    const colors = [new Color(0x3a86ff), new Color(0x8338ec), new Color(0xff006e), new Color(0xfb5607), new Color(0xffbe0b)]
    let colorIndex = 0
    let nextColorIndex = 1
    let colorT = 0
    const colorTransitionSpeed = 0.005
    const lerpColor = (a: Color, b: Color, t: number) => {
      const c = new Color()
      c.r = a.r + (b.r - a.r) * t
      c.g = a.g + (b.g - a.g) * t
      c.b = a.b + (b.b - a.b) * t
      return c
    }

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      colorT += colorTransitionSpeed
      if (colorT >= 1) {
        colorT = 0
        colorIndex = nextColorIndex
        nextColorIndex = (nextColorIndex + 1) % colors.length
      }
      const currentColor = lerpColor(colors[colorIndex], colors[nextColorIndex], colorT)
      if (wireframeGlobe.material instanceof THREE.MeshBasicMaterial) wireframeGlobe.material.color = currentColor
      if (solidGlobe.material instanceof THREE.MeshPhongMaterial) solidGlobe.material.color = currentColor
      if (atmosphereMesh.material instanceof THREE.ShaderMaterial)
        atmosphereMesh.material.uniforms.glowColor.value = currentColor

      wireframeGlobe.rotation.y += 0.001
      solidGlobe.rotation.y += 0.001
      atmosphereMesh.rotation.y += 0.0005

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Load high-resolution textures with fallback to CDN
    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (url: string) => new Promise<THREE.Texture>((resolve, reject) => {
      textureLoader.load(url, (t) => resolve(t), undefined, reject)
    })
    
    // Try local textures first, fallback to CDN
    const textureUrls = [
      "/earth-texture-compressed.jpg",
      "/earth-bump-compressed.jpg", 
      "/earth-specular-compressed.jpg"
    ]
    
    const cdnUrls = [
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
      "https://unpkg.com/three-globe/example/img/earth-water.png"
    ]
    
    const loadTexturesWithFallback = async () => {
      try {
        // Try local textures first
        const textures = await Promise.all(textureUrls.map(url => loadTexture(url)))
        return textures
      } catch {
        // Fallback to CDN
        return Promise.all(cdnUrls.map(url => loadTexture(url)))
      }
    }
    
    loadTexturesWithFallback().then(([texture, bumpMap, specularMap]) => {
      const highResMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap,
        bumpScale: 0.05,
        specularMap,
        specular: new THREE.Color("grey"),
        transparent: true,
        opacity: 0,
      })
      const transitionDuration = 1
      const startTime = Date.now()
      const transitionToHighRes = () => {
        const elapsedTime = (Date.now() - startTime) / 1000
        const progress = Math.min(elapsedTime / transitionDuration, 1)
        solidGlobe.material = highResMaterial
        ;(solidGlobe.material as THREE.Material & { opacity?: number }).opacity = progress
        wireframeMaterial.opacity = 0.5 * (1 - progress)
        if (progress < 1) requestAnimationFrame(transitionToHighRes)
        else scene.remove(wireframeGlobe)
        renderer.render(scene, camera)
      }
      transitionToHighRes()
    }).catch(() => {
      // Keep wireframe if all texture loading fails
      console.log("Earth textures failed to load, keeping wireframe")
    })

    const handleResize = () => {
      const { w, h } = getSize()
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose()
    }
  }, [])

  if (mode === "contained") {
    return (
      <div className={className}>
        <div ref={mountRef} className="absolute inset-0" />
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none select-none opacity-60 ${className ?? ""}`}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}


