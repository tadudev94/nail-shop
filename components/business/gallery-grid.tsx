import galleryData from "@/data/gallery.json"
import Image from "next/image"

export function GalleryGrid() {
    // In a real app we might use a proper Lightbox library like yet-another-react-lightbox
    // For this template, we'll keep it simple layout-wise.

    return (
        <section id="gallery" className="py-20 bg-muted/20">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">Thư viện ảnh</h2>
                    <p className="text-muted-foreground">Những tác phẩm đẹp nhất của chúng tôi</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 px-4">
                    {galleryData.map((image, idx) => (
                        <div key={idx} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in">
                            <div className="relative aspect-[3/4] w-full bg-muted">
                                {/* 
                  Using placeholder images if local images are missing. 
                  In production, these would be real images.
                */}
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white font-medium">{image.alt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
