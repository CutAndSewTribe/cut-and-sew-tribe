import {
  Container,
  Section,
} from "@/components/ui";


import {
  PageHero,
  ContentCard,
  ContentGrid,
} from "@/components/shared";


import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";


const communityLinks = [
  {
    name: "Facebook",
    description:
      "Follow updates, student wins, and fashion announcements.",
    href: "https://facebook.com/",
    icon: FaFacebook,
    className: "text-blue-600",
  },

  {
    name: "Instagram",
    description:
      "See designs, inspiration, and student creations.",
    href: "https://instagram.com/",
    icon: FaInstagram,
    className: "text-pink-600",
  },

  {
    name: "TikTok",
    description:
      "Watch quick fashion tips and sewing content.",
    href: "https://tiktok.com/",
    icon: FaTiktok,
    className: "text-black",
  },

  {
    name: "YouTube",
    description:
      "Learn through tutorials and fashion lessons.",
    href: "https://youtube.com/",
    icon: FaYoutube,
    className: "text-red-600",
  },

  {
    name: "WhatsApp",
    description:
      "Chat with us and join the fashion community.",
    href: "https://wa.me/",
    icon: FaWhatsapp,
    className: "text-green-600",
  },
];


export default function CommunityPage() {

  return (
    <div>


      <PageHero
        label="Community"
        title="Join the Cut & Sew Tribe"
        description="
          Connect with fashion creatives,
          learn together, share progress,
          and grow your sewing skills.
        "
      />



      <Section>

        <Container>


          <ContentGrid>


            {communityLinks.map((item) => {

  const Icon = item.icon;


  return (

    <a
      key={item.name}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >

      <div className="rounded-xl border border-neutral-200 p-6 transition hover:border-[#661093]">

        <Icon
          className={`text-4xl ${item.className}`}
        />

        <ContentCard
          title={item.name}
          description={item.description}
          thumbnail=""
          meta="Join Community"
        />

      </div>

    </a>

  );

})}


          </ContentGrid>


        </Container>


      </Section>


    </div>
  );
}