"use client";

import { useState } from "react";
import {
  Check,
  Edit3,
  Eye,
  Loader2,
  MoreHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";

interface VideoLibraryActionsProps {
  videoId: string;
  slug: string;
  published: boolean;
}

export default function VideoLibraryActions({
  videoId,
  slug,
  published,
}: VideoLibraryActionsProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(published);
  const [error, setError] = useState("");

  async function togglePublished() {
    setIsPublishing(true);
    setError("");

    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !isPublished,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to update video status."
        );
      }

      setIsPublished(Boolean(data.video?.published));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update video status."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/videos/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-[#661093]/30 hover:bg-[#661093]/5 hover:text-[#661093]"
        title="View public video"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden xl:inline">View</span>
      </Link>

      <Link
        href={`/instructor/media/${videoId}/edit`}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-[#661093]/30 hover:bg-[#661093]/5 hover:text-[#661093]"
        title="Edit video"
      >
        <Edit3 className="h-4 w-4" />
        <span className="hidden xl:inline">Edit</span>
      </Link>

      <button
        type="button"
        onClick={togglePublished}
        disabled={isPublishing}
        className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          isPublished
            ? "border border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            : "bg-[#661093] text-white hover:bg-[#520b76]"
        }`}
        title={isPublished ? "Unpublish video" : "Publish video"}
      >
        {isPublishing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPublished ? (
          <X className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}

        <span className="hidden xl:inline">
          {isPublishing
            ? "Saving..."
            : isPublished
              ? "Unpublish"
              : "Publish"}
        </span>
      </button>

      {error && (
        <div
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-red-700 shadow-xl"
          role="alert"
        >
          {error}
        </div>
      )}

      <span className="sr-only">
        <MoreHorizontal />
      </span>
    </div>
  );
}
