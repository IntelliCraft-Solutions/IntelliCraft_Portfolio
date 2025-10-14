"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { TeamSection } from "@/components/team-section"
import {
  Store,
  Landmark,
  Bot,
  Sparkles,
  Palette,
  Gauge,
  BarChart3,
  Cloud,
  Rocket,
  Handshake,
  ShieldCheck,
} from "lucide-react"

const InteractiveRobot = dynamic(() => import("@/components/interactive-robot"), { ssr: false })

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-20" />
        <div className="absolute inset-0 gradient-pink opacity-15" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={container}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.h1 variants={item} className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                About <span className="text-gradient">IntelliCraft</span>
              </motion.h1>
              <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                We’re a product studio focused on high‑conversion e‑commerce, finance tooling and AI automation. Our
                approach blends premium UI with rapid delivery and measurable outcomes.
              </motion.p>

              <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
                {[
                  { k: "50+", t: "Projects Delivered" },
                  { k: "99%", t: "Client Satisfaction" },
                  { k: "24/7", t: "Support Available" },
                ].map((s) => (
                  <motion.div key={s.t} variants={item} className="glass p-6 rounded-2xl border border-primary/20">
                    <div className="text-4xl font-black text-gradient mb-2">{s.k}</div>
                    <div className="text-muted-foreground">{s.t}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="lg:col-span-6 relative h-[40vh] xs:h-[45vh] sm:h-[50vh] lg:h-[66vh]">
              <InteractiveRobot />
            </div>
          </div>
        </div>
      </section>

      {/* Story / About copy */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-10" />
        <div className="absolute inset-0 gradient-pink opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
              We build products that ship fast and scale reliably
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              IntelliCraft is a boutique studio delivering production‑ready web apps, storefronts, and internal tools.
              We partner with founders and teams to design, build, and launch high‑impact software with a modern stack
              and a conversion‑first mindset.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {[{
              title: "Outcome‑driven",
              desc: "Every screen is measured by impact—speed, conversion, or retention.",
              Icon: ShieldCheck,
            },{
              title: "Collaborative",
              desc: "We ship side‑by‑side with your team and keep comms crystal clear.",
              Icon: Handshake,
            },{
              title: "Launch‑ready",
              desc: "CI/CD, analytics, and error tracking wired from day one.",
              Icon: Rocket,
            }].map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="glass p-6 rounded-2xl border border-primary/20 h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-lg mb-1">{title}</div>
                <p className="text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-10" />
        <div className="absolute inset-0 gradient-pink opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">Our Services</h2>
            <p className="text-muted-foreground text-lg mt-2">A focused toolkit for modern product teams.</p>
          </motion.div>

          {(() => {
            const items = [
              { label: "E‑commerce", Icon: Store, color: "from-slate-700 to-slate-800" },
              { label: "Finance", Icon: Landmark, color: "from-emerald-700 to-emerald-800" },
              { label: "AI", Icon: Bot, color: "from-purple-700 to-purple-800" },
              { label: "Automation", Icon: Sparkles, color: "from-cyan-700 to-cyan-800" },
              { label: "UI/UX Design", Icon: Palette, color: "from-rose-700 to-rose-800" },
              { label: "Rapid Delivery", Icon: Gauge, color: "from-amber-700 to-amber-800" },
              { label: "Analytics", Icon: BarChart3, color: "from-teal-700 to-teal-800" },
              { label: "Cloud", Icon: Cloud, color: "from-violet-700 to-violet-800" },
            ] as const
            return (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {items.map(({ label, Icon, color }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="rounded-2xl p-5 glass border border-primary/20"
                    style={{
                      backgroundImage: `linear-gradient(145deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15)), linear-gradient(145deg, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div className={`w-10 h-10 rounded-lg grid place-items-center mb-3 bg-gradient-to-br ${color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-medium text-white/90">{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )
          })()}
        </div>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 gradient-purple opacity-10" />
        <div className="absolute inset-0 gradient-pink opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <TeamSection />
        </div>
      </section>

      {/* Simple process timeline */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-10" />
        <div className="absolute inset-0 gradient-pink opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">How We Work</h2>
            <p className="text-muted-foreground text-lg mt-2">From idea to shipped in days, not months.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {["Discover", "Design", "Deliver"].map((phase, idx) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-6 rounded-2xl border border-primary/20"
              >
                <div className="text-sm text-primary mb-1">Step {idx + 1}</div>
                <div className="font-semibold text-lg mb-2">{phase}</div>
                <p className="text-muted-foreground">
                  {idx === 0 && "We align on goals, success metrics, and the fastest path to value."}
                  {idx === 1 && "We craft flows and interfaces that convert, then validate quickly."}
                  {idx === 2 && "We integrate, test, and launch with monitoring, analytics, and docs."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}



