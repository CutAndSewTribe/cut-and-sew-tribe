import Image from "next/image";

import Card from "@/components/ui/Card";


interface ContentCardProps {
  title: string;
  description: string;
  meta?: string;
  thumbnail?: string;
}


export default function ContentCard({
  title,
  description,
  meta,
  thumbnail,
}: ContentCardProps) {

  return (
    <Card className="overflow-hidden p-0">


      {thumbnail && (
        <div className="relative aspect-video w-full">

          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

        </div>
      )}



      <div className="p-6">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>


        <p className="mt-3 text-neutral-600">
          {description}
        </p>


        {meta && (
          <div
            className="mt-4 text-sm text-[#661093]"
          >
            {meta}
          </div>
        )}

      </div>


    </Card>
  );
}