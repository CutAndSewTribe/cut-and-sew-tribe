interface Props {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalStudents: number;
}

export default function CourseStats({
  totalCourses,
  publishedCourses,
  draftCourses,
  totalStudents,
}: Props) {
  const cards = [
    {
      title: "Total Courses",
      value: totalCourses,
    },
    {
      title: "Published",
      value: publishedCourses,
    },
    {
      title: "Drafts",
      value: draftCourses,
    },
    {
      title: "Students",
      value: totalStudents,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-neutral-500">
            {card.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}