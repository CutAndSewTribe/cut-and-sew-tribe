import { createClient } from "@/lib/supabase/client";

export async function markLessonComplete(
  courseSlug: string,
  lessonId: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,lesson_id",
      }
    );

  if (error) {
    throw error;
  }

  return true;
}