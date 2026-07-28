interface LessonResource {
  id: string;
  title: string;
  type: string;
  size?: string;
  href: string;
}

interface Props {
  resources?: LessonResource[];
}

export default function LessonResources({
  resources = [],
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-2xl">
          📂
        </div>

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
            Downloads
          </p>

          <h2 className="text-2xl font-bold text-neutral-900">
            Lesson Resources
          </h2>

        </div>

      </div>

      {resources.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-neutral-300
            bg-neutral-50
            p-8
            text-center
          "
        >
          <div className="text-5xl">📄</div>

          <h3 className="mt-5 text-xl font-semibold">
            No downloads for this lesson
          </h3>

          <p className="mt-3 text-neutral-600">
            Worksheets, patterns and supporting files will appear here when
            available.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {resources.map((resource) => (
            <div
              key={resource.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-neutral-200
                p-5
                transition
                hover:border-[#661093]
                hover:shadow-md
              "
            >
              <div>

                <h3 className="font-semibold text-neutral-900">
                  {resource.title}
                </h3>

                <div className="mt-2 flex gap-3 text-sm text-neutral-500">

                  <span>{resource.type}</span>

                  {resource.size && (
                    <>
                      <span>•</span>

                      <span>{resource.size}</span>
                    </>
                  )}

                </div>

              </div>

              <a
                href={resource.href}
                download
                className="
                  rounded-xl
                  bg-[#661093]
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Download
              </a>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}