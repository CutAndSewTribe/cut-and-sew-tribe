import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.cutandsewtribe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Cut & Sew Tribe | Online Fashion Design & Sewing Academy",
    template: "%s | Cut & Sew Tribe",
  },

  description:
    "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level through practical online training.",

  keywords: [
    "fashion design",
    "online sewing classes",
    "pattern drafting",
    "dressmaking",
    "garment construction",
    "fashion business",
    "online fashion school Nigeria",
    "fashion academy",
    "Cut and Sew Tribe",
  ],

  authors: [
    {
      name: "Cut & Sew Tribe",
      url: siteUrl,
    },
  ],

  creator: "Cut & Sew Tribe",
  publisher: "Cut & Sew Tribe",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Cut & Sew Tribe",
    title: "Cut & Sew Tribe | Online Fashion Design & Sewing Academy",
    description:
      "Practical fashion design and sewing education with courses, tutorials, downloadable patterns, and a thriving creative community.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cut & Sew Tribe Fashion Design Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cut & Sew Tribe | Online Fashion Design & Sewing Academy",
    description:
      "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level.",
    images: ["/images/og-image.jpg"],
  },

  category: "education",

  icons: {
    icon: "/brand/cast-logo.png",
    shortcut: "/brand/cast-logo.png",
    apple: "/brand/cast-logo.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Cut & Sew Tribe",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  description:
    "Online fashion design, sewing, and pattern drafting academy for beginners and professionals.",
  email: "cutandsewtribelimited@gmail.com",
  sameAs: [
    "https://www.instagram.com/cutandsewtribelimited",
    "https://www.tiktok.com/@cutandsewtribe",
    "https://youtube.com/@cutandsewtribe",
    "https://www.facebook.com/divinebridal.babiesworld",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}