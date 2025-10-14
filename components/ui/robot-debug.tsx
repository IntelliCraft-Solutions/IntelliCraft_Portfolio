'use client'

import { InteractiveRobot } from "@/components/ui/interactive-robot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export function RobotDebug() {
  const [showDebug, setShowDebug] = useState(true)
  const [testReaction, setTestReaction] = useState<'head' | 'arm' | 'torso' | 'leg'>('head')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🤖 Robot Debug Panel</CardTitle>
          <CardDescription>
            Test the interactive robot reactions and debug click detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowDebug(!showDebug)}
              variant="outline"
            >
              {showDebug ? 'Hide Debug' : 'Show Debug'}
            </Button>
            
            <select 
              value={testReaction} 
              onChange={(e) => setTestReaction(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="head">Head Reaction</option>
              <option value="arm">Arm Reaction</option>
              <option value="torso">Torso Reaction</option>
              <option value="leg">Leg Reaction</option>
            </select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>• Click anywhere on the robot to test reactions</p>
            <p>• Check browser console for click coordinates</p>
            <p>• Use the debug panel to see click detection</p>
            <p>• Test buttons should work even if clicks don't</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-800">
            <InteractiveRobot 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              enableHurtReactions={true}
              sensitivity="high"
            />
            
            {/* Click overlay for debugging */}
            {showDebug && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Center lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-red-500/50"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-px h-full bg-red-500/50"></div>
                </div>
                
                {/* Labels */}
                <div className="absolute top-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Head Area (Y > 0.3)
                </div>
                <div className="absolute top-1/2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Torso Area (-0.2 < Y < 0.3)
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Leg Area (Y < -0.2)
                </div>
                <div className="absolute top-1/2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Arm Area (|X| > 0.3)
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
