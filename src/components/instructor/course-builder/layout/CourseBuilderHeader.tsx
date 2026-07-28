import Link from "next/link";

interface Props {
  title: string;
  published: boolean;
}

export default function CourseBuilderHeader({
  title,
  published,
}: Props) {
  return (
    <header className="border-b bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <div>

          <h1 className="text-3xl font-bold text-neutral-900">
            {title}
          </h1>

          <p className="mt-2 text-neutral-600">
            Manage every aspect of this course.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {published ? "Published" : "Draft"}
          </span>

          <Link
            href="#"
            className="rounded-xl border px-5 py-3 font-semibold"
          >
            Preview
          </Link>

          <button className="rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white">
            Save
          </button>

        </div>

      </div>

    </header>
  );
}