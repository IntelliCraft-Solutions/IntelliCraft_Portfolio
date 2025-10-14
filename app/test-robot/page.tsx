import { BasicRobot } from "@/components/ui/basic-robot"

export default function TestRobotPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🤖 SIMPLE ROBOT TEST</h1>
          <p className="text-muted-foreground text-lg">
            Click the robot below. It WILL react immediately.
          </p>
        </div>
        
        <BasicRobot />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            If this doesn't work, check your browser console (F12) for "ROBOT CLICKED!" message
          </p>
        </div>
      </div>
    </div>
  )
}
