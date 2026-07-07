import { notFound } from "next/navigation";

import LearningWorkspace from "@/components/learn/LearningWorkspace";

import { learningCourses } from "@/content/learning";

import { getCompletedLessons } from "@/lib/lesson-progress.server";

interface LearnPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LearnPage({
  params,
}: LearnPageProps) {
  const { slug } = await params;

  const course =
    learningCourses[
      slug as keyof typeof learningCourses
    ];

  if (!course) {
    notFound();
  }

  const completedLessons =
    await getCompletedLessons(slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <LearningWorkspace
        course={course}
        completedLessons={completedLessons}
      />
    </main>
  );
}