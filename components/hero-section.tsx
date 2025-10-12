"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { SplineScene } from "@/components/ui/splite"
import { CircuitBackground } from "@/components/circuit-background"
import { RobotLighting } from "@/components/robot-lighting"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background pt-28 md:pt-32 pb-12">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left column: text content */}
          <div className="lg:col-span-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 leading-tight whitespace-nowrap playwrite-us-modern">
              IntelliCraft Solutions
            </h1>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-balance mb-8 leading-tight">
              <span className="text-gradient animate-text-glow">WEB SOLUTIONS Built Right</span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground text-pretty mb-12 max-w-3xl leading-relaxed">
              Premium e-commerce platforms, finance management tools, and AI agent solutions.
              <span className="text-primary font-semibold"> Ready to deploy in hours, not months.</span>
            </p>

            {/* CTAs untouched */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button size="lg" className="text-lg px-10 py-6 group bg-primary hover:bg-primary/90 animate-glow">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 group glass border-primary/30 hover:border-primary/60 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right column: Spline robot moved up and slightly bigger, anchored bottom */}
          <div className="lg:col-span-6 relative h-[50vh] sm:h-[58vh] lg:h-[66vh] xl:h-[70vh] pointer-events-auto flex items-end">
            <div className="absolute bottom-0 left-0 right-0 translate-x-[10%] lg:translate-x-[14%] scale-[1.4] lg:scale-[1.5]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Circuit background pattern - positioned behind robot area */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CircuitBackground />
      </div>
      
      {/* Robot lighting effects - positioned behind robot area */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <RobotLighting />
      </div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-24 left-1/3 w-[70vw] max-w-[48rem] aspect-square rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.18), rgba(236,72,153,0.08) 40%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center animate-glow">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
