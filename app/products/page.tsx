import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsSection } from "@/components/products-section"
import NightSkyBackground from "@/components/night-sky-background"

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <NightSkyBackground />
      <Header />
      <ProductsSection title="All Products" showMoreCta={false} />
      <Footer />
    </main>
  )
}


