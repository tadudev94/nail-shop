import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-muted/20">
            {/* Background Image */}
            {siteConfig.heroImage && (
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src={siteConfig.heroImage}
                        alt="Hero Banner"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                    />
                </div>
            )}

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 z-0 bg-black/10 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

            <div className="container relative z-10 px-4 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="space-y-4">
                    <p className="text-xl md:text-2xl font-serif italic text-white/90 font-medium tracking-wide drop-shadow-md">
                        Welcome to
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-heading drop-shadow-lg">
                        {siteConfig.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        {siteConfig.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary" asChild>
                        <Link href="#contact">Liên Hệ Ngay</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 hover:text-white hover:border-white transition-colors" asChild>
                        <Link href="#services">Xem Dịch Vụ</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
