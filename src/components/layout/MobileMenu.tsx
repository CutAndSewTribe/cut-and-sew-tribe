"use client";

import Link from "next/link";
import { useState } from "react";

import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
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

const communityLinks = [
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

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
        className="
          inline-flex
          items-center
          justify-center
          rounded-full
          border
          border-neutral-200
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-neutral-800
          shadow-sm
          transition
          hover:border-[#661093]
          hover:text-[#661093]
          focus:outline-none
          focus:ring-2
          focus:ring-[#661093]/30
        "
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/20"
          />

          <nav
            id="mobile-navigation"
            className="
              absolute
              right-0
              top-[calc(100%+0.75rem)]
              z-50
              w-[min(20rem,calc(100vw-2rem))]
              overflow-hidden
              rounded-2xl
              border
              border-neutral-200
              bg-white
              p-3
              shadow-xl
            "
          >
            <div className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-neutral-700
                    transition
                    hover:bg-[#661093]/5
                    hover:text-[#661093]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#661093]/30
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-2 border-t border-neutral-100 pt-3">
              <Link
                href="/courses"
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#661093]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#7A16AF]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#661093]/30
                "
              >
                Start Learning
              </Link>
            </div>

            <div className="mt-3 border-t border-neutral-100 pt-4">
              <p className="px-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                Connect with us
              </p>

              <div className="mt-3 grid grid-cols-4 gap-2 px-1">
                {communityLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-neutral-200
                        text-neutral-600
                        transition
                        hover:border-[#661093]
                        hover:bg-[#661093]/5
                        hover:text-[#661093]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#661093]/30
                      "
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}