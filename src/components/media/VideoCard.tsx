import Image from "next/image";
import Link from "next/link";
import { Play, Clock, ArrowRight } from "lucide-react";

interface VideoCardProps {
title: string;
slug: string;
description?: string | null;
thumbnail?: string | null;
duration?: string | null;
level?: string;
}

export default function VideoCard({
title,
slug,
description,
thumbnail,
duration,
level,
}: VideoCardProps) {
const imageSrc =
thumbnail && thumbnail.trim() !== ""
? thumbnail
: "/videos/thumbnails/beginner-sewing-tools.jpg";

return (
<Link
href={`/videos/${slug}`}
className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
> <div className="relative aspect-[16/10] overflow-hidden"> <Image
       src={imageSrc}
       alt={title}
       fill
       className="object-cover transition duration-500 group-hover:scale-105"
     />


    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#661093] shadow-lg transition group-hover:scale-110">
        <Play className="ml-1 h-7 w-7" fill="currentColor" />
      </div>
    </div>

    {level && (
      <div className="absolute left-4 top-4 rounded-full bg-[#661093] px-3 py-1 text-xs font-semibold text-white">
        {level}
      </div>
    )}

    {duration && (
      <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
        {duration}
      </div>
    )}
  </div>

  <div className="p-6">
    <h3 className="text-xl font-bold leading-tight text-neutral-900 transition group-hover:text-[#661093]">
      {title}
    </h3>

    {description && (
      <p className="mt-3 line-clamp-3 leading-7 text-neutral-600">
        {description}
      </p>
    )}

    <div className="mt-6 flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
        <Clock className="h-4 w-4" />
        {duration ?? "Free lesson"}
      </span>

      <span className="inline-flex items-center gap-2 font-semibold text-[#661093]">
        Watch Now
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </div>
  </div>
</Link>


);
}
