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
    <Card
      className="
        group
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
    >


      {thumbnail && (

        <div
          className="
            relative
            aspect-4/5
            w-full
            overflow-hidden
            bg-neutral-100
          "
        >

          <Image
            src={thumbnail}
            alt={title}
            fill
            className="
              object-cover
              transition
              duration-700
              group-hover:scale-105
            "
            sizes="
              (max-width:768px) 100vw,
              33vw
            "
          />


          <div
            className="
              absolute
              inset-0
              bg-linear-to-t
              from-black/40
              to-transparent
              opacity-0
              transition
              group-hover:opacity-100
            "
          />

        </div>

      )}




      <div
        className="
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
              mt-6
              inline-flex
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



        <div
          className="
            mt-6
            text-sm
            font-semibold
            text-neutral-500
            transition
            group-hover:text-[#661093]
          "
        >
          Explore →
        </div>



      </div>


    </Card>
  );
}