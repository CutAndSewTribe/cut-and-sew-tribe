interface Props {
  totalPatterns: number;
  publishedPatterns: number;
  draftPatterns: number;
  featuredPatterns: number;
}

export default function PatternStats({
  totalPatterns,
  publishedPatterns,
  draftPatterns,
  featuredPatterns,
}: Props) {
  const cards = [
    { label: "Total Patterns", value: totalPatterns },
    { label: "Published", value: publishedPatterns },
    { label: "Drafts", value: draftPatterns },
    { label: "Featured", value: featuredPatterns },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="text-sm font-medium text-neutral-500">
            {card.label}
          </div>
          <div className="mt-2 text-3xl font-bold text-[#661093]">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}