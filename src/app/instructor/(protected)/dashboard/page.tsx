import InstructorPage from "@/components/instructor/layout/InstructorPage";

import { getCourses } from "@/lib/instructor/courses";

export default async function InstructorDashboardPage() {
  const courses = await getCourses();

  const publishedCourses = courses.filter(
    (course) => course.published
  );

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0
  );

  return (
    <InstructorPage
      title="Dashboard"
      description="Welcome back. Here's what's happening across your academy today."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Revenue"
          value="₦0"
        />

        <DashboardCard
          title="Students"
          value={totalStudents.toString()}
        />

        <DashboardCard
          title="Courses"
          value={courses.length.toString()}
        />

        <DashboardCard
          title="Published"
          value={publishedCourses.length.toString()}
        />
      </div>
    </InstructorPage>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-neutral-500">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}