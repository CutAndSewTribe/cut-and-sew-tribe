"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lock,
  PlayCircle,
  Clock3,
  CheckCircle2,
  Layers3,
} from "lucide-react";

import type { StudentModule } from "@/lib/lms/courses";

interface Props {
  modules: StudentModule[];
}

export default function CourseCurriculum({ modules }: Props) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const totalLessons = useMemo(
    () => modules.reduce((sum, module) => sum + module.lessons.length, 0),
    [modules]
  );

  const totalDuration = useMemo(() => {
  return "Self-paced";
}, []);

  function toggleModule(id: string) {
    setOpenModules((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  if (modules.length === 0) {
    return (
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
            <Layers3 className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900">
              Course Curriculum
            </h2>

            <p className="text-neutral-600">
              The detailed curriculum will be published soon.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((module) => (
            <div
              key={module}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-32 rounded bg-neutral-200" />
                  <div className="mt-2 h-3 w-48 rounded bg-neutral-100" />
                </div>

                <div className="h-8 w-8 rounded-full bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">
            Course Curriculum
          </h2>

          <p className="mt-2 max-w-2xl text-neutral-600">
            A structured step-by-step learning path that takes you from
            foundational techniques to professional garment construction.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Metric value={modules.length.toString()} label="Modules" />
          <Metric value={totalLessons.toString()} label="Lessons" />
          <Metric value={totalDuration} label="Duration" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {modules.map((module, moduleIndex) => {
          const isOpen = openModules[module.id] ?? moduleIndex === 0;

          return (
            <div
              key={module.id}
              className="overflow-hidden rounded-2xl border border-neutral-200"
            >
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="flex w-full items-center justify-between bg-neutral-50 px-6 py-5 text-left transition hover:bg-neutral-100"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#661093]">
                    Module {moduleIndex + 1}
                  </div>

                  <h3 className="mt-1 text-xl font-semibold text-neutral-900">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-600">
                    {module.lessons.length} lesson
                    {module.lessons.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700">
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="divide-y divide-neutral-100">
                  {module.lessons.length === 0 ? (
                    <div className="px-6 py-5 text-sm text-neutral-500">
                      Lessons will be added to this module soon.
                    </div>
                  ) : (
                    module.lessons.map((lesson, lessonIndex) => {
                      const preview = lessonIndex < 2;

                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between px-6 py-4 transition hover:bg-neutral-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                              {preview ? (
                                <PlayCircle className="h-6 w-6" />
                              ) : (
                                <Lock className="h-5 w-5" />
                              )}
                            </div>

                            <div>
                              <h4 className="font-semibold text-neutral-900">
                                {lesson.title}
                              </h4>

                              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                                <span className="inline-flex items-center gap-1">
  <Clock3 className="h-4 w-4" />
  Self-paced
</span>

                                <span
                                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                    preview
                                      ? "bg-[#661093]/10 text-[#661093]"
                                      : "bg-neutral-100 text-neutral-600"
                                  }`}
                                >
                                  {preview ? "Preview" : "Included"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <CheckCircle2 className="h-5 w-5 text-neutral-300" />
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-[#661093] p-6 text-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold">
              Lifetime access included
            </h3>

            <p className="mt-2 text-purple-100">
              Rewatch lessons anytime, download resources, and learn at your own
              pace without expiration.
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold">
            {totalLessons} lessons • {totalDuration}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center">
      <div className="text-xl font-bold text-neutral-900">{value}</div>
      <div className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </div>
    </div>
  );
}