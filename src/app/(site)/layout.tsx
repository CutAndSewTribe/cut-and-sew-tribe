import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://cutandsewtribe.com"
  ),
  title: {
    default: "Cut And Sew Tribe | Online Fashion School",
    template: "%s | Cut And Sew Tribe",
  },
  description:
    "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level.",
  keywords: [
    "fashion design course Nigeria",
    "online sewing classes",
    "pattern drafting",
    "dressmaking training",
    "Cut And Sew Tribe",
  ],
  openGraph: {
    type: "website",
    siteName: "Cut And Sew Tribe",
    title: "Cut And Sew Tribe | Online Fashion School",
    description:
      "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level.",
    url: "/",
    images: ["/images/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cut And Sew Tribe | Online Fashion School",
    description:
      "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level.",
    images: ["/images/og-image.jpg"],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cut And Sew Tribe",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://cutandsewtribe.com",
  email: "cutandsewtribelimited@gmail.com",
  sameAs: [
    "https://www.instagram.com/cutandsewtribelimited",
    "https://www.tiktok.com/@cutandsewtribe",
    "https://youtube.com/@cutandsewtribe",
    "https://www.facebook.com/divinebridal.babiesworld",
    "https://wa.me/message/2Y2LBLT47JAFD1",
  ],
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      <Header />

      {children}

      <Footer />

      <WhatsAppButton />
    </>
  );
}