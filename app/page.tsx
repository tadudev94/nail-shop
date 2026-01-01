import { Hero } from "@/components/business/hero"
import { ServicesGrid } from "@/components/business/services-grid"
import { GalleryGrid } from "@/components/business/gallery-grid"
import { ReviewsCarousel } from "@/components/business/reviews-carousel"
import { BookingSection } from "@/components/business/booking-section"
import { FloatingContact } from "@/components/business/floating-contact"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <ThemeProvider />
      <FloatingContact />

      {siteConfig.sections.hero && <Hero />}
      {siteConfig.sections.services && <ServicesGrid />}
      {siteConfig.sections.gallery && <GalleryGrid />}
      {siteConfig.sections.reviews && <ReviewsCarousel />}
      {siteConfig.sections.contact && <BookingSection />}

      {/* Footer */}
      <footer className="bg-muted py-12 text-center text-muted-foreground border-t">
        <div className="container px-4">
          <p className="font-serif text-lg mb-2">{siteConfig.name}</p>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
