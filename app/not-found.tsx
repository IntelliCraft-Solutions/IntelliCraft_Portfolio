"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { WorkingRobot } from "@/components/ui/working-robot"

export default function NotFound() {
	const router = useRouter()
	return (
		<section className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden bg-background pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12">
			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
					{/* Left: Text */}
					<div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1">
						<h1 className="text-[80px] sm:text-[96px] leading-none font-black tracking-tight mb-3">
							<span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 drop-shadow">404</span>
						</h1>
						<h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Oops! You’re off the map.</h2>
						<p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
							The page you’re looking for doesn’t exist or may have moved. Let’s get you back on course.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
							<Button asChild size="lg" className="px-6 sm:px-8 py-5">
								<Link href="/" className="inline-flex items-center">
									<Home className="mr-2 h-5 w-5" />
									Go Home
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="px-6 sm:px-8 py-5 glass border-primary/30 hover:border-primary/60"
								onClick={() => router.back()}
							>
								<ArrowLeft className="mr-2 h-5 w-5" />
								Go Back
							</Button>
						</div>
					</div>

					{/* Right: Robot */}
					<div className="lg:col-span-6 relative h-[40vh] xs:h-[45vh] sm:h-[50vh] lg:h-[66vh] xl:h-[70vh] pointer-events-auto flex items-center justify-center lg:items-end order-1 lg:order-2">
						<div className="w-full h-full max-w-md lg:max-w-none">
							<WorkingRobot 
								scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
								className="w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Site-wide animated waves background */}
			<AnimatedBackground />
		</section>
	)
}
