import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Download } from "lucide-react";

interface PatternCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  category: string;
  level: string;
  access: "free" | "premium";
}

export default function PatternCard({
  title,
  slug,
  excerpt,
  thumbnail,
  category,
  level,
  access,
}: PatternCardProps) {
  const imageSrc =
    thumbnail && thumbnail.trim() !== ""
      ? thumbnail
      : "/images/patterns/basic-bodice-block.jpg";

  return (
    <Link
      href={`/patterns/${slug}`}
      className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-[#661093] px-3 py-1 text-xs font-semibold text-white capitalize">
            {category}
          </span>

          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 capitalize">
            {level}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white">
          {access === "premium" ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold leading-tight text-neutral-900 transition group-hover:text-[#661093]">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-3 line-clamp-3 leading-7 text-neutral-600">
            {excerpt}
          </p>
        )}

        <div className="mt-6 inline-flex items-center gap-2 font-semibold text-[#661093]">
          Read Pattern Guide
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}