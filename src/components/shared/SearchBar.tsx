"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SearchBar() {

  const router = useRouter();

  const [query, setQuery] = useState("");


  function handleSearch(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (!query.trim()) {
      return;
    }


    router.push(
      `/search?q=${encodeURIComponent(query)}`
    );

  }


  return (

    <form
      onSubmit={handleSearch}
      className="flex gap-3"
    >

      <input
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search courses, videos, patterns..."
        className="
          w-full
          rounded-lg
          border
          px-4
          py-3
        "
      />


      <button
        type="submit"
        className="
          rounded-lg
          bg-[#661093]
          px-6
          py-3
          text-white
        "
      >
        Search
      </button>


    </form>

  );
}
