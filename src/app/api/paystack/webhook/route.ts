import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY!;

  const body = await request.text();

  const signature = (await headers()).get(
    "x-paystack-signature"
  );

  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }

  const event = JSON.parse(body);

  if (event.event !== "charge.success") {
    return NextResponse.json({
      received: true,
    });
  }

  const payment = event.data;
  const metadata = payment.metadata ?? {};
  const supabase = supabaseAdmin;

  const reference = payment.reference;

  const { data: existing } = await supabase
    .from("payments")
    .select("id")
    .eq("paystack_reference", reference)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      received: true,
    });
  }

  let userId = metadata.userId;

    if (!userId && metadata.email) {
    const { data: usersData, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error(listError);
      return NextResponse.json(
        { error: "Unable to query users" },
        { status: 500 }
      );
    }

    const existingUser = usersData.users.find(
      (u) =>
        u.email?.toLowerCase() === metadata.email.toLowerCase()
    );

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          email: metadata.email,
          email_confirm: true,
        });

      if (createError || !newUser.user) {
        console.error(createError);
        return NextResponse.json(
          { error: "Unable to create purchaser account" },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
    }
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Unable to resolve purchaser account" },
      { status: 500 }
    );
  }

  const { error } = await supabase.rpc(
    "complete_course_purchase",
    {
      p_user_id: userId,
      p_course_slug: metadata.courseSlug,
      p_provider: "paystack",
      p_currency: payment.currency,
      p_amount: payment.amount,
      p_reference: reference,
    }
  );

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Purchase failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    received: true,
  });
}
