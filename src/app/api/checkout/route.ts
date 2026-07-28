import crypto from "crypto";

import { NextResponse } from "next/server";

import { getCourseBySlug } from "@/lib/lms/courses";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { courseSlug } = await request.json();

  if (
    typeof courseSlug !== "string" ||
    !courseSlug.trim()
  ) {
    return NextResponse.json(
      {
        error: "Course slug is required.",
      },
      {
        status: 400,
      }
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "You must be logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const course =
    await getCourseBySlug(courseSlug);

  if (!course) {
    return NextResponse.json(
      {
        error: "Course not found.",
      },
      {
        status: 404,
      }
    );
  }

  const secretKey =
    process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Paystack secret key is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  const paymentReference =
    crypto.randomUUID();

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: user.email,

        amount: Math.round(
          course.price * 100
        ),

        currency: course.currency,

        reference: paymentReference,

        metadata: {
          userId: user.id,

          courseId: course.id,

          courseSlug: course.slug,

          courseTitle: course.title,

          currency: course.currency,

          provider: "paystack",

          environment: "test",
        },

        callback_url:
          `${process.env.NEXT_PUBLIC_APP_URL}` +
          "/payment/callback",
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.status) {
    return NextResponse.json(
      {
        error:
          result.message ??
          "Unable to initialize payment.",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    authorization_url:
      result.data.authorization_url,
  });
}