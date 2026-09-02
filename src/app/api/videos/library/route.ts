import { NextResponse } from "next/server";

import { getVideos } from "@/lib/instructor/videos";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Video library profile lookup:", profileError);

      return NextResponse.json(
        { error: "Unable to verify account permissions." },
        { status: 500 }
      );
    }

    if (
      profile?.role !== "instructor" &&
      profile?.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const videos = await getVideos();

    return NextResponse.json({
      videos: videos.map((video) => ({
        id: video.id,
        slug: video.slug,
        title: video.title,
        description: video.description,
        category: video.category,
        level: video.level,
        thumbnail_url: video.thumbnail_url,
        video_url: video.video_url,
        duration_seconds: video.duration_seconds,
        views: video.views,
        featured: video.featured,
        published: video.published,
        tags: video.tags,
        published_at: video.published_at,
        created_at: video.created_at,
      })),
    });
  } catch (error) {
    console.error("GET /api/videos/library:", error);

    return NextResponse.json(
      { error: "Failed to load video library." },
      { status: 500 }
    );
  }
}