import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import servicesData from "@/data/services.json"
import { siteConfig } from "@/config/site"

interface ServiceItem {
    name: string
    price: string
    description: string
}

interface ServiceCategory {
    category: string
    items: ServiceItem[]
}

export function ServicesGrid() {
    const services = servicesData as ServiceCategory[]

    const title = siteConfig.theme === 'food' ? "Thực đơn hôm nay" : "Dịch vụ & Bảng giá"

    return (
        <section id="services" className="py-20 md:py-32 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">{title}</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((category, idx) => (
                        <Card key={idx} className="border-none shadow-none bg-muted/30">
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-2xl font-serif text-primary">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex justify-between items-start group">
                                        <div className="space-y-1">
                                            <div className="font-medium text-lg group-hover:text-primary transition-colors">{item.name}</div>
                                            <div className="text-sm text-muted-foreground line-clamp-2">{item.description}</div>
                                        </div>
                                        <div className="font-bold text-lg whitespace-nowrap pl-4">{item.price}</div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
