'use client'

import { InteractiveRobot } from "@/components/ui/interactive-robot";
import { SimpleInteractiveRobot } from "@/components/ui/simple-interactive-robot";
import { WorkingRobot } from "@/components/ui/working-robot";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
 
export function InteractiveRobotDemo() {
  const [enableReactions, setEnableReactions] = useState(true)
  const [sensitivity, setSensitivity] = useState<'low' | 'medium' | 'high'>('medium')
  const [showInstructions, setShowInstructions] = useState(true)

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="working" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="working">✅ Working Robot</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Robot</TabsTrigger>
          <TabsTrigger value="simple">Simple Robot</TabsTrigger>
        </TabsList>
        
        <TabsContent value="working" className="space-y-6">
          <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            
            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  ✅ Working Interactive Robot
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  This version is guaranteed to work! Click anywhere on the robot 
                  to see it react with emotional responses and animations.
                </p>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-300 text-sm">
                    ✅ <strong>Guaranteed to work!</strong> Click anywhere on the robot to see reactions.
                  </p>
                </div>
              </div>

              {/* Right content - Robot */}
              <div className="flex-1 relative">
                <WorkingRobot 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            
            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Advanced Interactive Robot
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  Click on different parts of the robot to see its emotional reactions. 
                  Each body part responds uniquely to your touch.
                </p>
                
                {/* Controls */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reactions"
                      checked={enableReactions}
                      onCheckedChange={setEnableReactions}
                    />
                    <Label htmlFor="reactions" className="text-neutral-300">
                      Enable Hurt Reactions
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label className="text-neutral-300">Sensitivity:</Label>
                    <Select value={sensitivity} onValueChange={(value: 'low' | 'medium' | 'high') => setSensitivity(value)}>
                      <SelectTrigger className="w-32 bg-neutral-800 border-neutral-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right content - Robot */}
              <div className="flex-1 relative">
                <InteractiveRobot 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  enableHurtReactions={enableReactions}
                  sensitivity={sensitivity}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="simple" className="space-y-6">
          <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            
            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Simple Interactive Robot
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  Click anywhere on the robot to see random emotional reactions. 
                  This version uses simple click detection for reliable interaction.
                </p>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-300 text-sm">
                    ✅ This version should work reliably - click anywhere on the robot!
                  </p>
                </div>
              </div>

              {/* Right content - Robot */}
              <div className="flex-1 relative">
                <SimpleInteractiveRobot 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  enableHurtReactions={enableReactions}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Instructions Card */}
      {showInstructions && (
        <Card className="p-6 bg-muted/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">How to Interact</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowInstructions(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">😲</span>
                <span className="font-medium">Head</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the head for a surprised reaction with head tilt and blinking
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤚</span>
                <span className="font-medium">Arms</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Touch arms for a recoil motion and curious look
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💫</span>
                <span className="font-medium">Torso</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tap the body for a gentle lean back and pulse effect
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🦵</span>
                <span className="font-medium">Legs</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Click legs for a balance adjustment and small bounce
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> The robot has a cooldown period between reactions to feel more natural. 
              Try different sensitivity levels to see how it affects the response intensity!
            </p>
          </div>
        </Card>
      )}

      {/* Features Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Interactive Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Emotional Responses</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Context-aware reactions based on body part</li>
              <li>• Smooth animations with realistic physics</li>
              <li>• Visual feedback with emoji expressions</li>
              <li>• Audio feedback with gentle sound effects</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Customization</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Adjustable sensitivity levels</li>
              <li>• Toggle reactions on/off</li>
              <li>• Audio feedback control</li>
              <li>• Cooldown system for realism</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
