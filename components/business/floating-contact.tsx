"use client"

import { siteConfig } from "@/config/site"
import { Phone, MessageCircle, Facebook } from "lucide-react"
import Link from "next/link"

export function FloatingContact() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* Phone */}
            <Link
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
                title="Gọi ngay"
            >
                <Phone className="w-6 h-6" />
            </Link>

            {/* Zalo */}
            {siteConfig.contact.zalo && (
                <Link
                    href={siteConfig.contact.zalo}
                    target="_blank"
                    className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    title="Chat Zalo"
                >
                    <div className="font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Zalo</div>
                </Link>
            )}

            {/* Facebook */}
            {siteConfig.contact.facebook && (
                <Link
                    href={siteConfig.contact.facebook}
                    target="_blank"
                    className="flex items-center justify-center w-12 h-12 bg-[#1877F2] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    title="Facebook"
                >
                    <Facebook className="w-6 h-6" />
                </Link>
            )}
        </div>
    )
}
