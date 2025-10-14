'use client'

import { Suspense, lazy, useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface InteractiveRobotProps {
  scene: string
  className?: string
  enableHurtReactions?: boolean
  sensitivity?: 'low' | 'medium' | 'high'
}

interface ReactionState {
  type: 'head' | 'arm' | 'torso' | 'leg' | null
  intensity: number
  timestamp: number
}

export function InteractiveRobot({ 
  scene, 
  className, 
  enableHurtReactions = true,
  sensitivity = 'medium'
}: InteractiveRobotProps) {
  const splineRef = useRef<any>(null)
  const [reaction, setReaction] = useState<ReactionState>({ type: null, intensity: 0, timestamp: 0 })
  const [isCooldown, setIsCooldown] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [lastClickPosition, setLastClickPosition] = useState<{x: number, y: number} | null>(null)
  const [clickCount, setClickCount] = useState(0)

  // Sensitivity settings
  const sensitivitySettings = {
    low: { cooldown: 1000, intensity: 0.5 },
    medium: { cooldown: 500, intensity: 0.7 },
    high: { cooldown: 300, intensity: 1.0 }
  }

  const currentSettings = sensitivitySettings[sensitivity]

  // Audio feedback sounds (using Web Audio API for gentle sounds)
  const playReactionSound = useCallback((bodyPart: string) => {
    if (!audioEnabled) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different body parts
    const frequencies = {
      head: 800,
      arm: 600,
      torso: 400,
      leg: 500
    }

    oscillator.frequency.setValueAtTime(frequencies[bodyPart as keyof typeof frequencies] || 500, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }, [audioEnabled])

  // Trigger reaction based on body part
  const triggerReaction = useCallback((bodyPart: 'head' | 'arm' | 'torso' | 'leg', intensity: number = 1) => {
    if (isCooldown || !enableHurtReactions) return

    const now = Date.now()
    setReaction({ type: bodyPart, intensity, timestamp: now })
    setIsCooldown(true)
    
    // Play sound feedback
    playReactionSound(bodyPart)

    // Reset cooldown
    setTimeout(() => {
      setIsCooldown(false)
    }, currentSettings.cooldown)
  }, [isCooldown, enableHurtReactions, currentSettings.cooldown, playReactionSound])

  // Handle Spline scene load
  const onLoad = useCallback((spline: any) => {
    splineRef.current = spline
    console.log('Spline scene loaded successfully')
    
    // Set up click event listeners on the Spline canvas
    if (spline && spline.canvas) {
      const canvas = spline.canvas
      
      const handleCanvasClick = (event: MouseEvent) => {
        if (!enableHurtReactions || isCooldown) return
        
        // Get mouse position relative to canvas
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        
        // Convert to normalized coordinates
        const normalizedX = (x / rect.width) * 2 - 1
        const normalizedY = -((y / rect.height) * 2 - 1)
        
        // Create a simple body part detection based on click position
        let bodyPart: 'head' | 'arm' | 'torso' | 'leg' = 'torso'
        let intensity = currentSettings.intensity
        
        // Simple position-based detection (you can refine this)
        if (normalizedY > 0.3) {
          bodyPart = 'head'
          intensity *= 1.2
        } else if (normalizedY > -0.2) {
          bodyPart = 'torso'
        } else if (Math.abs(normalizedX) > 0.3) {
          bodyPart = 'arm'
        } else {
          bodyPart = 'leg'
        }
        
        console.log(`Canvas clicked at (${normalizedX}, ${normalizedY}) - detected: ${bodyPart}`)
        setLastClickPosition({ x: normalizedX, y: normalizedY })
        setClickCount(prev => prev + 1)
        triggerReaction(bodyPart, intensity)
      }
      
      canvas.addEventListener('click', handleCanvasClick)
      
      // Cleanup function
      return () => {
        canvas.removeEventListener('click', handleCanvasClick)
      }
    }
  }, [enableHurtReactions, isCooldown, currentSettings.intensity, triggerReaction])

  // Alternative: Handle clicks on the container div as fallback
  const handleContainerClick = useCallback((event: React.MouseEvent) => {
    if (!enableHurtReactions || isCooldown) return
    
    // Get click position relative to container
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Convert to normalized coordinates
    const normalizedX = (x / rect.width) * 2 - 1
    const normalizedY = -((y / rect.height) * 2 - 1)
    
    // Simple body part detection based on click position
    let bodyPart: 'head' | 'arm' | 'torso' | 'leg' = 'torso'
    let intensity = currentSettings.intensity
    
    if (normalizedY > 0.3) {
      bodyPart = 'head'
      intensity *= 1.2
    } else if (normalizedY > -0.2) {
      bodyPart = 'torso'
    } else if (Math.abs(normalizedX) > 0.3) {
      bodyPart = 'arm'
    } else {
      bodyPart = 'leg'
    }
    
    console.log(`Container clicked at (${normalizedX}, ${normalizedY}) - detected: ${bodyPart}`)
    setLastClickPosition({ x: normalizedX, y: normalizedY })
    setClickCount(prev => prev + 1)
    triggerReaction(bodyPart, intensity)
  }, [enableHurtReactions, isCooldown, currentSettings.intensity, triggerReaction])

  // Reaction animations
  const getReactionAnimation = (type: string, intensity: number) => {
    const baseAnimation = {
      transition: { duration: 0.3, ease: "easeOut" }
    }

    switch (type) {
      case 'head':
        return {
          ...baseAnimation,
          scale: [1, 1.05 * intensity, 1],
          rotate: [0, -5 * intensity, 5 * intensity, 0],
        }
      case 'arm':
        return {
          ...baseAnimation,
          x: [0, -10 * intensity, 0],
          rotate: [0, -10 * intensity, 0],
        }
      case 'torso':
        return {
          ...baseAnimation,
          y: [0, -5 * intensity, 0],
          scale: [1, 0.98 * intensity, 1],
        }
      case 'leg':
        return {
          ...baseAnimation,
          y: [0, 5 * intensity, 0],
          rotate: [0, 2 * intensity, 0],
        }
      default:
        return baseAnimation
    }
  }

  return (
    <div 
      className={cn("relative w-full h-full", className)}
      onClick={handleContainerClick}
    >
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading interactive robot...</span>
            </div>
          </div>
        }
      >
        <motion.div
          className="w-full h-full"
          animate={reaction.type ? getReactionAnimation(reaction.type, reaction.intensity) : {}}
          key={reaction.timestamp}
        >
          <Spline
            scene={scene}
            onLoad={onLoad}
            className="w-full h-full cursor-pointer"
          />
        </motion.div>
      </Suspense>

      {/* Visual feedback overlay */}
      <AnimatePresence>
        {reaction.type && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className={cn(
              "text-4xl select-none",
              reaction.type === 'head' && "animate-bounce",
              reaction.type === 'arm' && "animate-pulse",
              reaction.type === 'torso' && "animate-ping",
              reaction.type === 'leg' && "animate-bounce"
            )}>
              {reaction.type === 'head' && '😲'}
              {reaction.type === 'arm' && '🤚'}
              {reaction.type === 'torso' && '💫'}
              {reaction.type === 'leg' && '🦵'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={cn(
            "px-3 py-1 text-xs rounded-full transition-colors",
            audioEnabled 
              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          )}
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>
        
        <button
          onClick={() => triggerReaction('head', 0.8)}
          className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full hover:bg-blue-500/30 transition-colors"
          disabled={isCooldown}
        >
          Test
        </button>
        
        <button
          onClick={() => triggerReaction('torso', 0.8)}
          className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full hover:bg-purple-500/30 transition-colors"
          disabled={isCooldown}
        >
          Torso
        </button>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className={cn(
          "px-3 py-1 text-xs rounded-full border",
          enableHurtReactions 
            ? "bg-green-500/20 text-green-400 border-green-500/30" 
            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
        )}>
          {enableHurtReactions ? '🤖 Interactive' : '🤖 Static'}
        </div>
        
        {/* Debug info */}
        <div className="bg-black/50 text-white text-xs p-2 rounded border">
          <div>Clicks: {clickCount}</div>
          {lastClickPosition && (
            <div>
              Last: ({lastClickPosition.x.toFixed(2)}, {lastClickPosition.y.toFixed(2)})
            </div>
          )}
          <div>Cooldown: {isCooldown ? 'Yes' : 'No'}</div>
        </div>
      </div>
    </div>
  )
}
