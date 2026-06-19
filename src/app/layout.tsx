import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: {
    default: "Cut & Sew Tribe | Fashion Design Academy",
    template: "%s | Cut & Sew Tribe",
  },

  description:
    "Learn fashion design, sewing, pattern drafting, and garment creation from beginner to professional level.",

  keywords: [
    "fashion design",
    "sewing courses",
    "pattern drafting",
    "dressmaking",
    "garment construction",
    "fashion academy",
  ],

  openGraph: {
    title: "Cut & Sew Tribe | Fashion Design Academy",

    description:
      "Learn fashion design, sewing, pattern drafting, and garment creation.",

    type: "website",

    siteName:
      "Cut & Sew Tribe",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>

    </html>
  );
}
