import { WorkingRobot } from "@/components/ui/working-robot"

export default function RobotTestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🤖 Robot Test - Guaranteed to Work!</h1>
          <p className="text-muted-foreground text-lg">
            This version uses simple click detection that should work reliably. 
            Click anywhere on the robot to see it react!
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8">
          <div className="h-[500px]">
            <WorkingRobot 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✅ What Should Happen</h3>
            <ul className="space-y-1 text-sm text-green-300">
              <li>• Click anywhere on the robot</li>
              <li>• Robot should animate (scale, rotate, move)</li>
              <li>• Large emoji should appear (😲🤚💫🦵)</li>
              <li>• You should hear a gentle beep sound</li>
              <li>• Status indicator shows "Reacting: [type]"</li>
            </ul>
          </div>
          
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">🔧 Troubleshooting</h3>
            <ul className="space-y-1 text-sm text-blue-300">
              <li>• Check browser console (F12) for "Robot clicked!" message</li>
              <li>• Try clicking multiple times</li>
              <li>• Audio may require clicking page first (browser policy)</li>
              <li>• Make sure you're clicking on the robot area</li>
              <li>• Try refreshing the page if nothing works</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
