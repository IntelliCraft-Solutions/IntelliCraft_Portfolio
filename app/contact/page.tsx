import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import NightSkyBackground from "@/components/night-sky-background"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <NightSkyBackground />
      <Header />
      <ContactSection />
      <Footer />
    </main>
  )
}




