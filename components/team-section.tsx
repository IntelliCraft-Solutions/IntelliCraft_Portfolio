"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter } from "lucide-react"

export function TeamSection() {
  const members = [
    {
      name: "Subhobrata Maity",
      role: "Co‑Founder & Delivery",
      avatar: "/subhobrata.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Debangshu Roy",
      role: "Co‑Founder & Delivery",
      avatar: "/debangshuroy3.png",
      linkedin: "https://www.linkedin.com/in/debangshu-roy-5531b8272/",
      twitter: "https://x.com/Boomboom_699",
    },
  ]

  return (
    <section id="team" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 gradient-purple opacity-20" />
      <div className="absolute inset-0 gradient-pink opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-8">
          {/* Left member */}
          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="relative size-44 sm:size-52 rounded-full overflow-hidden shadow-xl glass animate-glow">
              <Image src={members[0].avatar} alt={members[0].name} fill className="object-cover" />
            </div>
            <div className="mt-4 text-center">
              <div className="font-semibold text-base sm:text-lg text-foreground">{members[0].name}</div>
              <div className="text-muted-foreground text-sm">{members[0].role}</div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <a href={members[0].linkedin} aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={members[0].twitter} aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Center content */}
          <div className="text-center order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-balance mb-4">
              We’ve Been There,
              <br className="hidden sm:block" />
              Done That.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Our team knows what it takes for pre‑seed and seed‑stage startups to execute with excellence — and we’ll
              ride with you along the way.
            </p>
            <div className="mt-6 sm:mt-8 flex items-center justify-center">
              <Button asChild size="lg" className="glass border-primary/30 hover:border-primary/60">
                <a href="#contact" className="inline-flex items-center">Contact Us</a>
              </Button>
            </div>
          </div>

          {/* Right member */}
          <div className="flex flex-col items-center order-3">
            <div className="relative size-44 sm:size-52 rounded-full overflow-hidden shadow-xl glass animate-glow">
              <Image src={members[1].avatar} alt={members[1].name} fill className="object-cover" />
            </div>
            <div className="mt-4 text-center">
              <div className="font-semibold text-base sm:text-lg text-foreground">{members[1].name}</div>
              <div className="text-muted-foreground text-sm">{members[1].role}</div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <a href={members[1].linkedin} aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={members[1].twitter} aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


