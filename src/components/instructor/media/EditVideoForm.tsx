"use client";

import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Check,
  Loader2,
  Save,
  Video as VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type {
  InstructorVideo,
  VideoCategory,
  VideoLevel,
} from "@/lib/instructor/videos";

const CATEGORIES: {
  value: VideoCategory;
  label: string;
}[] = [
  {
    value: "dressmaking",
    label: "Dressmaking",
  },
  {
    value: "bridal",
    label: "Bridal",
  },
  {
    value: "menswear",
    label: "Menswear",
  },
  {
    value: "childrenswear",
    label: "Childrenswear",
  },
  {
    value: "fashion-business",
    label: "Fashion Business",
  },
  {
    value: "general",
    label: "General",
  },
];

const LEVELS: {
  value: VideoLevel;
  label: string;
}[] = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds < 0) {
    return "—";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      remainingSeconds.toString().padStart(2, "0"),
    ].join(":");
  }

  return [
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0"),
  ].join(":");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface EditVideoFormProps {
  video: InstructorVideo;
}

export default function EditVideoForm({
  video,
}: EditVideoFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(video.title);
  const [slug, setSlug] = useState(video.slug);
  const [description, setDescription] = useState(
    video.description ?? ""
  );
  const [category, setCategory] = useState<VideoCategory>(
    video.category
  );
  const [level, setLevel] = useState<VideoLevel>(video.level);
  const [tags, setTags] = useState(video.tags.join(", "));
  const [featured, setFeatured] = useState(video.featured);
  const [published, setPublished] = useState(video.published);

  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(true);

  const [status, setStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    setSlug(slugify(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const trimmedTitle = title.trim();
    const trimmedSlug = slug.trim();

    if (trimmedTitle.length < 2) {
      setError("Please enter a video title.");
      return;
    }

    if (!trimmedSlug) {
      setError("Please enter a video slug.");
      return;
    }

    setStatus("saving");

    try {
      const response = await fetch(`/api/videos/${video.id}`, {
  method: "PATCH",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
          title: trimmedTitle,
          slug: trimmedSlug,
          description: description.trim() || null,
          category,
          level,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          featured,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to update video."
        );
      }

      setStatus("success");

      router.refresh();

      setTimeout(() => {
        router.push("/instructor/media");
      }, 600);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update video."
      );
    }
  }

  const videoType = video.r2_key.endsWith(".webm")
    ? "video/webm"
    : video.r2_key.endsWith(".mov")
      ? "video/quicktime"
      : "video/mp4";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/instructor/media"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#661093]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Media Library
        </Link>
      </div>

      {/* Video preview */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Video Preview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            This is the video stored in Cloudflare R2. Editing
            this form does not replace the original video file.
          </p>
        </div>

        <div className="bg-black">
          {video.video_url ? (
            <video
              className="aspect-video max-h-[600px] w-full bg-black"
              controls
              playsInline
              preload="metadata"
              poster={video.thumbnail_url ?? undefined}
            >
              <source
                src={video.video_url}
                type={videoType}
              />
              Your browser does not support the video player.
            </video>
          ) : (
            <div className="flex aspect-video items-center justify-center text-gray-400">
              <div className="text-center">
                <VideoIcon className="mx-auto h-10 w-10" />
                <p className="mt-3 text-sm">
                  Video preview unavailable.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Duration
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatDuration(video.duration_seconds)}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Views
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {video.views.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              R2 Object
            </p>
            <p className="mt-1 truncate text-sm font-medium text-gray-900">
              {video.r2_key}
            </p>
          </div>
        </div>
      </section>

      {/* Video details */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Video Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update how this video appears throughout the public
            video library.
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-900"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(event) =>
                handleTitleChange(event.target.value)
              }
              maxLength={200}
              required
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              placeholder="Enter video title"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-semibold text-gray-900"
            >
              URL Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(event) =>
                handleSlugChange(event.target.value)
              }
              required
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              placeholder="video-url-slug"
            />

            <p className="mt-2 text-xs text-gray-500">
              Public URL:{" "}
              <span className="font-medium text-gray-700">
                /videos/{slug || "your-video"}
              </span>
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-900"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={6}
              className="mt-2 block w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              placeholder="Describe what viewers will learn from this video..."
            />
          </div>

          {/* Category and level */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-900"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as VideoCategory
                  )
                }
                className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              >
                {CATEGORIES.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-sm font-semibold text-gray-900"
              >
                Level
              </label>

              <select
                id="level"
                name="level"
                value={level}
                onChange={(event) =>
                  setLevel(
                    event.target.value as VideoLevel
                  )
                }
                className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              >
                {LEVELS.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-900"
            >
              Tags
            </label>

            <input
              id="tags"
              name="tags"
              type="text"
              value={tags}
              onChange={(event) =>
                setTags(event.target.value)
              }
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
              placeholder="sewing, beginner, tools"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate tags with commas.
            </p>
          </div>
        </div>
      </section>

      {/* Publishing settings */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Publishing Settings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Control whether this video is visible in the public
            video library.
          </p>
        </div>

        <div className="space-y-4 p-6">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#661093]/30 hover:bg-[#661093]/5">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(event.target.checked)
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#661093] focus:ring-[#661093]"
            />

            <span>
              <span className="block text-sm font-semibold text-gray-900">
                Publish this video
              </span>

              <span className="mt-1 block text-sm leading-6 text-gray-500">
                Published videos are visible on the public
                /videos library and can be watched by visitors.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(event.target.checked)
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#661093] focus:ring-[#661093]"
            />

            <span>
              <span className="block text-sm font-semibold text-gray-900">
                Feature this video
              </span>

              <span className="mt-1 block text-sm leading-6 text-gray-500">
                Marks this video as featured for future featured
                video sections.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/instructor/media"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={status === "saving" || status === "success"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#661093] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#520b76] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : status === "success" ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
