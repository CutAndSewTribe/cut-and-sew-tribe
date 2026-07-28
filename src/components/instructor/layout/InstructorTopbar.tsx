"use client";

import {
  Bell,
  Search,
  Settings,
  UserCircle2,
} from "lucide-react";

export default function InstructorTopbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-neutral-200
        bg-white
        px-8
      "
    >
      {/* Search */}

      <div className="relative w-full max-w-xl">

        <Search
          className="
            absolute
            left-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-neutral-400
          "
        />

        <input
          type="search"
          placeholder="Search courses, students, lessons..."
          className="
            w-full
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            py-3
            pl-12
            pr-5
            outline-none
            transition
            focus:border-[#661093]
            focus:bg-white
          "
        />

      </div>

      {/* Right section */}

      <div className="ml-8 flex items-center gap-5">

        <button
          className="
            rounded-xl
            p-3
            transition
            hover:bg-neutral-100
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          className="
            rounded-xl
            p-3
            transition
            hover:bg-neutral-100
          "
        >
          <Settings className="h-5 w-5" />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-neutral-200
            px-4
            py-2
          "
        >
          <UserCircle2 className="h-9 w-9 text-[#661093]" />

          <div>

            <p className="text-sm font-semibold">
              Instructor
            </p>

            <p className="text-xs text-neutral-500">
              administrator
            </p>

          </div>

        </div>

      </div>
    </header>
  );
}