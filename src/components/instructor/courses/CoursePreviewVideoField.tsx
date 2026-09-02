"use client";

import { useMemo, useState } from "react";
import { Check, Film, Loader2, Play, Upload, X } from "lucide-react";

interface LibraryVideo {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  level: string;
  thumbnail_url: string | null;
  video_url: string | null;
  duration_seconds: number | null;
  views: number;
  featured: boolean;
  published: boolean;
  tags: string[];
  published_at: string | null;
  created_at: string;
}

interface CoursePreviewVideoFieldProps {
  value: string | null;
  onChange: (videoId: string | null) => void;
  courseTitle: string;
  courseCategory: string;
  courseLevel: string;
  coursePublished: boolean;
}

const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024;

const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) {
    return "Unknown duration";
  }

  const totalSeconds = Math.max(0, Math.round(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeCategory(category: string): string {
  const value = category.toLowerCase().trim();

  const categoryMap: Record<string, string> = {
    dressmaking: "dressmaking",
    bridal: "bridal",
    menswear: "menswear",
    childrenswear: "childrenswear",
    "children's wear": "childrenswear",
    "fashion business": "fashion-business",
    "fashion-business": "fashion-business",
    business: "fashion-business",
    general: "general",
  };

  return categoryMap[value] ?? "general";
}

function normalizeLevel(level: string): string {
  const value = level.toLowerCase().trim();

  if (value === "intermediate") {
    return "intermediate";
  }

  if (value === "advanced") {
    return "advanced";
  }

  return "beginner";
}

function uploadWithProgress(
  uploadUrl: string,
  file: File,
  onProgress: (percentage: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);

    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) {
        return;
      }

      const percentage = Math.round(
        (event.loaded / event.total) * 100
      );

      onProgress(percentage);
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Video upload failed with status ${xhr.status}.`
        )
      );
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error while uploading the video."));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Video upload was cancelled."));
    });

    xhr.send(file);
  });
}

export default function CoursePreviewVideoField({
  value,
  onChange,
  courseTitle,
  courseCategory,
  courseLevel,
  coursePublished,
}: CoursePreviewVideoFieldProps) {
  const [videos, setVideos] = useState<LibraryVideo[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(
    null
  );

  const [showLibrary, setShowLibrary] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedVideo, setSelectedVideo] =
    useState<LibraryVideo | null>(null);

  const [actionError, setActionError] = useState<string | null>(
    null
  );

  const selectedVideoFromLibrary = useMemo(
    () => videos.find((video) => video.id === value) ?? null,
    [videos, value]
  );


  async function loadLibrary() {
    try {
      setLoadingLibrary(true);
      setLibraryError(null);

      const response = await fetch("/api/videos/library", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load the Video Library."
        );
      }

      const publishedVideos = (
        data.videos as LibraryVideo[]
      ).filter((video) => video.published);

      setVideos(publishedVideos);
    } catch (error) {
      console.error(error);

      setLibraryError(
        error instanceof Error
          ? error.message
          : "Failed to load the Video Library."
      );
    } finally {
      setLoadingLibrary(false);
    }
  }

  async function handleOpenLibrary() {
    setActionError(null);
    setShowLibrary(true);

    if (videos.length === 0) {
      await loadLibrary();
    }
  }

  function handleSelectVideo(video: LibraryVideo) {
    setSelectedVideo(video);
    onChange(video.id);
    setShowLibrary(false);
    setActionError(null);
  }

  function handleRemoveVideo() {
    setSelectedVideo(null);
    onChange(null);
    setActionError(null);
  }

  async function handleUpload(file: File) {
    try {
      setActionError(null);

      if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
        throw new Error(
          "Please upload an MP4, WebM, or MOV video."
        );
      }

      if (file.size > MAX_VIDEO_SIZE) {
        throw new Error(
          "The video is too large. Maximum allowed size is 2GB."
        );
      }

      setUploading(true);
      setUploadProgress(0);

      const videoElement = document.createElement("video");
      const objectUrl = URL.createObjectURL(file);

      const duration = await new Promise<number>((resolve) => {
        videoElement.preload = "metadata";

        videoElement.onloadedmetadata = () => {
          const videoDuration = Number(videoElement.duration);

          URL.revokeObjectURL(objectUrl);

          resolve(
            Number.isFinite(videoDuration)
              ? Math.round(videoDuration)
              : 0
          );
        };

        videoElement.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(0);
        };

        videoElement.src = objectUrl;
      });

      const uploadResponse = await fetch("/api/videos/upload", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.error || "Could not prepare the video upload."
        );
      }

      await uploadWithProgress(
        uploadData.uploadUrl,
        file,
        setUploadProgress
      );

      const baseTitle =
        courseTitle.trim() || "Course Preview Video";

      const baseSlug =
        slugify(courseTitle) || "course-preview";

      const uniqueSlug = `${baseSlug}-preview-${crypto
        .randomUUID()
        .slice(0, 8)}`;

      const completeResponse = await fetch(
        "/api/videos/complete",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uploadData.videoId,
            slug: uniqueSlug,
            title: `${baseTitle} Preview`,
            description: `Preview video for ${baseTitle}.`,
            category: normalizeCategory(courseCategory),
            level: normalizeLevel(courseLevel),
            r2Key: uploadData.key,
            videoUrl: uploadData.publicUrl ?? null,
            durationSeconds: duration,
            tags: ["course-preview"],
            featured: false,

            // A preview for a published course must itself be
            // published so it can be shown publicly.
            published: coursePublished,
          }),
        }
      );

      const completeData = await completeResponse.json();

      if (!completeResponse.ok) {
        throw new Error(
          completeData.error ||
            "The video uploaded, but could not be added to the Video Library."
        );
      }

      const newVideo: LibraryVideo = {
        id: uploadData.videoId,
        slug: uniqueSlug,
        title: `${baseTitle} Preview`,
        description: `Preview video for ${baseTitle}.`,
        category: normalizeCategory(courseCategory),
        level: normalizeLevel(courseLevel),
        thumbnail_url: null,
        video_url: uploadData.publicUrl ?? null,
        duration_seconds: duration,
        views: 0,
        featured: false,
        published: coursePublished,
        tags: ["course-preview"],
        published_at: coursePublished
          ? new Date().toISOString()
          : null,
        created_at: new Date().toISOString(),
      };

      setSelectedVideo(newVideo);

      setVideos((previous) => [
        newVideo,
        ...previous.filter(
          (video) => video.id !== newVideo.id
        ),
      ]);

      onChange(newVideo.id);

      setShowLibrary(false);
      setUploadProgress(100);
    } catch (error) {
      console.error(error);

      setActionError(
        error instanceof Error
          ? error.message
          : "Failed to upload the preview video."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleFileInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      void handleUpload(file);
    }

    event.target.value = "";
  }

  const currentVideo =
    selectedVideo?.id === value
      ? selectedVideo
      : selectedVideoFromLibrary;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-900">
          Course Preview Video
        </label>

        <p className="mt-1 text-sm text-neutral-500">
          Select a video from the Video Library or upload a new
          preview video. The selected video will be connected to
          this course automatically.
        </p>
      </div>

      {currentVideo ? (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="relative aspect-video overflow-hidden bg-neutral-950">
            {currentVideo.video_url ? (
              <video
                src={currentVideo.video_url}
                poster={currentVideo.thumbnail_url ?? undefined}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            ) : currentVideo.thumbnail_url ? (
              <img
                src={currentVideo.thumbnail_url}
                alt={currentVideo.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Film className="h-12 w-12 text-white/50" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-green-600" />

                <p className="truncate font-medium text-neutral-900">
                  {currentVideo.title}
                </p>
              </div>

              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                <span>
                  {formatDuration(
                    currentVideo.duration_seconds
                  )}
                </span>

                <span>
                  {currentVideo.views.toLocaleString()} views
                </span>

                <span className="capitalize">
                  {currentVideo.level}
                </span>
              </div>

              {!currentVideo.published && (
                <p className="mt-2 text-xs font-medium text-amber-700">
                  This preview video is currently a draft and
                  will not appear publicly until it is published.
                </p>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={handleOpenLibrary}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                Change
              </button>

              <button
                type="button"
                onClick={handleRemoveVideo}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
              <Film className="h-7 w-7" />
            </div>

            <h4 className="mt-4 font-semibold text-neutral-900">
              No preview video selected
            </h4>

            <p className="mt-1 max-w-md text-sm text-neutral-500">
              Choose an existing public video or upload a new
              course preview.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleOpenLibrary}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#661093] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#520b77] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Film className="h-4 w-4" />
                Choose from Video Library
              </button>

              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                <Upload className="h-4 w-4" />
                Upload New Preview
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="sr-only"
                  onChange={handleFileInput}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {uploading && (
        <div className="rounded-2xl border border-[#661093]/20 bg-[#661093]/5 p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#661093]" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-neutral-900">
                  Uploading preview video...
                </p>

                <span className="text-sm font-semibold text-[#661093]">
                  {uploadProgress}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-[#661093] transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {actionError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {showLibrary && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-neutral-900">
                Choose a Preview Video
              </h4>

              <p className="mt-1 text-sm text-neutral-500">
                Only published videos are available as public
                course previews.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowLibrary(false)}
              className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close Video Library"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {loadingLibrary ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#661093]" />
            </div>
          ) : libraryError ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {libraryError}

              <button
                type="button"
                onClick={() => void loadLibrary()}
                className="ml-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          ) : videos.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-5 py-8 text-center">
              <Film className="mx-auto h-8 w-8 text-neutral-400" />

              <p className="mt-3 font-medium text-neutral-900">
                No published videos available
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                Upload a new preview video to add one to the
                library.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {videos.map((video) => {
                const isSelected = video.id === value;

                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    className={`overflow-hidden rounded-2xl border text-left transition ${
                      isSelected
                        ? "border-[#661093] ring-2 ring-[#661093]/20"
                        : "border-neutral-200 hover:border-[#661093]/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-neutral-950">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Film className="h-8 w-8 text-white/40" />
                        </div>
                      )}

                      {isSelected && (
                        <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#661093] text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        {video.title}
                      </p>

                      <div className="mt-1 flex gap-3 text-xs text-neutral-500">
                        <span>
                          {formatDuration(
                            video.duration_seconds
                          )}
                        </span>

                        <span>
                          {video.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5 border-t border-neutral-200 pt-4">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
              <Upload className="h-4 w-4" />
              Upload New Preview Video
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="sr-only"
                onChange={handleFileInput}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-500">
        Maximum video size: 2GB. Supported formats: MP4, WebM,
        and MOV.
      </p>
    </div>
  );
}