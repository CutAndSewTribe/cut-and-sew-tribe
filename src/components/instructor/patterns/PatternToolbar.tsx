import Link from "next/link";

export default function PatternToolbar() {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          Pattern Library
        </h2>
        <p className="text-sm text-neutral-500">
          Publish drafting tutorials, downloadable patterns, and SEO-focused educational articles.
        </p>
      </div>

      <Link
        href="/instructor/patterns/new"
        className="rounded-2xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#55107d]"
      >
        New Pattern
      </Link>
    </div>
  );
}