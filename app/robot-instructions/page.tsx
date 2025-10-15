import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RobotInstructionsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🤖 Robot Interaction Instructions</h1>
          <p className="text-muted-foreground text-lg">
            Follow these steps to test the interactive robot
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Step 1: Test Working Version</CardTitle>
              <CardDescription>
                Start with the guaranteed working version
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This version uses simple click detection that should work reliably.
              </p>
              <Link href="/robot-test">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Test Working Robot
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">🎯 Step 2: Try Demo Version</CardTitle>
              <CardDescription>
                Test the full demo with multiple versions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose from working, advanced, or simple robot versions.
              </p>
              <Link href="/interactive-robot">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open Robot Demo
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">🔧 Step 3: Debug Mode</CardTitle>
              <CardDescription>
                If issues persist, use debug mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Debug version with detailed click detection and troubleshooting.
              </p>
              <Link href="/robot-debug">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Open Debug Mode
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">📋 What to Expect</CardTitle>
              <CardDescription>
                Expected behavior when clicking the robot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p>• <strong>Visual Animation:</strong> Robot moves, scales, or rotates</p>
                <p>• <strong>Emoji Overlay:</strong> Large emoji appears (😲🤚💫🦵)</p>
                <p>• <strong>Audio Feedback:</strong> Gentle beep sound</p>
                <p>• <strong>Status Update:</strong> Shows "Reacting: [type]"</p>
                <p>• <strong>Console Log:</strong> "Robot clicked!" message</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">🚨 Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-yellow-700">
              <p><strong>If nothing happens when clicking:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Try the "Working Robot" version first</li>
                <li>Check browser console (F12) for error messages</li>
                <li>Make sure you're clicking on the robot area</li>
                <li>Try refreshing the page</li>
                <li>Check if audio is enabled in your browser</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
