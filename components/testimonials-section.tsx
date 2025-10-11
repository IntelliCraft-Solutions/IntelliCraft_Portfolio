import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, RetailFlow",
      company: "E-commerce Startup",
      avatar: "/professional-woman-ceo.png",
      content:
        "TechFlow delivered our e-commerce platform in record time. The payment integration and inventory management features have streamlined our entire operation.",
      rating: 5,
      metric: "300% increase in sales",
    },
    {
      name: "Michael Chen",
      role: "Founder, FinanceFirst",
      company: "Financial Services",
      avatar: "/professional-man-founder.png",
      content:
        "The finance management tool has revolutionized how we handle our business finances. The reporting features alone have saved us hours each week.",
      rating: 5,
      metric: "50% time savings",
    },
    {
      name: "Emily Rodriguez",
      role: "CTO, AutomateNow",
      company: "Tech Startup",
      avatar: "/professional-woman-cto.png",
      content:
        "Their AI agent solution automated our customer service processes. The custom development was exactly what we needed to scale our operations.",
      rating: 5,
      metric: "80% automation achieved",
    },
    {
      name: "David Park",
      role: "Operations Manager",
      company: "Manufacturing Co.",
      avatar: "/professional-operations-manager.png",
      content:
        "Outstanding support and rapid deployment. The team understood our requirements perfectly and delivered a solution that exceeded expectations.",
      rating: 5,
      metric: "99.9% uptime",
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Digital Agency",
      avatar: "/professional-woman-marketing-director.jpg",
      content:
        "The custom e-commerce solution has helped our clients achieve remarkable growth. The analytics dashboard provides insights we never had before.",
      rating: 5,
      metric: "200% client growth",
    },
    {
      name: "James Wilson",
      role: "Startup Founder",
      company: "TechVenture",
      avatar: "/startup-founder.png",
      content:
        "From concept to deployment, TechFlow was with us every step. Their expertise in AI integration has given us a competitive edge in the market.",
      rating: 5,
      metric: "150% efficiency gain",
    },
  ]

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Client <span className="text-primary">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            See how our solutions have transformed businesses across various industries. Real results from real clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 glass border border-primary/20 bg-background/60 backdrop-blur-xl animate-glow"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                    {testimonial.metric}
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
