import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";

interface CourseCardProps {
title: string;
slug: string;
description?: string | null;
thumbnail?: string | null;
category?: string;
level: string;
duration?: string | null;
price?: number;
currency?: string;
}

export default function CourseCard({
title,
slug,
description,
thumbnail,
category,
level,
duration,
price,
currency = "NGN",
}: CourseCardProps) {
const imageSrc =
thumbnail && thumbnail.trim() !== ""
? thumbnail
: "/images/courses/beginner-fashion-design.jpg";

const formattedPrice =
typeof price === "number"
? new Intl.NumberFormat("en-NG", {
style: "currency",
currency,
maximumFractionDigits: 0,
}).format(price)
: "Coming soon";

return (
<Link
href={`/courses/${slug}`}
className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
> <div className="relative aspect-[4/3] overflow-hidden"> <Image
       src={imageSrc}
       alt={title}
       fill
       className="object-cover transition duration-500 group-hover:scale-105"
     />


    <div className="absolute left-4 top-4 flex gap-2">
      {category && (
        <span className="rounded-full bg-[#661093] px-3 py-1 text-xs font-semibold text-white">
          {category}
        </span>
      )}

      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900">
        {level}
      </span>
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

    <div className="mt-5 flex items-center gap-4 text-sm text-neutral-500">
      <span className="inline-flex items-center gap-1">
        <GraduationCap className="h-4 w-4" />
        {level}
      </span>

      {duration && (
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {duration}
        </span>
      )}
    </div>

    <div className="mt-6 flex items-center justify-between">
      <span className="text-lg font-bold text-neutral-900">
        {formattedPrice}
      </span>

      <span className="inline-flex items-center gap-2 font-semibold text-[#661093]">
        View Course
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </div>
  </div>
</Link>


);
}
