import {
  Badge,
  Container,
  Section,
} from "@/components/ui";


interface PageHeroProps {
  label: string;
  title: string;
  description: string;
}


export default function PageHero({
  label,
  title,
  description,
}: PageHeroProps) {

  return (
    <Section className="bg-neutral-950 text-white">

      <Container>

        <Badge>
          {label}
        </Badge>


        <h1 className="mt-6 text-5xl font-bold">
          {title}
        </h1>


        <p className="mt-6 max-w-2xl text-neutral-300">
          {description}
        </p>


      </Container>

    </Section>
  );
}
