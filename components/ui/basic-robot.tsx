'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function BasicRobot() {
  const [isHit, setIsHit] = useState(false)
  const [hitType, setHitType] = useState('')

  const handleClick = () => {
    console.log('ROBOT CLICKED!') // This will show in browser console
    
    const reactions = ['head', 'body', 'arm', 'leg']
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)]
    
    setHitType(randomReaction)
    setIsHit(true)
    
    // Reset after 1 second
    setTimeout(() => {
      setIsHit(false)
    }, 1000)
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg relative overflow-hidden cursor-pointer" onClick={handleClick}>
      {/* Simple robot representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={isHit ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
            y: [0, -20, 0]
          } : {}}
          transition={{ duration: 0.5 }}
          className="text-8xl"
        >
          🤖
        </motion.div>
      </div>

      {/* Hit effect overlay */}
      {isHit && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-6xl animate-bounce">
            {hitType === 'head' && '😲'}
            {hitType === 'body' && '💥'}
            {hitType === 'arm' && '🤚'}
            {hitType === 'leg' && '🦵'}
          </div>
        </motion.div>
      )}

      {/* Status text */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        {isHit ? `HIT: ${hitType.toUpperCase()}` : 'CLICK THE ROBOT!'}
      </div>

      {/* Click counter */}
      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
        Click me!
      </div>
    </div>
  )
}
