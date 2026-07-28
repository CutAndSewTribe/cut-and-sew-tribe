import Image from "next/image";
import type { ReactNode } from "react";

import Card from "@/components/ui/Card";

interface ContentCardProps {
title: string;
description: string;
meta?: string;
thumbnail?: string;
children?: ReactNode;
}

function normalizeImageSrc(src: string): string {
if (
src.startsWith("http://") ||
src.startsWith("https://") ||
src.startsWith("/")
) {
return src;
}

return `/${src}`;
}

export default function ContentCard({
title,
description,
meta,
thumbnail,
children,
}: ContentCardProps) {
const imageSrc = thumbnail
? normalizeImageSrc(thumbnail)
: null;

return ( <Card
   className="
     group
     flex
     h-full
     flex-col
     overflow-hidden
     border
     border-neutral-200
     bg-white
     p-0
     transition-all
     duration-300
     hover:-translate-y-2
     hover:border-[#661093]
     hover:shadow-2xl
   "
 > <div
     className="
       relative
       aspect-4/5
       w-full
       shrink-0
       overflow-hidden
       bg-neutral-100
     "
   >
{imageSrc ? ( <Image
         src={imageSrc}
         alt={title}
         fill
         className="
           object-cover
           transition
           duration-700
           group-hover:scale-105
         "
         sizes="
           (max-width: 767px) 100vw,
           (max-width: 1279px) 50vw,
           33vw
         "
       />
) : ( <div className="flex h-full items-center justify-center bg-linear-to-br from-[#661093] to-[#D4AF37] px-6 text-center"> <div> <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
Cut and Sew Tribe </p>

```
          <p className="mt-3 text-2xl font-bold text-white">
            {title}
          </p>
        </div>
      </div>
    )}

    <div
      className="
        pointer-events-none
        absolute
        inset-0
        bg-linear-to-t
        from-black/50
        to-transparent
      "
    />
  </div>

  <div
    className="
      flex
      flex-1
      flex-col
      p-6
      md:p-7
    "
  >
    <h3
      className="
        text-2xl
        font-bold
        tracking-tight
        text-neutral-900
      "
    >
      {title}
    </h3>

    <p
      className="
        mt-4
        line-clamp-3
        text-base
        leading-7
        text-neutral-700
      "
    >
      {description}
    </p>

    {meta && (
      <div
        className="
          mt-5
          inline-flex
          w-fit
          rounded-full
          bg-[#661093]/10
          px-4
          py-2
          text-sm
          font-semibold
          text-[#661093]
        "
      >
        {meta}
      </div>
    )}

    {children && (
      <div
        className="
          mt-auto
          border-t
          border-neutral-100
          pt-6
        "
      >
        {children}
      </div>
    )}
  </div>
</Card>
);
}
