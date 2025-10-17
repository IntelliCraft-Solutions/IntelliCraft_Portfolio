"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import NightSkyBackground from "@/components/night-sky-background"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative">
      <NightSkyBackground />
      <Header />

      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-20" />
        <div className="absolute inset-0 gradient-pink opacity-15" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              We respect your privacy. The full policy will be published here.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


