import { ReactNode } from "react";

interface CourseBuilderLayoutProps {
  header: ReactNode;
  breadcrumbs: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

export default function CourseBuilderLayout({
  header,
  breadcrumbs,
  sidebar,
  children,
}: CourseBuilderLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-100">

      {header}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          {breadcrumbs}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

        <aside className="hidden w-72 shrink-0 lg:block">
          {sidebar}
        </aside>

        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}