import Card from "@/components/ui/Card";


interface ContentCardProps {
  title: string;
  description: string;
  meta?: string;
}


export default function ContentCard({
  title,
  description,
  meta,
}: ContentCardProps) {

  return (
    <Card>

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

    </Card>
  );
}