"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateCoursePositions } from "@/lib/lms/courses";
import { createClient } from "@/lib/supabase/server";

import {
createCourse,
deleteCourse,
setCoursePublished,
updateCourse,
} from "@/lib/instructor/courses";

import type { CreateCourseInput } from "@/lib/instructor/courses";

export async function createCourseAction(values: CreateCourseInput) {
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
const created = await createCourse(values);


revalidatePath("/");
revalidatePath("/courses");
revalidatePath(`/courses/${created.slug}`);
revalidatePath("/instructor/courses");

redirect("/instructor/courses");


} catch (error) {
console.error("CREATE COURSE FAILED");
console.error(error);
throw error;
}
}

export async function updateCourseAction(
id: string,
values: Partial<CreateCourseInput>
) {
const updated = await updateCourse(id, values);

// Public pages
revalidatePath("/");
revalidatePath("/courses");
revalidatePath(`/courses/${updated.slug}`);

// Instructor pages
revalidatePath("/instructor/courses");
revalidatePath(`/instructor/courses/${id}`);
revalidatePath(`/instructor/courses/${id}/edit`);

redirect("/instructor/courses");
}

export async function publishCourseAction(
id: string,
published: boolean
) {
const updated = await setCoursePublished(id, published);

revalidatePath("/");
revalidatePath("/courses");
revalidatePath(`/courses/${updated.slug}`);

revalidatePath("/instructor/courses");
revalidatePath(`/instructor/courses/${id}`);
revalidatePath(`/instructor/courses/${id}/edit`);
}

export async function deleteCourseAction(id: string) {
await deleteCourse(id);

revalidatePath("/");
revalidatePath("/courses");
revalidatePath("/instructor/courses");

redirect("/instructor/courses");
}

export async function reorderCoursesAction(
positions: { id: string; position: number }[]
) {
await updateCoursePositions(positions);

revalidatePath("/instructor/courses");
revalidatePath("/courses");
revalidatePath("/");
}
