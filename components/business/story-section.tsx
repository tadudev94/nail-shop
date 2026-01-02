import { Button } from "@/components/ui/button"

export function StorySection() {
    return (
        <section id="about" className="py-20 md:py-24 bg-surface-light dark:bg-surface-dark/5">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                    <div className="w-full md:w-1/2">
                        <div
                            className="aspect-[4/3] w-full rounded-2xl bg-cover bg-center shadow-lg"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdPU67zss359tiQOpv6ZKmCx-QlSX9x9WhhP2dxoiBzUk8hkr7XV_2BKr-OWjoXkuMdr7M22K2DXSDjmYmwxgXEmed9b12PIziJbuwc7sxgmHQb-In68GfrVHlAK5Ji0on0jxYpGzeRcZriKyY8jb8tKBiu0B4gPWNeZET2W2nGOZ2Myyyl8x2H6JyvaW9_cQw6-2MfVIQ9jfpo46mXE9vN4hjFiTI6OloAUTD60J_4kJvNEj3kgCxwqMZCqjCDZuSn49avKOX8A")' }}
                            role="img"
                            aria-label="Barista pouring coffee beans"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground tracking-tight">Về Cafe Aroma</h2>
                        <h3 className="text-xl font-bold text-primary">From Bean to Cup</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            We started Cafe Aroma with a simple mission: to source the finest beans from sustainable farms and roast them to perfection right here in the city. Every cup tells a story of passion, precision, and community.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Hương vị cà phê đậm đà, không gian ấm cúng và sự tận tâm trong từng ly nước uống là những gì chúng tôi muốn mang lại cho bạn.
                        </p>
                        <Button variant="link" className="text-primary font-bold p-0 h-auto hover:no-underline text-lg">
                            Xem thêm câu chuyện &rarr;
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
