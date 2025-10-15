import NightSkyBackground from "@/components/night-sky-background"

export function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16 bg-background">
      {/* Starfield background for stats section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NightSkyBackground />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-6 sm:p-8 animate-glow border border-primary/20 bg-card/40 backdrop-blur-xl text-center">
            <div className="text-4xl sm:text-5xl font-black text-gradient mb-2 sm:mb-3">50+</div>
            <div className="text-muted-foreground font-medium text-base sm:text-lg">Projects Delivered</div>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8 animate-glow border border-primary/20 bg-card/40 backdrop-blur-xl text-center">
            <div className="text-4xl sm:text-5xl font-black text-gradient mb-2 sm:mb-3">99%</div>
            <div className="text-muted-foreground font-medium text-base sm:text-lg">Client Satisfaction</div>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8 animate-glow border border-primary/20 bg-card/40 backdrop-blur-xl text-center">
            <div className="text-4xl sm:text-5xl font-black text-gradient mb-2 sm:mb-3">24/7</div>
            <div className="text-muted-foreground font-medium text-base sm:text-lg">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
