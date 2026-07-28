"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Overview",
    href: "",
  },
  {
    label: "Modules",
    href: "/modules",
  },
  {
    label: "Lessons",
    href: "/lessons",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Students",
    href: "/students",
  },
  {
    label: "Reviews",
    href: "/reviews",
  },
  {
    label: "Announcements",
    href: "/announcements",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

interface Props {
  courseId: string;
}

export default function CourseBuilderSidebar({
  courseId,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <nav className="p-3">

        {items.map((item) => {
          const href =
            `/instructor/courses/${courseId}${item.href}`;

          const active =
            pathname === href;

          return (
            <Link
              key={item.label}
              href={href}
              className={`mb-2 block rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-[#661093] text-white"
                  : "hover:bg-neutral-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

      </nav>

    </div>
  );
}