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
          backgroundImage:
            `url(${backgroundImage})`,
        }}
      />


      <div
        className="
          absolute
          inset-0
          bg-black/60
        "
      />


      <Container>

        <div
          className="
            relative
            z-10
            py-24
            md:py-32
          "
        >

          <Badge>
            {label}
          </Badge>


          <h1
            className="
              mt-6
              max-w-4xl
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
              mt-6
              max-w-2xl
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