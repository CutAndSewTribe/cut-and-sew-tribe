import { createClient } from "@/lib/supabase/server";

export async function hasCourseAccess(
courseSlug: string
): Promise<boolean> {
const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
return false;
}

const { data, error } = await supabase
.from("enrollments")
.select("id")
.eq("user_id", user.id)
.eq("course_slug", courseSlug)
.eq("status", "active")
.maybeSingle();

if (error) {
console.error(
"Error checking course access:",
error
);

return false;

}

return Boolean(data);
}
