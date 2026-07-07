import { createClient } from "@/lib/supabase/client";

export async function getCompletedLessons() {
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

  return data.map((row) => row.lesson_id);
}