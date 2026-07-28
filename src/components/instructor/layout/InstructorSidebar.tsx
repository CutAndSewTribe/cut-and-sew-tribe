"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

import { instructorNavigation } from "@/lib/instructor/navigation";

export default function InstructorSidebar() {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<
    Record<string, boolean>
  >({
    Courses: true,
  });

  function toggleGroup(title: string) {
    setOpenGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  }

  return (
    <aside
      className="
        hidden
        h-screen
        w-72
        shrink-0
        border-r
        border-neutral-200
        bg-white
        lg:flex
        lg:flex-col
      "
    >
      {/* Brand */}

      <div className="border-b border-neutral-200 px-8 py-7">

        <Link
          href="/instructor/dashboard"
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093] text-white">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div>

            <h2 className="text-lg font-bold">
              Cut & Sew Tribe
            </h2>

            <p className="text-sm text-neutral-500">
              Instructor CMS
            </p>

          </div>
        </Link>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-2">

          {instructorNavigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            if (!item.children) {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={[
                    "flex items-center gap-4 rounded-2xl px-4 py-3 transition",

                    active
                      ? "bg-[#661093] text-white shadow-lg"
                      : "text-neutral-700 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </Link>
              );
            }

            const opened =
              openGroups[item.title] ?? false;

            return (
              <div key={item.title}>

                <button
                  type="button"
                  onClick={() =>
                    toggleGroup(item.title)
                  }
                  className={[
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 transition",

                    active
                      ? "bg-[#661093]/10 text-[#661093]"
                      : "hover:bg-neutral-100",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-4">

                    <Icon className="h-5 w-5" />

                    <span className="font-medium">
                      {item.title}
                    </span>

                  </div>

                  {opened ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {opened && (
                  <div className="mt-2 ml-8 space-y-2">

                    {item.children.map(
                      (child) => {
                        const childActive =
                          pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={[
                              "block rounded-xl px-4 py-2 text-sm transition",

                              childActive
                                ? "bg-[#661093] text-white"
                                : "text-neutral-600 hover:bg-neutral-100",
                            ].join(" ")}
                          >
                            {child.title}
                          </Link>
                        );
                      }
                    )}

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-neutral-200 p-6">

        <div className="rounded-2xl bg-neutral-50 p-4">

          <p className="text-sm font-semibold">
            Instructor
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Welcome back.
          </p>

        </div>

      </div>

    </aside>
  );
}