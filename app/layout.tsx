import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Git Wrapped 24",
  description: "Visualize your GitHub contributions in a beautiful year-in-review dashboard. Get insights into your coding activity and share your developer story.",
  keywords: [
    "GitHub",
    "Git",
    "Developer Stats",
    "Contribution Graph",
    "Code Analytics",
    "GitHub Wrapped",
    "Developer Tools",
    "Git Statistics",
  ],
  authors: [{ name: "fal3n-4ngel" }],
  creator: "fal3n-4ngel",
  publisher: "fal3n-4ngel",
  robots: "index, follow",
  
  // OpenGraph metadata
  openGraph: {
    type: "website",
    title: "Git Wrapped 24 - Your Coding Year in Review",
    description: "Visualize your GitHub contributions in a beautiful year-in-review dashboard. Get insights into your coding activity and share your developer story.",
    siteName: "Git Wrapped 24",
    url: "https://git-wrapped.vercel.app",
    images: [
      {
        url: "/example.png", 
        width: 1200,
        height: 630,
        alt: "Git Wrapped 24 Preview",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Git Wrapped 24 - Your Coding Year in Review",
    description: "Visualize your GitHub contributions in a beautiful year-in-review dashboard. Get insights into your coding activity and share your developer story.",
    creator: "@fal3n_4ngel",
    images: ["/example.png"], 
  },

  // Additional metadata
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ffffff",
  category: "Developer Tools",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://git-wrapped.vercel.app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}