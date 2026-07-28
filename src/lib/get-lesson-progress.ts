import { createClient } from "@/lib/supabase/client";

interface LessonProgressRow {
  lesson_id: string;
}

export async function getCompletedLessons(): Promise<string[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true);

  if (error) {
    throw error;
  }

  return (data as LessonProgressRow[]).map(
    (row) => row.lesson_id
  );
}