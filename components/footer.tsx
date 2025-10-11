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
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Company Info & Newsletter */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-4">TechFlow</div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Premium e-commerce, finance, and AI solutions for modern businesses. Built for scale, designed for
                success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Get the latest updates on our products and services.</p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
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
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">© 2025 TechFlow Solutions. All rights reserved.</div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
