'use client'

import { InteractiveRobot } from "@/components/ui/interactive-robot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

/**
 * Example of how to integrate the InteractiveRobot into any existing page
 * This shows a simple, clean integration without all the demo controls
 */
export function RobotIntegrationExample() {
  const [isRobotActive, setIsRobotActive] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Meet Our Interactive Robot</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Click on different parts of the robot to see how it responds to your touch. 
          Each interaction creates a unique emotional response.
        </p>
        <Button 
          onClick={() => setIsRobotActive(!isRobotActive)}
          variant={isRobotActive ? "destructive" : "default"}
        >
          {isRobotActive ? "Deactivate Robot" : "Activate Robot"}
        </Button>
      </div>

      {/* Robot Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[400px] bg-gradient-to-br from-slate-900 to-slate-800">
            <InteractiveRobot 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              enableHurtReactions={isRobotActive}
              sensitivity="medium"
            />
            
            {/* Overlay when inactive */}
            {!isRobotActive && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-4xl">😴</div>
                  <p className="text-white font-medium">Robot is sleeping</p>
                  <p className="text-white/70 text-sm">Click "Activate Robot" to wake it up</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">😲 Head</CardTitle>
            <CardDescription>
              Click the head for surprised reactions
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🤚 Arms</CardTitle>
            <CardDescription>
              Touch arms for curious responses
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💫 Body</CardTitle>
            <CardDescription>
              Tap the torso for gentle awareness
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

/**
 * Minimal integration - just the robot without extra UI
 */
export function MinimalRobotIntegration() {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border">
      <InteractiveRobot 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
        enableHurtReactions={true}
        sensitivity="medium"
      />
    </div>
  )
}

/**
 * Hero section integration example
 */
export function HeroRobotIntegration() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Interactive
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Robot
              </span>
            </h1>
            <p className="text-xl text-slate-300">
              Experience the future of human-robot interaction. Our AI-powered robot 
              responds to your touch with emotional intelligence and awareness.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Try It Now
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right content - Robot */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto">
              <InteractiveRobot 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full rounded-2xl overflow-hidden"
                enableHurtReactions={true}
                sensitivity="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
