import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function InstructorPage({
  title,
  description,
  actions,
  children,
}: Props) {
  return (
    <div className="space-y-8">

      <header className="flex flex-wrap items-start justify-between gap-6">

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-3xl text-lg text-neutral-600">
              {description}
            </p>
          )}

        </div>

        {actions && (
          <div>
            {actions}
          </div>
        )}

      </header>

      {children}

    </div>
  );
}