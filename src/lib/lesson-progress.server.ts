import { createClient } from "@/lib/supabase/server";

export async function getCompletedLessons(
  courseSlug: string
): Promise<string[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("completed", true);

  return (data ?? []).map(
    (item) => item.lesson_id
  );
}