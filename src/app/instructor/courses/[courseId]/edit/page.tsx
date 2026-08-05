import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import CourseForm from "@/components/instructor/courses/CourseForm";
import DeleteCourseButton from "@/components/instructor/courses/DeleteCourseButton";

import { getCourseById } from "@/lib/lms/courses";
import { deleteCourseAction } from "@/app/instructor/courses/actions";

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function EditCoursePage({
  params,
}: EditCoursePageProps) {
  const { courseId } = await params;

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <InstructorPage
      title="Edit Course"
      description={`Update ${course.title}.`}
    >
      <div className="space-y-8">
        <CourseForm
          courseId={courseId}
          initialValues={{
            title: course.title,
            slug: course.slug,
            subtitle: course.subtitle ?? "",
            description: course.description ?? "",
            category: course.category,
            level: course.level,
            price: course.price,
            currency: course.currency,
            duration: course.duration ?? "",
            thumbnail: course.thumbnail ?? "",
            preview_video: course.preview_video ?? "",
            telegram_group_name:
              course.telegram_group_name ?? "",
            telegram_invite_link:
              course.telegram_invite_link ?? "",
            featured: course.featured,
            published: course.published,
          }}
        />

        <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-xl font-bold text-red-700">
            Danger Zone
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Permanently delete this course and all of its modules and lessons.
            This action cannot be undone.
          </p>

          <div className="mt-4">
            <DeleteCourseButton
              onDelete={deleteCourseAction.bind(null, courseId)}
            />
          </div>
        </section>
      </div>
    </InstructorPage>
  );
}