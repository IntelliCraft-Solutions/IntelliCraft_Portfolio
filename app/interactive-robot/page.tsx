import { InteractiveRobotDemo } from "@/components/ui/robot-demo"

export default function InteractiveRobotPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Interactive Robot with Hurt Reactions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience a robot that feels your touch and responds with emotional awareness. 
            Click on different body parts to see unique reactions that make the robot feel alive.
          </p>
        </div>
        
        <InteractiveRobotDemo />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">🎯 Emotional Intelligence</h2>
            <p className="text-muted-foreground">
              The robot demonstrates awareness and sensitivity through contextual reactions. 
              Each body part has its own personality and response pattern.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">🎨 Interactive Design</h2>
            <p className="text-muted-foreground">
              Built with Framer Motion for smooth animations, Web Audio API for sound feedback, 
              and intelligent body part detection for realistic interactions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">⚙️ Technical Features</h2>
            <p className="text-muted-foreground">
              Cooldown systems, sensitivity controls, accessibility options, and seamless 
              integration with existing Spline 3D scenes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
