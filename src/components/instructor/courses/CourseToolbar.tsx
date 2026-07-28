import { Plus, Search } from "lucide-react";

export default function CourseToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

        <input
          type="search"
          placeholder="Search courses..."
          className="w-full rounded-2xl border border-neutral-200 py-3 pl-12 pr-4 outline-none focus:border-[#661093]"
        />
      </div>

      <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#661093] px-6 py-3 font-semibold text-white transition hover:opacity-90">
        <Plus className="h-5 w-5" />

        New Course
      </button>
    </div>
  );
}