import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
metadataBase: new URL(
process.env.NEXT_PUBLIC_APP_URL || "https://www.cutandsewtribe.com"
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
title: "Cut & Sew Tribe | Fashion Design Academy",
description:
"Learn fashion design, sewing, pattern drafting, and garment creation.",
type: "website",
siteName: "Cut & Sew Tribe",
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
title: "Cut & Sew Tribe | Fashion Design Academy",
description:
"Learn fashion design, sewing, pattern drafting, and garment creation.",
images: ["/images/og-image.jpg"],
},
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return ( <html lang="en"> <body>{children}</body> </html>
);
}
