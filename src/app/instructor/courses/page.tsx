import InstructorPage from "@/components/instructor/layout/InstructorPage";

import CourseStats from "@/components/instructor/courses/CourseStats";
import CourseToolbar from "@/components/instructor/courses/CourseToolbar";
import CourseTable from "@/components/instructor/courses/CourseTable";

import { getAllCourses } from "@/lib/lms/courses";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <InstructorPage
      title="Courses"
      description="Manage every course in your academy."
    >
      <CourseStats
        totalCourses={courses.length}
        publishedCourses={
          courses.filter((course) => course.published).length
        }
        draftCourses={
          courses.filter((course) => !course.published).length
        }
        totalStudents={courses.reduce(
          (total, course) => total + course.students,
          0
        )}
      />

      <CourseToolbar />

      <CourseTable courses={courses} />
    </InstructorPage>
  );
}