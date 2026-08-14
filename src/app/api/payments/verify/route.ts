import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
const reference =
request.nextUrl.searchParams.get("reference");

if (!reference) {
return NextResponse.json(
{
success: false,
error: "Missing payment reference.",
},
{
status: 400,
}
);
}

const secretKey =
process.env.PAYSTACK_SECRET_KEY;

if (!secretKey) {
return NextResponse.json(
{
success: false,
error:
"Paystack secret key is not configured.",
},
{
status: 500,
}
);
}

const verifyResponse = await fetch(
`https://api.paystack.co/transaction/verify/${encodeURIComponent(
      reference
    )}`,
{
method: "GET",


  headers: {
    Authorization: `Bearer ${secretKey}`,
  },

  cache: "no-store",
}


);

const verifyResult =
await verifyResponse.json();

if (
!verifyResponse.ok ||
!verifyResult.status ||
verifyResult.data?.status !== "success"
) {
return NextResponse.json(
{
success: false,
error: "Payment verification failed.",
},
{
status: 400,
}
);
}

const metadata =
verifyResult.data?.metadata;

const courseSlug =
metadata?.courseSlug;

const userId =
metadata?.userId;

if (
typeof courseSlug !== "string" ||
!courseSlug
) {
return NextResponse.json(
{
success: false,
error:
"The payment does not contain a valid course slug.",
},
{
status: 400,
}
);
}

if (
typeof userId !== "string" ||
!userId
) {
return NextResponse.json(
{
success: false,
error:
"The payment does not contain a valid user ID.",
},
{
status: 400,
}
);
}

const supabase =
await createClient();

/*

* The Paystack webhook may create the enrollment
* a moment after Paystack confirms the payment.
*
* Wait briefly for the webhook-created enrollment
* to become available.
  */
  for (
  let attempt = 0;
  attempt < 10;
  attempt++
  ) {
  const {
  data: enrollment,
  error: enrollmentError,
  } = await supabase
  .from("enrollments")
  .select("id, course_slug")
  .eq("user_id", userId)
  .eq("course_slug", courseSlug)
  .eq("status", "active")
  .maybeSingle();


if (enrollmentError) {



  console.error(
    "Enrollment lookup failed:",
    enrollmentError
  );
}

if (enrollment) {
  // Fetch the course Telegram information
  const {
    data: course,
    error: courseError,
  } = await supabase
    .from("courses")
    .select(
      "title, telegram_group_name, telegram_invite_link"
    )
    .eq("slug", enrollment.course_slug)
    .maybeSingle();

  if (courseError) {
    console.error(
      "Course lookup failed:",
      courseError
    );
  }

  const telegramInviteLink =
    course?.telegram_invite_link;

  if (
    !telegramInviteLink ||
    telegramInviteLink.trim() === ""
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Payment was successful, but this course does not have a Telegram invite link configured yet.",
      },
      {
        status: 409,
      }
    );
  }

  return NextResponse.json({
    success: true,
    courseSlug: enrollment.course_slug,
    telegramInviteLink,
    course: {
      title: course?.title,
      telegram_group_name:
        course?.telegram_group_name,
      telegram_invite_link:
        telegramInviteLink,
    },
  });
}

await new Promise((resolve) =>
  setTimeout(resolve, 1000)
);


}

return NextResponse.json(
{
success: false,
error:
"Payment was successful, but enrollment is still being processed. Please try again.",
},
{
status: 409,
}
);
}
