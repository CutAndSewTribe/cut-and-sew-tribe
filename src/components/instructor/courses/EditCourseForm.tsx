import type { LMSCourse } from "@/lib/lms/courses";

interface Props {
  course: LMSCourse;
}

export default function EditCourseForm({
  course,
}: Props) {
  return (
    <form>
      <input
        name="title"
        defaultValue={course.title}
      />

      <input
        name="subtitle"
        defaultValue={course.subtitle ?? ""}
      />

      <textarea
        name="description"
        defaultValue={course.description ?? ""}
      />

      <input
        name="category"
        defaultValue={course.category}
      />

      <input
        name="level"
        defaultValue={course.level}
      />

      <input
        name="price"
        type="number"
        defaultValue={course.price}
      />

      <input
        name="currency"
        defaultValue={course.currency}
      />

      <input
        name="duration"
        defaultValue={course.duration ?? ""}
      />

      <input
        name="thumbnail"
        defaultValue={course.thumbnail ?? ""}
      />

      <input
        name="preview_video"
        defaultValue={course.preview_video ?? ""}
      />

      <input
        name="telegram_group_name"
        defaultValue={
          course.telegram_group_name ?? ""
        }
      />

      <input
        name="telegram_invite_link"
        defaultValue={
          course.telegram_invite_link ?? ""
        }
      />

      <input
        type="checkbox"
        name="featured"
        defaultChecked={course.featured}
      />

      <input
        type="checkbox"
        name="published"
        defaultChecked={course.published}
      />
    </form>
  );
}