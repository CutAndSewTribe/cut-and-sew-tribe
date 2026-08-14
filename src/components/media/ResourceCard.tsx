import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";

interface ResourceCardProps {
title: string;
slug: string;
description?: string | null;
thumbnail?: string | null;
category?: string;
fileType?: string;
}

export default function ResourceCard({
title,
slug,
description,
thumbnail,
category,
fileType,
}: ResourceCardProps) {
const imageSrc =
thumbnail && thumbnail.trim() !== ""
? thumbnail
: "/resources/thumbnails/sewing-tools-checklist.jpg";

return (
<Link
href={`/resources/${slug}`}
className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
> <div className="relative aspect-[4/3] overflow-hidden"> <Image
       src={imageSrc}
       alt={title}
       fill
       className="object-cover transition duration-500 group-hover:scale-105"
     />


    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900">
      <FileText className="h-3.5 w-3.5 text-[#661093]" />
      {category ?? "Free Resource"}
    </div>
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
        <Download className="h-4 w-4" />
        {fileType ?? "Free Download"}
      </span>

      <span className="inline-flex items-center gap-2 font-semibold text-[#661093]">
        Download
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </div>
  </div>
</Link>


);
}
