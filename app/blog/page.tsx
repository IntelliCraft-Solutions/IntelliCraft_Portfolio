"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const posts = [
  {
    title: "Launching AI Agent Suite Beta",
    excerpt: "How our agentic workflows automate support and ops for SMBs.",
    date: "2025-09-01",
  },
  {
    title: "Designing High‑Conversion E‑commerce",
    excerpt: "Patterns that drove +30% conversion across our storefronts.",
    date: "2025-07-12",
  },
  {
    title: "FinanceFlow: From Bills to Insights",
    excerpt: "What we learned building finance tools that teams actually use.",
    date: "2025-05-30",
  },
]

export default function BlogPage() {
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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.h1 variants={item} className="text-3xl sm:text-4xl lg:text-5xl font-black">
              Blog / <span className="text-gradient">News</span>
            </motion.h1>
            <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl mt-3">
              Updates, launches, and lessons from the studio.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {posts.map((p) => (
              <motion.div
                key={p.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.995 }}
              >
                <Card className="glass border-primary/20 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-2">{new Date(p.date).toDateString()}</div>
                    <p className="text-muted-foreground">{p.excerpt}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}



