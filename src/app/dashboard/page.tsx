import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/get-user";
import { getDashboardCourses } from "@/lib/dashboard.server";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const dashboardCourses =
    await getDashboardCourses();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <div className="mb-12">

        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-3 text-neutral-600">
          {user.email}
        </p>

      </div>

      <section>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Continue Learning
            </h2>

            <p className="mt-2 text-neutral-600">
              Pick up where you left off.
            </p>

          </div>

        </div>

        {dashboardCourses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">

            <h3 className="text-xl font-semibold">
              No enrolled courses yet
            </h3>

            <p className="mt-3 text-neutral-600">
              Purchase a course to begin learning.
            </p>

            <Link
              href="/courses"
              className="mt-8 inline-flex rounded-xl bg-[#661093] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Browse Courses
            </Link>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">

            {dashboardCourses.map((course) => {

              const completed =
                course.progress === 100;

              return (

                <article
                  key={course.slug}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
                >

                  <div className="relative h-52 w-full">
  <Image
    src={course.thumbnail}
    alt={course.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>

                  <div className="space-y-6 p-6">

                    <div>

                      <h3 className="text-2xl font-bold">
                        {course.title}
                      </h3>

                      <p className="mt-3 text-neutral-600">

                        {course.completedLessons} of{" "}
                        {course.totalLessons} lessons completed

                      </p>

                    </div>

                    <div>

                      <div className="mb-2 flex items-center justify-between text-sm font-semibold">

                        <span>Progress</span>

                        <span>
                          {course.progress}%
                        </span>

                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-neutral-200">

                        <div
                          className="h-full rounded-full bg-[#661093] transition-all"
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div>

                      <Link
                        href={`/learn/${course.slug}`}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:opacity-90"
                      >

                        {completed
                          ? "Review Course"
                          : "Resume Course"}

                      </Link>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>
        )}

      </section>

    </main>
  );
}