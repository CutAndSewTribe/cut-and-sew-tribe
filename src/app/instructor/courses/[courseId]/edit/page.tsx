import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import CourseForm from "@/components/instructor/courses/CourseForm";

import { getCourse } from "@/lib/instructor/courses";

interface EditCoursePageProps {
params: Promise<{
courseId: string;
}>;
}

export default async function EditCoursePage({
params,
}: EditCoursePageProps) {
const { courseId } = await params;

const course = await getCourse(courseId);

if (!course) {
notFound();
}

return (
<InstructorPage
title="Edit Course"
description={`Update ${course.title}.`}
>
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
/> </InstructorPage>
);
}
