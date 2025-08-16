import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})


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
    url: "https://taskflow.noncefirewall.tech",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/nonce-firewall-logo.png",
        width: 512,
        height: 512,
        alt: "TaskFlow Pro Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow Pro - Professional Task Management",
    description: "Advanced task management application with beautiful UI and comprehensive features",
    images: ["/images/nonce-firewall-logo.png"],
    creator: "@noncefirewall",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0891b2",
  manifest: "/manifest.json",
  icons: {
  icon: "/images/nonce-firewall-logo.png",
  apple: "/images/nonce-firewall-logo.png",
},
  generator: 'Nonce Firewall'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6039341852589617"
     crossorigin="anonymous"></script>
        <link rel="canonical" href="https://taskflow.noncefirewall.tech" />
        <meta name="application-name" content="TaskFlow Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TaskFlow Pro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#4F35E1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
