import { NextResponse } from "next/server";

import {
  setVideoPublished,
  updateVideo,
} from "@/lib/instructor/videos";
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

type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
type VideoLevel = (typeof VIDEO_LEVELS)[number];

function isValidUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isVideoCategory(value: unknown): value is VideoCategory {
  return (
    typeof value === "string" &&
    VIDEO_CATEGORIES.includes(value as VideoCategory)
  );
}

function isVideoLevel(value: unknown): value is VideoLevel {
  return (
    typeof value === "string" &&
    VIDEO_LEVELS.includes(value as VideoLevel)
  );
}

async function requireInstructorOrAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("videos/[id] profile lookup:", error);

    return {
      user: null,
      response: NextResponse.json(
        { error: "Unable to verify account permissions." },
        { status: 500 }
      ),
    };
  }

  if (profile?.role !== "instructor" && profile?.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json(
        { error: "You do not have permission to manage videos." },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    response: null,
  };
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!isValidUuid(id)) {
      return NextResponse.json(
        { error: "Invalid video ID." },
        { status: 400 }
      );
    }

    const { response } = await requireInstructorOrAdmin();

    if (response) {
      return response;
    }

    const body = await request.json();

    if (
      body.published !== undefined &&
      typeof body.published !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Published must be a boolean." },
        { status: 400 }
      );
    }

    if (body.title !== undefined) {
      if (
        typeof body.title !== "string" ||
        body.title.trim().length < 2 ||
        body.title.trim().length > 200
      ) {
        return NextResponse.json(
          { error: "Title must be between 2 and 200 characters." },
          { status: 400 }
        );
      }
    }

    if (body.slug !== undefined) {
      if (
        typeof body.slug !== "string" ||
        !isValidSlug(body.slug.trim())
      ) {
        return NextResponse.json(
          { error: "Slug must contain lowercase letters, numbers, and hyphens only." },
          { status: 400 }
        );
      }
    }

    if (
      body.description !== undefined &&
      body.description !== null &&
      typeof body.description !== "string"
    ) {
      return NextResponse.json(
        { error: "Description must be text or null." },
        { status: 400 }
      );
    }

    if (
      body.category !== undefined &&
      !isVideoCategory(body.category)
    ) {
      return NextResponse.json(
        { error: "Invalid video category." },
        { status: 400 }
      );
    }

    if (body.level !== undefined && !isVideoLevel(body.level)) {
      return NextResponse.json(
        { error: "Invalid video level." },
        { status: 400 }
      );
    }

    if (body.featured !== undefined && typeof body.featured !== "boolean") {
      return NextResponse.json(
        { error: "Featured must be a boolean." },
        { status: 400 }
      );
    }

    if (body.tags !== undefined) {
      if (
        !Array.isArray(body.tags) ||
        body.tags.some((tag: unknown) => typeof tag !== "string")
      ) {
        return NextResponse.json(
          { error: "Tags must be an array of text values." },
          { status: 400 }
        );
      }
    }

    if (
      body.durationSeconds !== undefined &&
      body.durationSeconds !== null &&
      (typeof body.durationSeconds !== "number" ||
        !Number.isFinite(body.durationSeconds) ||
        body.durationSeconds < 0)
    ) {
      return NextResponse.json(
        { error: "Duration must be a non-negative number." },
        { status: 400 }
      );
    }

    const hasMetadataUpdates =
      body.title !== undefined ||
      body.slug !== undefined ||
      body.description !== undefined ||
      body.category !== undefined ||
      body.level !== undefined ||
      body.featured !== undefined ||
      body.tags !== undefined ||
      body.durationSeconds !== undefined;

    let video;

    if (hasMetadataUpdates) {
      video = await updateVideo(id, {
        ...(body.title !== undefined
          ? { title: body.title.trim() }
          : {}),
        ...(body.slug !== undefined
          ? { slug: body.slug.trim() }
          : {}),
        ...(body.description !== undefined
          ? {
              description:
                typeof body.description === "string"
                  ? body.description.trim() || null
                  : null,
            }
          : {}),
        ...(body.category !== undefined
          ? { category: body.category }
          : {}),
        ...(body.level !== undefined
          ? { level: body.level }
          : {}),
        ...(body.featured !== undefined
          ? { featured: body.featured }
          : {}),
        ...(body.tags !== undefined
          ? {
              tags: body.tags
                .map((tag: string) => tag.trim())
                .filter(Boolean),
            }
          : {}),
        ...(body.durationSeconds !== undefined
          ? {
              duration_seconds:
                body.durationSeconds === null
                  ? null
                  : Math.round(body.durationSeconds),
            }
          : {}),
      });
    }

    if (body.published !== undefined) {
      video = await setVideoPublished(id, body.published);
    }

    if (!video) {
      return NextResponse.json(
        { error: "No changes were provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("videos/[id] PATCH:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to update video.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
