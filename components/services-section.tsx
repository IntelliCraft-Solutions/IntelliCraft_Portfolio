import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Calculator, Bot, Code, Zap, Shield } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment gateways, inventory management, and admin dashboards.",
      features: ["Payment Integration", "Inventory Management", "Order Processing", "Analytics Dashboard"],
    },
    {
      icon: Calculator,
      title: "Finance Management",
      description: "Comprehensive finance and bill management tools with inventory tracking for small businesses.",
      features: ["Bill Management", "Payment Tracking", "Financial Reports", "Inventory Control"],
    },
    {
      icon: Bot,
      title: "AI Agent Solutions",
      description: "Custom AI agents and agentic solutions to automate and enhance your business processes.",
      features: ["Custom AI Agents", "Process Automation", "Data Analysis", "Integration Support"],
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Full-stack custom development services tailored to your specific business requirements.",
      features: ["Full-Stack Development", "API Integration", "Database Design", "Performance Optimization"],
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Quick deployment of ready-to-use solutions with minimal setup time and maximum efficiency.",
      features: ["Fast Setup", "Cloud Deployment", "Scalable Architecture", "Performance Monitoring"],
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description: "Comprehensive support and maintenance services to keep your solutions running smoothly.",
      features: ["24/7 Support", "Regular Updates", "Security Monitoring", "Performance Optimization"],
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-purple opacity-20" />
      <div className="absolute inset-0 gradient-pink opacity-15" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-balance mb-6 sm:mb-8">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground text-balance max-w-4xl mx-auto leading-relaxed">
            From ready-to-deploy solutions to custom development, we provide comprehensive services to accelerate your
            business growth with <span className="text-primary font-semibold">cutting-edge technology</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group glass hover:animate-glow transition-all duration-500 hover:-translate-y-2 border-primary/20 hover:border-primary/40"
            >
              <CardHeader>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 animate-pulse-glow">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm sm:text-base text-muted-foreground">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 sm:mr-4 animate-pulse-glow"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 glass border-primary/30 text-base sm:text-lg py-4 sm:py-6 bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
