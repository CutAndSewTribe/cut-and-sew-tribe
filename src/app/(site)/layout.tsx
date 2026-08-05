import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared";

export default function SiteLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<> <Header />
{children} <Footer /> <WhatsAppButton />
</>
);
}
