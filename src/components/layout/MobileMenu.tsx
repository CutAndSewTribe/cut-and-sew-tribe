"use client";

import Link from "next/link";
import { useState } from "react";


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
    label: "WhatsApp",
    href: "https://wa.me/",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
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
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((value) => !value)}
        className="rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#661093]"
      >
        {open ? "Close" : "Menu"}
      </button>



      {open && (
        <nav
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-50 border-b bg-white px-6 py-5 shadow"
        >

          <div className="flex flex-col gap-4">


            {navigation.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-700 transition hover:text-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]"
              >
                {item.label}
              </Link>

            ))}



            <Link
              href="/courses"
              className="rounded-full bg-[#661093] px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-[#7A16AF] focus:outline-none focus:ring-2 focus:ring-[#661093]"
            >
              Start Learning
            </Link>



            <div className="mt-3 border-t pt-4">

              <p className="mb-3 text-sm font-semibold text-neutral-800">
                Community
              </p>


              <div className="flex flex-wrap gap-3">

                {communityLinks.map((item) => (

                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-3 py-2 text-sm text-neutral-700 hover:border-[#661093] hover:text-[#661093]"
                  >
                    {item.label}
                  </a>

                ))}

              </div>

            </div>


          </div>


        </nav>
      )}


    </div>
  );
}