"use client"

import { useEffect, useRef } from "react"

export function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Add subtle animation to the circuit lines
    const animateCircuit = () => {
      const paths = svg.querySelectorAll('.circuit-path')
      paths.forEach((path, index) => {
        const element = path as SVGPathElement
        element.style.animationDelay = `${index * 0.1}s`
      })
    }

    animateCircuit()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-35 dark:opacity-45"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Violet to magenta gradient */}
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b84eff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff6bff" stopOpacity="0.5" />
          </linearGradient>
          
          {/* Glow filter for the circuit lines */}
          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Node glow filter */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central hub and main circuit pattern */}
        <g className="circuit-network">
          {/* Central hub */}
          <circle
            cx="600"
            cy="400"
            r="8"
            fill="url(#circuitGradient)"
            filter="url(#nodeGlow)"
            className="animate-pulse"
          />
          
          {/* Main circuit paths radiating from center */}
          <path
            d="M 600 400 L 200 200 L 100 100"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          
          <path
            d="M 600 400 L 1000 200 L 1100 100"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.2s' }}
          />
          
          <path
            d="M 600 400 L 200 600 L 100 700"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '2.8s' }}
          />
          
          <path
            d="M 600 400 L 1000 600 L 1100 700"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.5s' }}
          />
          
          {/* Horizontal and vertical main trunks */}
          <path
            d="M 600 400 L 300 400 L 200 400"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '2.5s' }}
          />
          
          <path
            d="M 600 400 L 900 400 L 1000 400"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '2.7s' }}
          />
          
          <path
            d="M 600 400 L 600 250 L 600 150"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.1s' }}
          />
          
          <path
            d="M 600 400 L 600 550 L 600 650"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '2.9s' }}
          />
          
          {/* Diagonal branches */}
          <path
            d="M 600 400 L 450 300 L 350 250"
            stroke="url(#circuitGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.3s' }}
          />
          
          <path
            d="M 600 400 L 750 300 L 850 250"
            stroke="url(#circuitGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.4s' }}
          />
          
          <path
            d="M 600 400 L 450 500 L 350 550"
            stroke="url(#circuitGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '2.6s' }}
          />
          
          <path
            d="M 600 400 L 750 500 L 850 550"
            stroke="url(#circuitGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#circuitGlow)"
            className="circuit-path animate-pulse"
            style={{ animationDuration: '3.6s' }}
          />
          
          {/* Secondary connection nodes */}
          <circle cx="200" cy="200" r="4" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.8s' }} />
          <circle cx="1000" cy="200" r="4" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
          <circle cx="200" cy="600" r="4" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
          <circle cx="1000" cy="600" r="4" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
          <circle cx="300" cy="400" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.7s' }} />
          <circle cx="900" cy="400" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.1s' }} />
          <circle cx="600" cy="250" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.9s' }} />
          <circle cx="600" cy="550" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.3s' }} />
          
          {/* Edge nodes */}
          <circle cx="100" cy="100" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.4s' }} />
          <circle cx="1100" cy="100" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.7s' }} />
          <circle cx="100" cy="700" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.6s' }} />
          <circle cx="1100" cy="700" r="3" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.4s' }} />
          <circle cx="600" cy="150" r="2" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.8s' }} />
          <circle cx="600" cy="650" r="2" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
          <circle cx="200" cy="400" r="2" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
          <circle cx="1000" cy="400" r="2" fill="url(#circuitGradient)" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDuration: '3.6s' }} />
        </g>
      </svg>
    </div>
  )
}
