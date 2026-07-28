import { createClient } from "@/lib/supabase/server";

import type { Module } from "@/types/module";

type ModuleRow = Module;

function mapModule(row: ModuleRow): Module {
  return row;
}

/*
 * Get every module for a course
 */
export async function getModules(
  courseId: string
): Promise<Module[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapModule);
}

/*
 * Get one module
 */
export async function getModule(
  id: string
): Promise<Module | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapModule(data);
}

export interface CreateModuleInput {
  course_id: string;

  title: string;

  description?: string;

  position: number;

  published: boolean;
}

/*
 * Create
 */
export async function createModule(
  input: CreateModuleInput
): Promise<Module> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .insert({
      course_id: input.course_id,

      title: input.title,

      description: input.description || null,

      position: input.position,

      published: input.published,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapModule(data);
}

/*
 * Update
 */
export async function updateModule(
  id: string,
  updates: Partial<CreateModuleInput>
): Promise<Module> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapModule(data);
}

/*
 * Delete
 */
export async function deleteModule(
  id: string
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("modules")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/*
 * Reorder
 */
export async function reorderModules(
  modules: Pick<Module, "id" | "position">[]
): Promise<void> {
  const supabase = await createClient();

  for (const moduleItem of modules) {
    await supabase
      .from("modules")
      .update({
        position: moduleItem.position,
      })
      .eq("id", moduleItem.id);
  }
}