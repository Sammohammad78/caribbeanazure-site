import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
  title: "Caribbean Azure | Slimme AI Automatisering",
  description:
    "Slimme automatisering die waarde oplevert. AI-workflows die tijd besparen en omzet verhogen.",
  keywords: ["AI", "automatisering", "integratie", "chatbots", "Nederland"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  }>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="bg-surface text-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
