import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaskFlow Pro - Professional Task Management | Nonce Firewall",
  description:
    "Advanced task management application with beautiful UI, priority tracking, and comprehensive filtering. Powered by Nonce Firewall for secure and efficient productivity.",
  keywords:
    "task management, productivity, project management, todo app, task tracker, priority management, team collaboration",
  authors: [{ name: "Nonce Firewall" }],
  creator: "Nonce Firewall",
  publisher: "Nonce Firewall",
  robots: "index, follow",
  openGraph: {
    title: "TaskFlow Pro - Professional Task Management",
    description: "Advanced task management application with beautiful UI and comprehensive features",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow Pro - Professional Task Management",
    description: "Advanced task management application with beautiful UI and comprehensive features",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e40af",
    generator: 'Nonce Firewall'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
