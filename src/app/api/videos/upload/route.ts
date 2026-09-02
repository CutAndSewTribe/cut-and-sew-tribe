import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { createClient } from "@/lib/supabase/server";
import {
  createVideoObjectKey,
  createVideoUploadUrl,
  getVideoPublicUrl,
} from "@/lib/r2";

const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function isAllowedVideoType(contentType: string): boolean {
  return ALLOWED_VIDEO_TYPES.has(contentType.toLowerCase());
}

function isValidVideoFilename(filename: string): boolean {
  const extension = filename
    .split(".")
    .pop()
    ?.toLowerCase();

  return ["mp4", "webm", "mov"].includes(extension ?? "");
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (
      profileError ||
      !profile ||
      (profile.role !== "instructor" && profile.role !== "admin")
    ) {
      return NextResponse.json(
        {
          error: "Instructor or admin access required.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await request.json();

    const filename =
      typeof body.filename === "string"
        ? body.filename.trim()
        : "";

    const contentType =
      typeof body.contentType === "string"
        ? body.contentType.trim().toLowerCase()
        : "";

    const size =
      typeof body.size === "number"
        ? body.size
        : Number(body.size);

    if (!filename) {
      return NextResponse.json(
        {
          error: "A video filename is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!contentType || !isAllowedVideoType(contentType)) {
      return NextResponse.json(
        {
          error:
            "Unsupported video format. Please upload MP4, WebM, or MOV video.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidVideoFilename(filename)) {
      return NextResponse.json(
        {
          error:
            "Unsupported video file extension. Please upload an MP4, WebM, or MOV file.",
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isFinite(size) || size <= 0) {
      return NextResponse.json(
        {
          error: "A valid video file size is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        {
          error: "Video file is too large. The maximum allowed size is 2 GB.",
        },
        {
          status: 400,
        }
      );
    }

    const videoId = randomUUID();

    const key = createVideoObjectKey(videoId, filename);

    const uploadUrl = await createVideoUploadUrl(
      key,
      contentType
    );

    return NextResponse.json({
      videoId,
      key,
      uploadUrl,
      publicUrl: getVideoPublicUrl(key),
      expiresIn: 900,
    });
  } catch (error) {
    console.error("Video upload authorization error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to authorize video upload.",
      },
      {
        status: 500,
      }
    );
  }
}
