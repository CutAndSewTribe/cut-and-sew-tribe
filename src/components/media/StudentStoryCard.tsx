import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Sparkles } from "lucide-react";

interface StudentStoryCardProps {
name: string;
slug: string;
image?: string | null;
course: string;
location?: string | null;
shortStory: string;
}

export default function StudentStoryCard({
name,
slug,
image,
course,
location,
shortStory,
}: StudentStoryCardProps) {
const imageSrc =
image && image.trim() !== ""
? image
: "/images/students/ada-fashion-brand.jpg";

return (
<Link
href={`/success-stories/${slug}`}
className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
> <div className="relative aspect-[4/3] overflow-hidden"> <Image
       src={imageSrc}
       alt={name}
       fill
       className="object-cover transition duration-500 group-hover:scale-105"
     />


    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900">
      <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
      Success Story
    </div>

    <div className="absolute bottom-4 left-4 right-4">
      <h3 className="text-2xl font-bold text-white">
        {name}
      </h3>

      <p className="text-sm text-white/85">
        {course}
        {location ? ` • ${location}` : ""}
      </p>
    </div>
  </div>

  <div className="p-6">
    <div className="flex items-start gap-3">
      <Quote className="mt-1 h-5 w-5 shrink-0 text-[#661093]" />

      <p className="line-clamp-4 leading-7 text-neutral-700">
        {shortStory}
      </p>
    </div>

    <div className="mt-6 inline-flex items-center gap-2 font-semibold text-[#661093]">
      Read Full Story
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </div>
  </div>
</Link>


);
}
