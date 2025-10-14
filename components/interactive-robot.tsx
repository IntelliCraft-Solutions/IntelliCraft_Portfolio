"use client"

import { useEffect, useRef, useState } from "react"

type BodyPart = 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'

type Reaction = {
  animation: string
  sound?: string
  duration: number
}

const reactions: Record<BodyPart, Reaction> = {
  head: {
    animation: 'startle',
    sound: 'soft-beep',
    duration: 800
  },
  torso: {
    animation: 'lean-back',
    sound: 'gentle-chime',
    duration: 600
  },
  leftArm: {
    animation: 'recoil-left',
    sound: 'quick-tone',
    duration: 500
  },
  rightArm: {
    animation: 'recoil-right',
    sound: 'quick-tone',
    duration: 500
  },
  leftLeg: {
    animation: 'step-adjust',
    sound: 'soft-click',
    duration: 400
  },
  rightLeg: {
    animation: 'step-adjust',
    sound: 'soft-click',
    duration: 400
  }
}

export default function InteractiveRobot() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReacting, setIsReacting] = useState(false)
  const [lastReaction, setLastReaction] = useState<BodyPart | null>(null)
  const [cooldown, setCooldown] = useState(false)
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
    
    const reaction = reactions[bodyPart]
    if (reaction.sound) {
      playSound(reaction.sound)
    }
    
    // Reset after reaction duration
    setTimeout(() => {
      setIsReacting(false)
      setLastReaction(null)
    }, reaction.duration)
    
    // Cooldown period
    setTimeout(() => {
      setCooldown(false)
    }, 500)
  }

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-80">
        {/* Robot Body */}
        <div className="absolute inset-0">
          {/* Head */}
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'head' ? 'animate-bounce' : ''
            }`}
            onClick={(e) => handleClick('head', e)}
            style={{
              transform: isReacting && lastReaction === 'head' ? 'translateX(-2px) rotate(-5deg)' : 'translateX(0) rotate(0deg)',
              boxShadow: isReacting && lastReaction === 'head' ? '0 0 20px rgba(236, 72, 153, 0.5)' : '0 4px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Eyes */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-2">
              <div className={`w-2 h-2 rounded-full bg-cyan-400 transition-all duration-200 ${
                isReacting && lastReaction === 'head' ? 'animate-pulse' : ''
              }`} />
              <div className={`w-2 h-2 rounded-full bg-cyan-400 transition-all duration-200 ${
                isReacting && lastReaction === 'head' ? 'animate-pulse' : ''
              }`} />
            </div>
          </div>

          {/* Torso */}
          <div
            className={`absolute top-20 left-1/2 -translate-x-1/2 w-20 h-24 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'torso' ? 'animate-pulse' : ''
            }`}
            onClick={(e) => handleClick('torso', e)}
            style={{
              transform: isReacting && lastReaction === 'torso' ? 'translateY(-4px) rotateX(-5deg)' : 'translateY(0) rotateX(0deg)',
              boxShadow: isReacting && lastReaction === 'torso' ? '0 0 25px rgba(168, 85, 247, 0.4)' : '0 4px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Chest Panel */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-8 rounded bg-slate-800 border border-slate-600">
              <div className={`w-full h-full rounded transition-all duration-200 ${
                isReacting && lastReaction === 'torso' ? 'bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse' : 'bg-slate-700'
              }`} />
            </div>
          </div>

          {/* Left Arm */}
          <div
            className={`absolute top-24 left-8 w-6 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'leftArm' ? 'animate-bounce' : ''
            }`}
            onClick={(e) => handleClick('leftArm', e)}
            style={{
              transform: isReacting && lastReaction === 'leftArm' ? 'translateX(-8px) rotate(-15deg)' : 'translateX(0) rotate(0deg)',
              boxShadow: isReacting && lastReaction === 'leftArm' ? '0 0 15px rgba(236, 72, 153, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />

          {/* Right Arm */}
          <div
            className={`absolute top-24 right-8 w-6 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'rightArm' ? 'animate-bounce' : ''
            }`}
            onClick={(e) => handleClick('rightArm', e)}
            style={{
              transform: isReacting && lastReaction === 'rightArm' ? 'translateX(8px) rotate(15deg)' : 'translateX(0) rotate(0deg)',
              boxShadow: isReacting && lastReaction === 'rightArm' ? '0 0 15px rgba(236, 72, 153, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />

          {/* Left Leg */}
          <div
            className={`absolute top-44 left-1/2 -translate-x-1/2 -translate-x-8 w-8 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'leftLeg' ? 'animate-bounce' : ''
            }`}
            onClick={(e) => handleClick('leftLeg', e)}
            style={{
              transform: isReacting && lastReaction === 'leftLeg' ? 'translateY(-6px) rotate(-5deg)' : 'translateY(0) rotate(0deg)',
              boxShadow: isReacting && lastReaction === 'leftLeg' ? '0 0 15px rgba(168, 85, 247, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />

          {/* Right Leg */}
          <div
            className={`absolute top-44 left-1/2 -translate-x-1/2 translate-x-8 w-8 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 cursor-pointer transition-all duration-300 ${
              isReacting && lastReaction === 'rightLeg' ? 'animate-bounce' : ''
            }`}
            onClick={(e) => handleClick('rightLeg', e)}
            style={{
              transform: isReacting && lastReaction === 'rightLeg' ? 'translateY(-6px) rotate(5deg)' : 'translateY(0) rotate(0deg)',
              boxShadow: isReacting && lastReaction === 'rightLeg' ? '0 0 15px rgba(168, 85, 247, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        {/* Reaction Indicator */}
        {isReacting && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-pink-400 animate-pulse">
            {lastReaction === 'head' && "😮 Ouch!"}
            {lastReaction === 'torso' && "💫 Hey!"}
            {lastReaction === 'leftArm' && "🤖 Careful!"}
            {lastReaction === 'rightArm' && "🤖 Careful!"}
            {lastReaction === 'leftLeg' && "⚡ Oops!"}
            {lastReaction === 'rightLeg' && "⚡ Oops!"}
          </div>
        )}

        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full opacity-20 blur-xl pointer-events-none">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
