import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";


const exploreLinks = [
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Videos",
    href: "/videos",
  },
  {
    label: "Patterns",
    href: "/patterns",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Success Stories",
    href: "/success-stories",
  },
  {
    label: "Community",
    href: "/community",
  },
];


const supportLinks = [
  {
    label: "Search",
    href: "/search",
  },
  {
    label: "About",
    href: "/",
  },
];


const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/divinebridal.babiesworld",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cutandsewtribelimited",
    icon: FaInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cutandsewtribe",
    icon: FaTiktok,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@cutandsewtribe",
    icon: FaYoutube,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/message/2Y2LBLT47JAFD1",
    icon: FaWhatsapp,
  },
];


export default function Footer() {

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">


        <div>

          <h2 className="text-lg font-semibold text-[#661093]">
            Cut & Sew Tribe
          </h2>


          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Learn fashion design, sewing, pattern drafting,
            and garment creation from beginner level to
            professional mastery.
          </p>

        </div>



        <div>

          <h3 className="font-medium">
            Explore
          </h3>


          <div className="mt-4 flex flex-col gap-3 text-sm">

            {exploreLinks.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-600 hover:text-[#661093]"
              >
                {item.label}
              </Link>

            ))}

          </div>

        </div>



        <div>

          <h3 className="font-medium">
            Support
          </h3>


          <div className="mt-4 flex flex-col gap-3 text-sm">

            {supportLinks.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-600 hover:text-[#661093]"
              >
                {item.label}
              </Link>

            ))}

          </div>

        </div>




        <div>

          <h3 className="font-medium">
            Community
          </h3>


          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Join creatives building professional fashion
            skills and turning ideas into garments.
          </p>

<p className="mt-3 text-sm text-neutral-600">
  Email: <a href="mailto:cutandsewtribelimited@gmail.com" className="text-[#661093] hover:underline">
    cutandsewtribelimited@gmail.com
  </a>
</p>

          <div className="mt-5 flex flex-wrap gap-3">

            {socialLinks.map((item) => {

              const Icon = item.icon;


              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full border border-neutral-200
                    text-neutral-700
                    transition
                    hover:border-[#661093]
                    hover:text-[#661093]
                  "
                >

                  <Icon size={18} />

                </a>
              );

            })}

          </div>


        </div>



      </div>



      <div className="border-t border-neutral-200 px-6 py-5 text-center text-sm text-neutral-500">

        © {new Date().getFullYear()} Cut & Sew Tribe.
        All rights reserved.

      </div>


    </footer>
  );
}