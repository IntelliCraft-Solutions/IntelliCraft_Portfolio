"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronRight, ArrowUpRight } from "lucide-react"
import NightSkyBackground from "@/components/night-sky-background"
import { CircuitBackground } from "@/components/circuit-background"
import { RobotLighting } from "@/components/robot-lighting"

// Featured blog posts for the carousel
const featuredPosts = [
  {
    id: 1,
    title: "Sophia Mesabhi from IntelliCraft Solutions on Sustainable and Profitable Growth & What We Can Learn From Modern E-commerce",
    excerpt: "How our team built scalable solutions that drive real business value while maintaining sustainable growth practices.",
    author: "Frankie Sullivan",
    authorImage: "/placeholder-user.jpg",
    date: "10 April 2025",
    tags: ["Design", "Retail", "Interviews"],
    readTime: "12 min read",
    image: "/modern-ecommerce-dashboard.png",
    category: "Company Updates"
  },
  {
    id: 2,
    title: "Launching AI Agent Suite Beta: Automating Support and Operations for SMBs",
    excerpt: "Our latest AI-powered workflow automation tools are now available in beta, helping small businesses streamline their operations.",
    author: "Demi Wilkinson",
    authorImage: "/placeholder-user.jpg",
    date: "16 Jan 2025",
    tags: ["AI", "Automation", "Beta"],
    readTime: "8 min read",
    image: "/ai-agent-interface-with-automation-workflows.jpg",
    category: "Product Launch"
  },
  {
    id: 3,
    title: "FinanceFlow: From Bills to Insights - Building Finance Tools Teams Actually Use",
    excerpt: "What we learned building finance tools that teams actually use, and how we achieved 40% faster financial reporting.",
    author: "Candice Wu",
    authorImage: "/placeholder-user.jpg",
    date: "15 Jan 2025",
    tags: ["Finance", "Tools", "Insights"],
    readTime: "10 min read",
    image: "/finance-management-dashboard-with-charts.jpg",
    category: "Case Study"
  },
  {
    id: 4,
    title: "Designing High-Conversion E-commerce: Patterns That Drove +30% Conversion",
    excerpt: "The design patterns and user experience strategies that helped our clients achieve significant conversion improvements.",
    author: "Lana Steiner",
    authorImage: "/placeholder-user.jpg",
    date: "18 Jan 2025",
    tags: ["Design", "E-commerce", "Conversion"],
    readTime: "14 min read",
    image: "/modern-ecommerce-dashboard.png",
    category: "Design Insights"
  }
]

// Regular blog posts for the grid
const blogPosts = [
  {
    title: "Interview with Photographer & UX Designer, Viola LeBlanc",
    excerpt: "A deep dive into the creative process of our lead UX designer who has worked with companies like Spotify and Nike.",
    author: "Demi Wilkinson",
    date: "16 Jan 2025",
    image: "/placeholder.jpg",
    category: "Interviews"
  },
  {
    title: "Improve Your Design Skills: Develop an 'Eye' for Design",
    excerpt: "Essential techniques for developing your design intuition and creating more effective user interfaces.",
    author: "Candice Wu",
    date: "15 Jan 2025",
    image: "/placeholder.jpg",
    category: "Design"
  },
  {
    title: "A Relentless Pursuit of Perfection in Product Design",
    excerpt: "Exploring the contrast between well-made and poorly made products, and what makes design truly exceptional.",
    author: "Lana Steiner",
    date: "18 Jan 2025",
    image: "/placeholder.jpg",
    category: "Product Design"
  },
  {
    title: "A Continually Unfolding History - Made by Hand",
    excerpt: "How traditional craftsmanship informs our modern digital product development approach.",
    author: "Phoenix Baker",
    date: "19 Jan 2025",
    image: "/placeholder.jpg",
    category: "Craftsmanship"
  },
  {
    title: "How Remote Collaboration Makes Us Better Designers",
    excerpt: "The benefits of remote work and collaboration tools in strengthening design teams and improving outcomes.",
    author: "Natali Craig",
    date: "14 Jan 2025",
    image: "/placeholder.jpg",
    category: "Remote Work"
  },
  {
    title: "Best Books on Scaling Your Early-Stage Startup",
    excerpt: "Essential reading list for entrepreneurs looking to scale their early-stage companies effectively.",
    author: "Natali Craig",
    date: "14 Jan 2025",
    image: "/placeholder.jpg",
    category: "Startup"
  },
  {
    title: "How to Run a Successful Business With Your Partner",
    excerpt: "Practical advice on starting and running a business with your partner, based on our own experience.",
    author: "Frankie Sullivan",
    date: "12 Jan 2025",
    image: "/placeholder.jpg",
    category: "Business"
  },
  {
    title: "Why Food Matters - Disease Prevention & Treatment",
    excerpt: "How proper nutrition and healthy eating habits can prevent diseases and improve overall health outcomes.",
    author: "Candice Wu",
    date: "12 Jan 2025",
    image: "/placeholder.jpg",
    category: "Health"
  },
  {
    title: "Conversations with London Makr & Co.",
    excerpt: "An exclusive interview with a leading brand and product design studio about their creative process.",
    author: "Natali Craig",
    date: "10 Jan 2025",
    image: "/placeholder.jpg",
    category: "Interviews"
  }
]

export default function BlogPage() {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)

  // Auto-rotate featured posts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredPosts.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <main className="min-h-screen">
      <NightSkyBackground />
      <Header />
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-purple opacity-20" />
        <div className="absolute inset-0 gradient-pink opacity-15" />

        {/* Circuit background pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CircuitBackground />
        </div>
        
        {/* Robot lighting effects */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <RobotLighting />
        </div>

        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-24 left-1/3 w-[70vw] max-w-[48rem] aspect-square rounded-full blur-[100px] opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(168,85,247,0.18), rgba(236,72,153,0.08) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
              className="mb-12 mx-8 sm:mx-12 lg:mx-16 text-center"
            >
            {/* <motion.div variants={item} className="text-sm text-primary/70 mb-4">
              Home → Blog/News
            </motion.div> */}
            
            <motion.h1 variants={item} className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
              Blog/<span className="text-gradient animate-text-glow">News</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
              Featuring works from our studio. Subscribe to get notified when we publish new posts.
            </motion.p>
          </motion.div>

          {/* Featured Post Carousel */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mb-12"
          >
            <motion.div variants={item} className="relative h-[350px] sm:h-[400px] lg:h-[450px] mx-8 sm:mx-12 lg:mx-16 rounded-2xl overflow-hidden group cursor-pointer animate-glow">
              <AnimatePresence mode="wait" custom={1}>
                <motion.div
                  key={currentFeaturedIndex}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${featuredPosts[currentFeaturedIndex].image})` }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white">
                      <div className="max-w-4xl">
                        <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                          {featuredPosts[currentFeaturedIndex].category}
                        </Badge>
                        
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                          {featuredPosts[currentFeaturedIndex].title}
                        </h2>
                        
                        <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                          {featuredPosts[currentFeaturedIndex].excerpt}
                        </p>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-white/70">Written by</span>
                            <div className="flex items-center gap-2">
                              <img 
                                src={featuredPosts[currentFeaturedIndex].authorImage} 
                                alt={featuredPosts[currentFeaturedIndex].author}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="font-medium">{featuredPosts[currentFeaturedIndex].author}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-white/70">Published on</span>
                            <span className="font-medium">{featuredPosts[currentFeaturedIndex].date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-white/70">File under</span>
                            <div className="flex gap-1">
                              {featuredPosts[currentFeaturedIndex].tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-white/10 text-white border-white/30">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{featuredPosts[currentFeaturedIndex].readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeaturedIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentFeaturedIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Blog Posts Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mb-8 mx-8 sm:mx-12 lg:mx-16"
          >
            <motion.div variants={item} className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold animate-text-glow">Featured blog posts</h3>
              <Button variant="ghost" className="text-primary hover:text-primary/80 animate-glow">
                View all posts <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            <motion.div
              variants={container}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {blogPosts.map((post, index) => (
              <motion.div
                  key={post.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.995 }}
                  className="group cursor-pointer"
                >
                  <Card className="glass border-primary/20 hover:border-primary/50 transition-all overflow-hidden animate-glow">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-5 h-5 text-white bg-black/50 rounded p-1" />
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <Badge variant="secondary" className="w-fit mb-2 text-xs">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                  </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <img 
                          src="/placeholder-user.jpg" 
                          alt={post.author}
                          className="w-4 h-4 rounded-full"
                        />
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </motion.div>
          </motion.div>

          {/* Load More Button */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="text-center mx-8 sm:mx-12 lg:mx-16"
          >
            <motion.div variants={item}>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full animate-glow">
                Loading more...
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}



