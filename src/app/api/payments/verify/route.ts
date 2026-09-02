import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface PaystackMetadata {
  courseSlug?: unknown;
  userId?: unknown;
}

interface PaystackVerifyResponse {
  status?: boolean;
  message?: string;
  data?: {
    status?: string;
    metadata?: PaystackMetadata | null;
  } | null;
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing payment reference.",
      },
      { status: 400 }
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    console.error("PAYSTACK_SECRET_KEY is not configured.");

    return NextResponse.json(
      {
        success: false,
        error: "Payment service is not configured.",
      },
      { status: 500 }
    );
  }

  let verifyResponse: Response;
  let verifyResult: PaystackVerifyResponse;

  try {
    verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    verifyResult =
      (await verifyResponse.json()) as PaystackVerifyResponse;
  } catch (error) {
    console.error("Paystack verification request failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to verify payment with Paystack.",
      },
      { status: 502 }
    );
  }

  if (
    !verifyResponse.ok ||
    verifyResult.status !== true ||
    verifyResult.data?.status !== "success"
  ) {
    console.error("Paystack payment verification failed:", {
      reference,
      httpStatus: verifyResponse.status,
      paystackStatus: verifyResult.status,
      transactionStatus: verifyResult.data?.status,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Payment verification failed.",
      },
      { status: 400 }
    );
  }

  const metadata = verifyResult.data.metadata;

  const courseSlug = metadata?.courseSlug;
  const userId = metadata?.userId;

  if (typeof courseSlug !== "string" || courseSlug.trim() === "") {
    return NextResponse.json(
      {
        success: false,
        error:
          "The payment does not contain a valid course slug.",
      },
      { status: 400 }
    );
  }

  if (typeof userId !== "string" || userId.trim() === "") {
    return NextResponse.json(
      {
        success: false,
        error: "The payment does not contain a valid user ID.",
      },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  /*
   * Paystack confirms the payment before the webhook necessarily
   * finishes creating the enrollment.
   *
   * Poll for a short period so the customer does not immediately
   * receive an "enrollment still processing" error.
   */
  const MAX_ATTEMPTS = 10;
  const RETRY_DELAY_MS = 1000;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
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
      console.error("Enrollment lookup failed:", enrollmentError);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to confirm your course enrollment.",
        },
        { status: 500 }
      );
    }

    if (enrollment) {
      const {
        data: course,
        error: courseError,
      } = await supabase
        .from("courses")
        .select(
          "title, telegram_group_name, telegram_invite_link"
        )
        .eq("slug", enrollment.course_slug)
        .eq("published", true)
        .maybeSingle();

      if (courseError) {
        console.error("Course lookup failed:", courseError);

        return NextResponse.json(
          {
            success: false,
            error: "Unable to retrieve your course information.",
          },
          { status: 500 }
        );
      }

      if (!course) {
        console.error(
          "Course not found for enrollment:",
          enrollment.course_slug
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Payment was successful, but the course could not be found.",
          },
          { status: 404 }
        );
      }

      const telegramInviteLink =
        course.telegram_invite_link?.trim();

      if (!telegramInviteLink) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Payment was successful, but this course does not have a Telegram invite link configured yet.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json({
        success: true,
        courseSlug: enrollment.course_slug,
        telegramInviteLink,
        course: {
          title: course.title,
          telegram_group_name:
            course.telegram_group_name,
          telegram_invite_link:
            telegramInviteLink,
        },
      });
    }

    if (attempt < MAX_ATTEMPTS - 1) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY_MS)
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      error:
        "Payment was successful, but enrollment is still being processed. Please try again.",
    },
    { status: 409 }
  );
}