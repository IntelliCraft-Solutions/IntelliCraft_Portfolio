'use client'

import { Suspense, lazy, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface WorkingRobotProps {
  scene: string
  className?: string
}

export function WorkingRobot({ scene, className }: WorkingRobotProps) {
  const [isReacting, setIsReacting] = useState(false)
  const [reactionType, setReactionType] = useState<string>('')
  const [hurtMessage, setHurtMessage] = useState<string>('')

  // Simple click handler that definitely works
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (isReacting) return // Prevent multiple clicks during animation
    
    console.log('ROBOT CLICKED!', event) // Debug log
    
    // Get click position to determine body part
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    
    let bodyPart = 'torso'
    if (y < 0.3) bodyPart = 'head'
    else if (y > 0.7) bodyPart = 'leg'
    else if (x < 0.3 || x > 0.7) bodyPart = 'arm'
    else bodyPart = 'torso'
    
    console.log(`Clicked at (${x.toFixed(2)}, ${y.toFixed(2)}) - detected: ${bodyPart}`)
    
    // Get random hurt message for this body part
    const messages = {
      head: [
        "Ouch! My head hurts!",
        "Stop hitting my head!",
        "My brain is rattling!",
        "That's my head, be careful!",
        "Oww! My head is sensitive!"
      ],
      arm: [
        "Stop hitting my arm!",
        "Ouch! My arm is sore!",
        "That's my arm, it hurts!",
        "My arm is getting bruised!",
        "Please don't hit my arm!"
      ],
      torso: [
        "You're hurting me!",
        "Ouch! That's my body!",
        "Stop hitting my chest!",
        "My body is sensitive!",
        "That really hurts!"
      ],
      leg: [
        "My leg! That stings!",
        "Ouch! My leg is sore!",
        "Stop kicking my leg!",
        "My leg is getting hurt!",
        "That's my leg, it's sensitive!"
      ]
    }
    
    const randomMessage = messages[bodyPart as keyof typeof messages][
      Math.floor(Math.random() * messages[bodyPart as keyof typeof messages].length)
    ]
    
    setReactionType(bodyPart)
    setHurtMessage(randomMessage)
    setIsReacting(true)
    
    // Play sound
    try {
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
    } catch (error) {
      console.log('Audio not available:', error)
    }
    
    // Reset after animation
    setTimeout(() => {
      setIsReacting(false)
      setReactionType('')
      setHurtMessage('')
    }, 800)
  }, [isReacting])

  // Animation based on reaction type
  const getAnimation = () => {
    if (!isReacting) return {}
    
    switch (reactionType) {
      case 'head':
        return {
          scale: [1, 1.2, 1],
          rotate: [0, -15, 15, 0],
          y: [0, -10, 0],
          transition: { duration: 0.8, ease: "easeOut" }
        }
      case 'arm':
        return {
          x: [0, -20, 0],
          rotate: [0, -20, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }
      case 'torso':
        return {
          y: [0, -15, 0],
          scale: [1, 0.85, 1],
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.8, ease: "easeOut" }
        }
      case 'leg':
        return {
          y: [0, 15, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }
      default:
        return {
          scale: [1, 1.15, 1],
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.8, ease: "easeOut" }
        }
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
          className="w-full h-full cursor-pointer select-none"
          onClick={handleClick}
          animate={getAnimation()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </motion.div>
      </Suspense>

      {/* Robot speech bubble */}
      <AnimatePresence>
        {isReacting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
          >
            <div className="bg-white text-black px-4 py-2 rounded-lg shadow-lg border-2 border-gray-300 relative">
              <div className="text-sm font-medium whitespace-nowrap">
                {hurtMessage}
              </div>
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click indicator */}
      <div className="absolute top-4 right-4">
        <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs">
          🤖 Click me!
        </div>
      </div>

      {/* Status indicator removed after testing */}
    </div>
  )
}
