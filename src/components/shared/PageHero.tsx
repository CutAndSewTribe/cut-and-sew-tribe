import {
  Badge,
  Container,
  Section,
} from "@/components/ui";


interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  backgroundImage?: string;
}


export default function PageHero({
  label,
  title,
  description,
  backgroundImage = "/images/backgrounds/fashion-hero.jpg",
}: PageHeroProps) {

  return (
    <Section
      className="
        relative
        overflow-hidden
        text-white
      "
    >

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />


      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />


      <div
        className="
          absolute
          inset-0
          bg-linear-to-r
          from-[#661093]/70
          via-transparent
          to-black/40
        "
      />


      <Container>

        <div
          className="
            relative
            z-10
            py-28
            md:py-36
          "
        >

          <Badge>
            {label}
          </Badge>


          <h1
            className="
              mt-6
              max-w-5xl
              text-5xl
              font-bold
              tracking-tight
              md:text-7xl
            "
          >
            {title}
          </h1>


          <p
            className="
              mt-8
              max-w-3xl
              text-lg
              leading-8
              text-neutral-200
            "
          >
            {description}
          </p>


        </div>

      </Container>


    </Section>
  );
}