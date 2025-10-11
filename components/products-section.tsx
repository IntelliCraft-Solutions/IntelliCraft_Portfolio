import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star, Sparkles } from "lucide-react"

export function ProductsSection() {
  const products = [
    {
      title: "E-commerce Pro",
      description: "Enterprise-ready e-commerce platform with advanced features and integrations.",
      image: "/modern-ecommerce-dashboard.png",
      features: ["Payment Gateway", "Inventory Management", "Admin Dashboard", "Analytics", "Multi-vendor Support"],
      status: "Production Ready",
      rating: 4.9,
      clients: "25+ businesses",
    },
    {
      title: "FinanceFlow",
      description: "Comprehensive finance and bill management solution for small to medium businesses.",
      image: "/finance-management-dashboard-with-charts.jpg",
      features: ["Bill Tracking", "Payment Management", "Financial Reports", "Inventory Control", "Tax Management"],
      status: "Beta Testing",
      rating: 4.8,
      clients: "15+ businesses",
    },
    {
      title: "AI Agent Suite",
      description: "Custom AI agents and automation tools to streamline your business processes.",
      image: "/ai-agent-interface-with-automation-workflows.jpg",
      features: ["Custom AI Agents", "Process Automation", "Data Analysis", "Integration APIs", "Real-time Monitoring"],
      status: "In Development",
      rating: 4.7,
      clients: "10+ early adopters",
    },
  ]

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-pink opacity-20" />
      <div className="absolute inset-0 gradient-purple opacity-15" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-balance mb-8">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground text-balance max-w-4xl mx-auto leading-relaxed">
            Ready-to-deploy solutions that have been battle-tested in production environments. Get started quickly with
            our <span className="text-primary font-semibold">proven products</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group glass hover:animate-glow transition-all duration-500 hover:-translate-y-3 overflow-hidden border-primary/20 hover:border-primary/40"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={product.status === "Production Ready" ? "default" : "secondary"}
                    className="glass animate-pulse-glow border-primary/30"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {product.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">
                    {product.title}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse-glow" />
                    <span className="text-lg font-bold text-primary">{product.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="outline"
                          className="text-sm glass border-primary/30 hover:border-primary/60 transition-colors"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-base text-muted-foreground glass rounded-lg p-3">
                    <strong className="text-primary">Trusted by:</strong> {product.clients}
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 animate-glow text-lg py-6">
                      Get Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="glass border-primary/30 hover:border-primary/60 p-6 bg-transparent"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
