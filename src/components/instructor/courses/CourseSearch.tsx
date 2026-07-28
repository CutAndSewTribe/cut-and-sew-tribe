"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CourseSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />

      <input
        type="search"
        placeholder="Search courses..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-neutral-200
          bg-white
          pl-12
          pr-12
          text-sm
          text-neutral-900
          placeholder:text-neutral-400
          shadow-sm
          transition
          outline-none
          focus:border-[#661093]
          focus:ring-4
          focus:ring-[#661093]/10
        "
      />

      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            flex
            h-7
            w-7
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-neutral-400
            transition
            hover:bg-neutral-100
            hover:text-neutral-700
          "
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}