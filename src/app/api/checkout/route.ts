import { NextResponse } from "next/server";

import { courses } from "@/content/courses";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { courseSlug } = await request.json();

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

  const course = courses.find(
    (course) => course.slug === courseSlug
  );

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

  const secretKey = process.env.PAYSTACK_SECRET_KEY!;

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

        amount: course.price * 100,

        currency: course.currency,

        reference: paymentReference,

        metadata: {
          userId: user.id,

          courseSlug: course.slug,

          courseTitle: course.title,

          currency: course.currency,

          provider: "paystack",

          environment: "test",
        },
      }),
    }
  );

  const result = await response.json();

  if (!result.status) {
    return NextResponse.json(
      {
        error: result.message,
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