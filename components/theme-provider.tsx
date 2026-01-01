"use client"

import { siteConfig } from "@/config/site"
import { themes } from "@/config/theme"
import { useEffect } from "react"

export function ThemeProvider() {
  useEffect(() => {
    const theme = themes[siteConfig.theme]
    if (!theme) return

    const root = document.documentElement

    // Inject colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, `hsl(${value})`)
    })

    // Inject radius
    root.style.setProperty("--radius", theme.radius)

    // Inject fonts variables mappings
    root.style.setProperty("--font-current-heading", theme.fonts.heading)
    root.style.setProperty("--font-current-body", theme.fonts.body)

    // Enforce fonts via style tag or direct property
    // We can't easily change the class definition of 'font-sans', but we can set body style
    document.body.style.fontFamily = theme.fonts.body

    // We can use a small style block to enforce headings
    const styleId = "theme-font-styles"
    let styleEl = document.getElementById(styleId) as HTMLStyleElement
    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    styleEl.innerHTML = `
      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.fonts.heading}, sans-serif !important;
      }
      .font-heading {
        font-family: ${theme.fonts.heading}, sans-serif !important;
      }
      body {
        font-family: ${theme.fonts.body}, sans-serif !important;
      }
    `

  }, [])

  return null
}
