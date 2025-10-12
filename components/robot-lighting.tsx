"use client"

export function RobotLighting() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Violet side lighting effects */}
      <div className="absolute inset-0">
        {/* Left side lighting */}
        <div
          className="absolute top-1/4 left-0 w-[40%] h-[60%] opacity-8 dark:opacity-10"
          style={{
            background: "linear-gradient(90deg, rgba(184, 78, 255, 0.2) 0%, rgba(184, 78, 255, 0.05) 50%, transparent 100%)",
            filter: "blur(40px)",
            transform: "translateX(-20%)",
          }}
        />
        
        {/* Right side lighting */}
        <div
          className="absolute top-1/4 right-0 w-[40%] h-[60%] opacity-8 dark:opacity-10"
          style={{
            background: "linear-gradient(270deg, rgba(255, 107, 255, 0.2) 0%, rgba(255, 107, 255, 0.05) 50%, transparent 100%)",
            filter: "blur(40px)",
            transform: "translateX(20%)",
          }}
        />
        
        {/* Top accent lighting */}
        <div
          className="absolute top-0 left-1/2 w-[60%] h-[30%] opacity-5 dark:opacity-8"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(184, 78, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "translateX(-50%)",
          }}
        />
        
        {/* Floor reflection/underglow */}
        <div
          className="absolute bottom-0 left-1/2 w-[80%] h-[20%] opacity-4 dark:opacity-6"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(184, 78, 255, 0.1) 0%, transparent 60%)",
            filter: "blur(50px)",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      
      {/* Animated glow pulse overlay */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-8 animate-pulse"
        style={{
          background: "radial-gradient(circle at 60% 50%, rgba(184, 78, 255, 0.1) 0%, transparent 50%)",
          animationDuration: "4s",
        }}
      />
    </div>
  )
}
