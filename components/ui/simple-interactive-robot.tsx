'use client'

import { Suspense, lazy, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SimpleInteractiveRobotProps {
  scene: string
  className?: string
  enableHurtReactions?: boolean
}

export function SimpleInteractiveRobot({ 
  scene, 
  className, 
  enableHurtReactions = true
}: SimpleInteractiveRobotProps) {
  const [reaction, setReaction] = useState<string | null>(null)
  const [isCooldown, setIsCooldown] = useState(false)

  // Simple reaction trigger
  const triggerReaction = useCallback((bodyPart: string) => {
    if (isCooldown || !enableHurtReactions) return

    setReaction(bodyPart)
    setIsCooldown(true)
    
    // Play simple sound
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
    
    // Reset after animation
    setTimeout(() => {
      setReaction(null)
      setIsCooldown(false)
    }, 500)
  }, [isCooldown, enableHurtReactions])

  // Simple click handler - just trigger a reaction
  const handleClick = useCallback(() => {
    const reactions = ['head', 'arm', 'torso', 'leg']
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]
    triggerReaction(randomReaction)
  }, [triggerReaction])

  // Animation for reactions
  const getAnimation = (type: string) => {
    switch (type) {
      case 'head':
        return {
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3, ease: "easeOut" }
        }
      case 'arm':
        return {
          x: [0, -10, 0],
          rotate: [0, -10, 0],
          transition: { duration: 0.3, ease: "easeOut" }
        }
      case 'torso':
        return {
          y: [0, -5, 0],
          scale: [1, 0.95, 1],
          transition: { duration: 0.3, ease: "easeOut" }
        }
      case 'leg':
        return {
          y: [0, 5, 0],
          rotate: [0, 2, 0],
          transition: { duration: 0.3, ease: "easeOut" }
        }
      default:
        return {}
    }
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading robot...</span>
            </div>
          </div>
        }
      >
        <motion.div
          className="w-full h-full cursor-pointer"
          onClick={handleClick}
          animate={reaction ? getAnimation(reaction) : {}}
        >
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </motion.div>
      </Suspense>

      {/* Visual feedback */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="text-6xl">
              {reaction === 'head' && '😲'}
              {reaction === 'arm' && '🤚'}
              {reaction === 'torso' && '💫'}
              {reaction === 'leg' && '🦵'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple status */}
      <div className="absolute bottom-4 left-4">
        <div className={cn(
          "px-3 py-1 text-xs rounded-full border",
          enableHurtReactions 
            ? "bg-green-500/20 text-green-400 border-green-500/30" 
            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
        )}>
          {enableHurtReactions ? '🤖 Click me!' : '🤖 Static'}
        </div>
      </div>
    </div>
  )
}
