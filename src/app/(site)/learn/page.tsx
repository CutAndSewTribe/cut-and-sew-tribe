import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function LearnHome() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-4xl font-bold">
          Please log in
        </h1>

        <p className="mt-4 text-neutral-600">
          You must be logged in to view your learning dashboard.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex rounded-full bg-[#661093] px-6 py-3 text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active");

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        My Learning
      </h1>

      <p className="mt-4 text-neutral-600">
        Continue learning where you left off.
      </p>

      <div className="mt-12 grid gap-8">
        {enrollments?.map((course) => (
          <Link
            key={course.id}
            href={`/learn/${course.course_slug}`}
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              {course.course_slug}
            </h2>

            <p className="mt-4 text-[#661093] font-semibold">
              Continue Learning →
            </p>
          </Link>
        ))}

        {!enrollments?.length && (
          <div className="rounded-3xl border border-dashed p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No enrolled courses yet.
            </h2>

            <p className="mt-4 text-neutral-600">
              Purchase a course to start learning.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}