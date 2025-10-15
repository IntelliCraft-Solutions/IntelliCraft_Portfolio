import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Services: ["E-commerce Solutions", "Finance Management", "AI Agent Solutions", "Custom Development", "Consulting"],
    Products: ["E-commerce Pro", "FinanceFlow", "AI Agent Suite", "Integration Tools", "Analytics Dashboard"],
    Company: ["About Us", "Case Studies", "Blog", "Careers", "Contact"],
    Support: ["Documentation", "Help Center", "Community", "Status Page", "Privacy Policy"],
  }

  return (
    <footer className="relative bg-slate-950/95 border-t border-slate-800">
      {/* Top separator line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Company Info & Newsletter */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">IntelliCraft Solutions</div>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                Premium e-commerce, finance, and AI solutions for modern businesses. Built for scale, designed for
                success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Stay Updated</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input placeholder="Enter your email" className="flex-1 text-sm sm:text-base" />
                <Button className="text-sm sm:text-base">Subscribe</Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Get the latest updates on our products and services.</p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-muted-foreground text-xs sm:text-sm">© 2025 IntelliCraft Solutions. All rights reserved.</div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
