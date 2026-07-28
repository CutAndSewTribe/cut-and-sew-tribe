import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://your-domain.com"
  ),

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
    title:
      "Cut & Sew Tribe | Fashion Design Academy",

    description:
      "Learn fashion design, sewing, pattern drafting, and garment creation.",

    type: "website",

    siteName:
      "Cut & Sew Tribe",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "Cut & Sew Tribe Fashion Design Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Cut & Sew Tribe | Fashion Design Academy",

    description:
      "Learn fashion design, sewing, pattern drafting, and garment creation.",

    images: [
      "/images/og-image.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <WhatsAppButton />

        <Footer />
      </body>
    </html>
  );
}