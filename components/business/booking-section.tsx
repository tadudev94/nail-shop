import { siteConfig } from "@/config/site"
import { MapPin, Phone, Clock } from "lucide-react"

export function BookingSection() {
    return (
        <section id="contact" className="py-20 bg-primary/5">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl font-bold font-heading">Đặt bàn & Giao hàng</h2>
                    <p className="text-xl text-muted-foreground">Ghé thăm hoặc liên hệ trực tiếp để được tư vấn tốt nhất</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="grid gap-6">
                            <div className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Địa chỉ</h3>
                                    <p className="text-muted-foreground">{siteConfig.contact.address}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Hotline / Zalo</h3>
                                    <p className="text-muted-foreground">{siteConfig.contact.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Giờ mở cửa</h3>
                                    <p className="text-muted-foreground">09:00 - 20:00 (Hàng ngày)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="space-y-4 order-1 lg:order-2 h-full min-h-[300px]">
                        <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg border-4 border-background">
                            <iframe
                                src={siteConfig.contact.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '300px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
