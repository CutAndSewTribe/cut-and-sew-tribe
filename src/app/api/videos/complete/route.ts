import { NextResponse } from "next/server";

import { createVideo } from "@/lib/instructor/videos";
import { createClient } from "@/lib/supabase/server";

const VIDEO_CATEGORIES = [
  "dressmaking",
  "bridal",
  "menswear",
  "childrenswear",
  "fashion-business",
  "general",
] as const;

const VIDEO_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

function isValidUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isValidR2Key(key: string, videoId: string): boolean {
  return new RegExp(
    `^videos/${videoId}/original\\.(mp4|webm|mov)$`
  ).test(key);
}

function isVideoCategory(
  value: string
): value is (typeof VIDEO_CATEGORIES)[number] {
  return VIDEO_CATEGORIES.includes(
    value as (typeof VIDEO_CATEGORIES)[number]
  );
}

function isVideoLevel(
  value: string
): value is (typeof VIDEO_LEVELS)[number] {
  return VIDEO_LEVELS.includes(
    value as (typeof VIDEO_LEVELS)[number]
  );
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "videos/complete profile lookup:",
        profileError
      );

      return NextResponse.json(
        { error: "Unable to verify instructor permissions." },
        { status: 500 }
      );
    }

    if (
      profile?.role !== "instructor" &&
      profile?.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Instructor permissions required." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      id,
      slug,
      title,
      description,
      category,
      level,
      r2Key,
      videoUrl,
      durationSeconds,
      tags,
      featured,
      published,
    } = body;

    if (
      typeof id !== "string" ||
      !isValidUuid(id)
    ) {
      return NextResponse.json(
        { error: "A valid video ID is required." },
        { status: 400 }
      );
    }

    if (
      typeof slug !== "string" ||
      !isValidSlug(slug)
    ) {
      return NextResponse.json(
        {
          error:
            "Slug must contain lowercase letters, numbers, and hyphens only.",
        },
        { status: 400 }
      );
    }

    if (
      typeof title !== "string" ||
      title.trim().length < 2
    ) {
      return NextResponse.json(
        { error: "Video title is required." },
        { status: 400 }
      );
    }

    if (
      typeof category !== "string" ||
      !isVideoCategory(category)
    ) {
      return NextResponse.json(
        { error: "Invalid video category." },
        { status: 400 }
      );
    }

    if (
      typeof level !== "string" ||
      !isVideoLevel(level)
    ) {
      return NextResponse.json(
        { error: "Invalid video level." },
        { status: 400 }
      );
    }

    if (
      typeof r2Key !== "string" ||
      !isValidR2Key(r2Key, id)
    ) {
      return NextResponse.json(
        { error: "Invalid R2 video object key." },
        { status: 400 }
      );
    }

    if (
      durationSeconds !== undefined &&
      durationSeconds !== null &&
      (
        typeof durationSeconds !== "number" ||
        !Number.isFinite(durationSeconds) ||
        durationSeconds < 0
      )
    ) {
      return NextResponse.json(
        { error: "Invalid video duration." },
        { status: 400 }
      );
    }

    if (
      tags !== undefined &&
      (
        !Array.isArray(tags) ||
        tags.some(
          (tag) =>
            typeof tag !== "string" ||
            tag.trim().length === 0
        )
      )
    ) {
      return NextResponse.json(
        { error: "Invalid video tags." },
        { status: 400 }
      );
    }

    if (
      featured !== undefined &&
      typeof featured !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid featured value." },
        { status: 400 }
      );
    }

    if (
      published !== undefined &&
      typeof published !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid published value." },
        { status: 400 }
      );
    }

    if (
      videoUrl !== undefined &&
      videoUrl !== null &&
      typeof videoUrl !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid video URL." },
        { status: 400 }
      );
    }

    const video = await createVideo({
      id,
      slug: slug.trim(),
      title: title.trim(),
      description:
        typeof description === "string"
          ? description.trim()
          : null,
      category,
      level,
      r2_key: r2Key,
      video_url:
        typeof videoUrl === "string"
          ? videoUrl.trim() || null
          : null,
      duration_seconds:
        durationSeconds === undefined ||
        durationSeconds === null
          ? null
          : Math.round(durationSeconds),
      tags: Array.isArray(tags)
        ? tags.map((tag) => tag.trim()).filter(Boolean)
        : [],
      featured: featured ?? false,
      published: published ?? false,
      instructor_id: user.id,
    });

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("videos/complete:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to complete video upload.",
      },
      { status: 500 }
    );
  }
}
