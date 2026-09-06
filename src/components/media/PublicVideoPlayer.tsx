"use client";

import { useRef } from "react";

interface PublicVideoPlayerProps {
  videoId: string;
  videoUrl: string;
  thumbnail: string;
  r2Key: string;
}

export default function PublicVideoPlayer({
  videoId,
  videoUrl,
  thumbnail,
  r2Key,
}: PublicVideoPlayerProps) {
  const hasCountedView = useRef(false);

  async function handlePlay() {
    if (hasCountedView.current) {
      return;
    }

    hasCountedView.current = true;

    try {
      await fetch(`/api/videos/${videoId}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to record video view:", error);

      // Allow another attempt if the request failed.
      hasCountedView.current = false;
    }
  }

  const type = r2Key.endsWith(".webm")
    ? "video/webm"
    : r2Key.endsWith(".mov")
      ? "video/quicktime"
      : "video/mp4";

  return (
    <video
      className="aspect-video w-full bg-black"
      controls
      playsInline
      preload="metadata"
      poster={thumbnail}
      onPlay={handlePlay}
    >
      <source src={videoUrl} type={type} />

      Your browser does not support the video player.
    </video>
  );
}
