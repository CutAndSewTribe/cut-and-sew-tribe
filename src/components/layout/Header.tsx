import Image from "next/image";
import Link from "next/link";

import MobileMenu from "./MobileMenu";

import { SearchBar } from "@/components/shared";

import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const navigation = [
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

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cutandsewtribelimited",
    icon: FaInstagram,
    className: "text-pink-600",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cutandsewtribe",
    icon: FaTiktok,
    className: "text-black",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/message/2Y2LBLT47JAFD1",
    icon: FaWhatsapp,
    className: "text-green-600",
  },
];

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Cut And Sew Tribe home"
        >
          <Image
            src="/brand/cast-logo.png"
            alt="CAST — Cut And Sew Tribe"
            width={120}
            height={120}
            priority
            className="h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-[#661093]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden w-72 lg:block">
          <SearchBar />
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`${item.className} transition hover:scale-110`}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <Link
            href="/courses"
            className="
              rounded-full
              bg-[#661093]
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#7A16AF]
            "
          >
            Start Learning
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}