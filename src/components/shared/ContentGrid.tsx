import Container from "@/components/ui/Container";


interface ContentGridProps {
  children: React.ReactNode;
}


export default function ContentGrid({
  children,
}: ContentGridProps) {

  return (
    <Container>

      <div className="grid gap-6 md:grid-cols-3">

        {children}

      </div>

    </Container>
  );
}
