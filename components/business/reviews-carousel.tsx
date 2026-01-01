"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Star } from "lucide-react"
import reviewsData from "@/data/reviews.json"

export function ReviewsCarousel() {
    return (
        <section id="reviews" className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">Khách hàng nói gì</h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {reviewsData.map((review, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="h-full border-none bg-muted/30">
                                        <CardContent className="flex flex-col gap-4 p-6">
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-lg italic text-muted-foreground flex-1">"{review.content}"</p>
                                            <div className="mt-auto">
                                                <p className="font-semibold">{review.name}</p>
                                                <p className="text-xs text-muted-foreground">{review.date}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
