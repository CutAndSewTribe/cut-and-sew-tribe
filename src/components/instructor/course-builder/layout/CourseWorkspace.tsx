import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CourseWorkspace({
  children,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      {children}
    </section>
  );
}