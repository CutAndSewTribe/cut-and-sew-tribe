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
];


export default function MobileMenu() {

  const [open, setOpen] = useState(false);


  return (
    <div className="md:hidden">


      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border px-3 py-2 text-sm"
      >
        Menu
      </button>



      {open && (
        <nav className="absolute left-0 right-0 top-full border-b bg-white px-6 py-5 shadow">


          <div className="flex flex-col gap-4">


            {navigation.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-700 hover:text-[#661093]"
              >
                {item.label}
              </Link>

            ))}



            <Link
              href="/courses"
              className="rounded-full bg-[#661093] px-5 py-2 text-center text-sm font-medium text-white"
            >
              Start Learning
            </Link>


          </div>


        </nav>
      )}


    </div>
  );
}