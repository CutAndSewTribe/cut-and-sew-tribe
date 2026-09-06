import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.rpc(
      "increment_video_views",
      {
        p_video_id: id,
      }
    );

    if (error) {
      console.error("Failed to increment video views:", error);

      return NextResponse.json(
        { error: "Unable to record video view" },
        { status: 500 }
      );
    }

    if (data === null) {
      return NextResponse.json(
        { error: "Video not found or unpublished" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: data,
    });
  } catch (error) {
    console.error("Video view endpoint error:", error);

    return NextResponse.json(
      { error: "Unable to record video view" },
      { status: 500 }
    );
  }
}
