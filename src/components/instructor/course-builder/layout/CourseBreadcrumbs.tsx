import Link from "next/link";

interface Props {
  title: string;
}

export default function CourseBreadcrumbs({
  title,
}: Props) {
  return (
    <nav className="flex items-center gap-2 text-sm text-neutral-500">

      <Link href="/instructor">
        Dashboard
      </Link>

      <span>/</span>

      <Link href="/instructor/courses">
        Courses
      </Link>

      <span>/</span>

      <span className="font-semibold text-neutral-900">
        {title}
      </span>

    </nav>
  );
}