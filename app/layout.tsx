import type React from "react"
import type { Metadata } from "next"
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Oswald,
  Roboto_Condensed,
  Cinzel,
  Open_Sans,
  Fredoka,
  Quicksand,
  Lato
} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { siteConfig } from "@/config/site"
import "./globals.css"

// Define fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-cormorant" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], variable: "--font-roboto-condensed" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" })
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })
const lato = Lato({ weight: ["100", "300", "400", "700", "900"], subsets: ["latin"], variable: "--font-lato" })

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
        ${inter.variable} 
        ${playfair.variable} 
        ${cormorant.variable} 
        ${oswald.variable} 
        ${robotoCondensed.variable} 
        ${cinzel.variable} 
        ${openSans.variable} 
        ${fredoka.variable} 
        ${quicksand.variable} 
        ${lato.variable}
        font-sans antialiased
      `}>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
