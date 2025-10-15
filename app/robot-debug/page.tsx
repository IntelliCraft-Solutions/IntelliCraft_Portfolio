import { RobotDebug } from "@/components/ui/robot-debug"

export default function RobotDebugPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Robot Debug & Testing</h1>
          <p className="text-muted-foreground text-lg">
            Debug and test the interactive robot click detection system
          </p>
        </div>
        
        <RobotDebug />
        
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Debugging Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>1. Check Browser Console:</strong> Open DevTools (F12) and look for click coordinate logs</p>
            <p><strong>2. Test Click Detection:</strong> Click on different areas of the robot and watch the debug panel</p>
            <p><strong>3. Verify Reactions:</strong> Use the test buttons to ensure reactions work</p>
            <p><strong>4. Check Coordinates:</strong> The debug panel shows normalized coordinates (-1 to 1)</p>
            <p><strong>5. Body Part Detection:</strong> Head (Y > 0.3), Torso (-0.2 < Y < 0.3), Arms (|X| > 0.3), Legs (Y < -0.2)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
