import InstructorPage from "@/components/instructor/layout/InstructorPage";
import CourseForm from "@/components/instructor/courses/CourseForm";

export default function NewCoursePage() {
  return (
    <InstructorPage
      title="Create Course"
      description="Create a brand new course for your academy."
    >
      <CourseForm />
    </InstructorPage>
  );
}