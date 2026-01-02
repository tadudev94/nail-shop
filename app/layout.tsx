import type React from "react"
import type { Metadata } from "next"
import {
  Be_Vietnam_Pro,
  Playfair_Display,
} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { siteConfig } from "@/config/site"
import "./globals.css"

// Define fonts - Using Be Vietnam Pro for better Vietnamese support
const beVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans"
})

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading"
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`
        ${beVietnamPro.variable} 
        ${playfair.variable} 
        font-sans antialiased
      `}>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
