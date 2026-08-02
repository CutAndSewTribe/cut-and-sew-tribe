"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
  createCourse,
  deleteCourse,
  setCoursePublished,
  updateCourse,
} from "@/lib/instructor/courses";

import type { CreateCourseInput } from "@/lib/instructor/courses";

export async function createCourseAction(
  values: CreateCourseInput
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("========================================");
  console.log("CREATE COURSE ACTION");
  console.log("Current User:", user);
  console.log("Auth Error:", authError);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Current Session:", session);
  console.log("Course Payload:", values);
  console.log("========================================");

  try {
    await createCourse(values);
  } catch (error) {
    console.error("CREATE COURSE FAILED");
    console.error(error);
    throw error;
  }

  revalidatePath("/instructor/courses");
  revalidatePath("/");

  redirect("/instructor/courses");
}

export async function updateCourseAction(
  id: string,
  values: Partial<CreateCourseInput>
) {
  await updateCourse(id, values);

  revalidatePath("/instructor/courses");
  revalidatePath(`/instructor/courses/${id}/edit`);
  revalidatePath("/");

  redirect("/instructor/courses");
}

export async function publishCourseAction(
  id: string,
  published: boolean
) {
  await setCoursePublished(id, published);

  revalidatePath("/instructor/courses");
  revalidatePath(`/instructor/courses/${id}/edit`);
  revalidatePath("/");
}

export async function deleteCourseAction(id: string) {
  await deleteCourse(id);

  revalidatePath("/instructor/courses");
  revalidatePath("/");

  redirect("/instructor/courses");
}