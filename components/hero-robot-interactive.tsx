"use client"

import { useEffect, useRef, useState } from "react"
import { SplineScene } from "@/components/ui/splite"

type BodyPart = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'

type Reaction = {
  animation: string
  sound?: string
  duration: number
  message: string
}

const reactions: Record<BodyPart, Reaction> = {
  head: {
    animation: 'startle',
    sound: 'soft-beep',
    duration: 800,
    message: "😮 Ouch! That tickles!"
  },
  torso: {
    animation: 'lean-back',
    sound: 'gentle-chime',
    duration: 600,
    message: "💫 Hey! Be gentle!"
  },
  leftArm: {
    animation: 'recoil-left',
    sound: 'quick-tone',
    duration: 500,
    message: "🤖 Careful there!"
  },
  rightArm: {
    animation: 'recoil-right',
    sound: 'quick-tone',
    duration: 500,
    message: "🤖 Careful there!"
  },
  leftLeg: {
    animation: 'step-adjust',
    sound: 'soft-click',
    duration: 400,
    message: "⚡ Oops! That's sensitive!"
  },
  rightLeg: {
    animation: 'step-adjust',
    sound: 'soft-click',
    duration: 400,
    message: "⚡ Oops! That's sensitive!"
  }
}

export function HeroRobotInteractive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReacting, setIsReacting] = useState(false)
  const [lastReaction, setLastReaction] = useState<BodyPart | null>(null)
  const [cooldown, setCooldown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Generate contextual sounds
  const playSound = (soundType: string) => {
    if (!audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Different frequencies for different sounds
    const frequencies: Record<string, number> = {
      'soft-beep': 800,
      'gentle-chime': 600,
      'quick-tone': 1000,
      'soft-click': 400
    }
    
    oscillator.frequency.setValueAtTime(frequencies[soundType] || 500, ctx.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  }

  const handleClick = (bodyPart: BodyPart, event: React.MouseEvent) => {
    if (cooldown || isReacting) return
    
    event.stopPropagation()
    setCooldown(true)
    setIsReacting(true)
    setLastReaction(bodyPart)
    setShowMessage(true)
    
    const reaction = reactions[bodyPart]
    if (reaction.sound) {
      playSound(reaction.sound)
    }
    
    // Reset after reaction duration
    setTimeout(() => {
      setIsReacting(false)
      setLastReaction(null)
    }, reaction.duration)
    
    // Hide message after a delay
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
    
    // Cooldown period
    setTimeout(() => {
      setCooldown(false)
    }, 500)
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Spline 3D Robot */}
      <div className="w-full h-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Invisible click zones over the robot */}
      <div className="absolute inset-0 pointer-events-auto">
        {/* Head zone */}
        <div
          className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'head' ? 'animate-pulse' : ''
          }`}
          onClick={(e) => handleClick('head', e)}
          style={{
            transform: isReacting && lastReaction === 'head' ? 'translateX(-2px) rotate(-5deg)' : 'translateX(0) rotate(0deg)',
            boxShadow: isReacting && lastReaction === 'head' ? '0 0 20px rgba(236, 72, 153, 0.5)' : 'none'
          }}
        />

        {/* Torso zone */}
        <div
          className={`absolute top-[35%] left-1/2 -translate-x-1/2 w-24 h-32 rounded-lg cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'torso' ? 'animate-pulse' : ''
          }`}
          onClick={(e) => handleClick('torso', e)}
          style={{
            transform: isReacting && lastReaction === 'torso' ? 'translateY(-4px) rotateX(-5deg)' : 'translateY(0) rotateX(0deg)',
            boxShadow: isReacting && lastReaction === 'torso' ? '0 0 25px rgba(168, 85, 247, 0.4)' : 'none'
          }}
        />

        {/* Left Arm zone */}
        <div
          className={`absolute top-[40%] left-[25%] w-8 h-20 rounded-full cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'leftArm' ? 'animate-bounce' : ''
          }`}
          onClick={(e) => handleClick('leftArm', e)}
          style={{
            transform: isReacting && lastReaction === 'leftArm' ? 'translateX(-8px) rotate(-15deg)' : 'translateX(0) rotate(0deg)',
            boxShadow: isReacting && lastReaction === 'leftArm' ? '0 0 15px rgba(236, 72, 153, 0.4)' : 'none'
          }}
        />

        {/* Right Arm zone */}
        <div
          className={`absolute top-[40%] right-[25%] w-8 h-20 rounded-full cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'rightArm' ? 'animate-bounce' : ''
          }`}
          onClick={(e) => handleClick('rightArm', e)}
          style={{
            transform: isReacting && lastReaction === 'rightArm' ? 'translateX(8px) rotate(15deg)' : 'translateX(0) rotate(0deg)',
            boxShadow: isReacting && lastReaction === 'rightArm' ? '0 0 15px rgba(236, 72, 153, 0.4)' : 'none'
          }}
        />

        {/* Left Leg zone */}
        <div
          className={`absolute top-[65%] left-[40%] w-10 h-24 rounded-full cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'leftLeg' ? 'animate-bounce' : ''
          }`}
          onClick={(e) => handleClick('leftLeg', e)}
          style={{
            transform: isReacting && lastReaction === 'leftLeg' ? 'translateY(-6px) rotate(-5deg)' : 'translateY(0) rotate(0deg)',
            boxShadow: isReacting && lastReaction === 'leftLeg' ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
          }}
        />

        {/* Right Leg zone */}
        <div
          className={`absolute top-[65%] right-[40%] w-10 h-24 rounded-full cursor-pointer transition-all duration-300 ${
            isReacting && lastReaction === 'rightLeg' ? 'animate-bounce' : ''
          }`}
          onClick={(e) => handleClick('rightLeg', e)}
          style={{
            transform: isReacting && lastReaction === 'rightLeg' ? 'translateY(-6px) rotate(5deg)' : 'translateY(0) rotate(0deg)',
            boxShadow: isReacting && lastReaction === 'rightLeg' ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
          }}
        />
      </div>

      {/* Reaction Message */}
      {showMessage && lastReaction && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-sm text-pink-400 animate-pulse bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-pink-400/30">
          {reactions[lastReaction].message}
        </div>
      )}

      {/* Enhanced Glow Effect during reaction */}
      {isReacting && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full opacity-30 blur-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  )
}
