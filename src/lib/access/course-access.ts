import { createClient } from "@/lib/supabase/server";

/**

* Check whether the currently signed-in user has access to a course.
  */
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

/**

* Return the Telegram invite link for an enrolled course.
*
* This is the helper your dashboard, course pages, and any future
* "Continue Learning" actions can use to send students directly
* into the course Telegram group instead of a hosted learning workspace.
  */
  export async function getCourseTelegramLink(
  courseSlug: string
  ): Promise<string | null> {
  const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
return null;
}

// Ensure the student has an active enrollment.
const {
data: enrollment,
error: enrollmentError,
} = await supabase
.from("enrollments")
.select("id")
.eq("user_id", user.id)
.eq("course_slug", courseSlug)
.eq("status", "active")
.maybeSingle();

if (enrollmentError) {
console.error(
"Error checking enrollment:",
enrollmentError
);


return null;


}

if (!enrollment) {
return null;
}

// Fetch the Telegram invite link from the course.
const {
data: course,
error: courseError,
} = await supabase
.from("courses")
.select("telegram_invite_link")
.eq("slug", courseSlug)
.maybeSingle();

if (courseError) {
console.error(
"Error fetching course Telegram link:",
courseError
);


return null;


}

const link = course?.telegram_invite_link;

if (!link || link.trim() === "") {
return null;
}

return link;
}
