import { createClient } from "@/lib/supabase/server";

import type {
  Lesson,
  CreateLessonInput,
} from "@/types/lesson";

type LessonRow = Lesson;

function mapLesson(row: LessonRow): Lesson {
  return row;
}

/*
 * Get every lesson in a module
 */
export async function getLessons(
  moduleId: string
): Promise<Lesson[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("position", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapLesson);
}

/*
 * Get one lesson
 */
export async function getLesson(
  id: string
): Promise<Lesson | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapLesson(data);
}

/*
 * Create lesson
 */
export async function createLesson(
  input: CreateLessonInput
): Promise<Lesson> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .insert({
      module_id: input.module_id,

      title: input.title,

      slug: input.slug,

      description: input.description ?? null,

      lesson_type: input.lesson_type,

      video_url: input.video_url ?? null,

      content_md: input.content_md ?? null,

      duration_minutes:
        input.duration_minutes ?? 0,

      preview: input.preview,

      published: input.published,

      position: input.position,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapLesson(data);
}

/*
 * Update lesson
 */
export async function updateLesson(
  id: string,
  updates: Partial<CreateLessonInput>
): Promise<Lesson> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapLesson(data);
}

/*
 * Delete lesson
 */
export async function deleteLesson(
  id: string
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/*
 * Reorder lessons
 */
export async function reorderLessons(
  lessons: Pick<Lesson, "id" | "position">[]
): Promise<void> {
  const supabase = await createClient();

  for (const lesson of lessons) {
    await supabase
      .from("lessons")
      .update({
        position: lesson.position,
      })
      .eq("id", lesson.id);
  }
}