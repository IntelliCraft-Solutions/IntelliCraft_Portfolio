import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsSection } from "@/components/products-section"

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsSection title="All Products" showMoreCta={false} />
      <Footer />
    </main>
  )
}


