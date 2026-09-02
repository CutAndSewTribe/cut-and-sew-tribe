"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Upload, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "dressmaking", label: "Dressmaking" },
  { value: "bridal", label: "Bridal" },
  { value: "menswear", label: "Menswear" },
  { value: "childrenswear", label: "Childrenswear" },
  { value: "fashion-business", label: "Fashion Business" },
  { value: "general", label: "General" },
] as const;

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 2
  )} ${units[index]}`;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

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

function getVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);

      if (Number.isFinite(video.duration)) {
        resolve(Math.round(video.duration));
      } else {
        resolve(null);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };

    video.src = objectUrl;
  });
}

export default function NewVideoPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]["value"]>("general");
  const [level, setLevel] =
    useState<(typeof LEVELS)[number]["value"]>("beginner");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "saving" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const fileSummary = useMemo(() => {
    if (!file) {
      return null;
    }

    return `${file.name} • ${formatBytes(file.size)}`;
  }, [file]);

  function selectFile(selectedFile: File | null) {
    if (!selectedFile) {
      return;
    }

    setError("");

    if (
      ![
        "video/mp4",
        "video/webm",
        "video/quicktime",
      ].includes(selectedFile.type)
    ) {
      setError(
        "Please choose an MP4, WebM, or MOV video file."
      );
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The maximum video size is 2 GB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    selectFile(event.target.files?.[0] ?? null);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
    selectFile(event.dataTransfer.files?.[0] ?? null);
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  }

  async function uploadToR2(
    uploadUrl: string,
    selectedFile: File
  ): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", uploadUrl);

      xhr.setRequestHeader(
        "Content-Type",
        selectedFile.type || "application/octet-stream"
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(
            Math.round((event.loaded / event.total) * 100)
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
          return;
        }

        reject(
          new Error(
            `Cloudflare R2 upload failed with status ${xhr.status}.`
          )
        );
      };

      xhr.onerror = () => {
        reject(
          new Error(
            "The video upload failed. Please check your connection and try again."
          )
        );
      };

      xhr.onabort = () => {
        reject(new Error("The video upload was cancelled."));
      };

      xhr.send(selectedFile);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!file) {
      setError("Please select a video file.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a video title.");
      return;
    }

    if (!slug.trim()) {
      setError("Please enter a video slug.");
      return;
    }

    setStatus("uploading");
    setUploadProgress(0);

    try {
      const durationSeconds = await getVideoDuration(file);

      const uploadResponse = await fetch("/api/videos/upload", {
        method: "POST",
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
          uploadData.error || "Unable to prepare video upload."
        );
      }

      await uploadToR2(uploadData.uploadUrl, file);

      setStatus("saving");

      const completeResponse = await fetch(
        "/api/videos/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uploadData.videoId,
            slug: slug.trim(),
            title: title.trim(),
            description: description.trim() || null,
            category,
            level,
            r2Key: uploadData.key,
            videoUrl: uploadData.publicUrl,
            durationSeconds,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            featured,
            published,
          }),
        }
      );

      const completeData = await completeResponse.json();

      if (!completeResponse.ok) {
        throw new Error(
          completeData.error ||
            "The video uploaded successfully but could not be saved."
        );
      }

      setStatus("success");

      setTimeout(() => {
        router.push("/instructor/media");
        router.refresh();
      }, 700);
    } catch (submitError) {
      console.error("New video upload:", submitError);

      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while uploading the video."
      );
    }
  }

  const isBusy =
    status === "uploading" || status === "saving";

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Link
            href="/instructor/media"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#661093]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Media Library
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Upload Video
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-neutral-600">
            Add a public learning video to the Cut and Sew Tribe
            media library.
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
      >
        <div className="space-y-8">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Video file
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Upload an MP4, WebM, or MOV file up to 2 GB.
              </p>
            </div>

            <label
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                dragActive
                  ? "border-[#661093] bg-[#661093]/5"
                  : "border-neutral-300 bg-neutral-50 hover:border-[#661093]/50 hover:bg-neutral-50"
              }`}
            >
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                className="sr-only"
                onChange={handleFileChange}
                disabled={isBusy}
              />

              {file ? (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                    <Video className="h-8 w-8" />
                  </div>

                  <p className="mt-5 max-w-full truncate font-semibold text-neutral-900">
                    {file.name}
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    {fileSummary}
                  </p>

                  <span className="mt-5 text-sm font-semibold text-[#661093]">
                    Choose a different video
                  </span>
                </>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                    <Upload className="h-8 w-8" />
                  </div>

                  <p className="mt-5 font-semibold text-neutral-900">
                    Drop your video here
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    or click to browse your computer
                  </p>

                  <span className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#661093] shadow-sm ring-1 ring-neutral-200">
                    Choose Video
                  </span>
                </>
              )}
            </label>

            {status === "uploading" && (
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-700">
                    Uploading to Cloudflare R2
                  </span>

                  <span className="font-semibold text-[#661093]">
                    {uploadProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-[#661093] transition-[width]"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {status === "saving" && (
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#661093]" />
                Saving video information...
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Video information
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                This information will appear on the public video
                page.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Title
                </label>

                <input
                  id="title"
                  value={title}
                  onChange={(event) =>
                    handleTitleChange(event.target.value)
                  }
                  placeholder="e.g. How to Take Accurate Body Measurements"
                  disabled={isBusy}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  URL slug
                </label>

                <input
                  id="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlugManuallyEdited(true);
                    setSlug(slugify(event.target.value));
                  }}
                  placeholder="how-to-take-accurate-body-measurements"
                  disabled={isBusy}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Public URL: /videos/{slug || "your-video-slug"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe what viewers will learn from this video..."
                  rows={6}
                  disabled={isBusy}
                  className="w-full resize-y rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-neutral-800"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                      setCategory(
                        event.target.value as typeof category
                      )
                    }
                    disabled={isBusy}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
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
                    className="mb-2 block text-sm font-semibold text-neutral-800"
                  >
                    Level
                  </label>

                  <select
                    id="level"
                    value={level}
                    onChange={(event) =>
                      setLevel(
                        event.target.value as typeof level
                      )
                    }
                    disabled={isBusy}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
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

              <div>
                <label
                  htmlFor="tags"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Tags
                </label>

                <input
                  id="tags"
                  value={tags}
                  onChange={(event) =>
                    setTags(event.target.value)
                  }
                  placeholder="sewing, measurements, beginner"
                  disabled={isBusy}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/10"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Separate tags with commas.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              Publishing
            </h2>

            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) =>
                    setPublished(event.target.checked)
                  }
                  disabled={isBusy}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#661093] focus:ring-[#661093]"
                />

                <span>
                  <span className="block text-sm font-semibold text-neutral-800">
                    Publish immediately
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-neutral-500">
                    Published videos appear on the public /videos
                    library.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(event.target.checked)
                  }
                  disabled={isBusy}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#661093] focus:ring-[#661093]"
                />

                <span>
                  <span className="block text-sm font-semibold text-neutral-800">
                    Feature this video
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-neutral-500">
                    Featured videos can receive prominent placement
                    in the public video experience.
                  </span>
                </span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Course previews
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              This video can be selected later as a preview for a
              course. Standalone videos do not need to belong to a
              course.
            </p>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {status === "success" && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                  <p className="font-semibold text-green-800">
                    Video uploaded successfully
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Returning to the Media Library...
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isBusy || !file}
            className="w-full rounded-xl bg-[#661093] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#520b76] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "uploading"
              ? `Uploading ${uploadProgress}%`
              : status === "saving"
                ? "Saving Video..."
                : "Upload Video"}
          </button>

          <p className="text-center text-xs leading-5 text-neutral-500">
            The video file is uploaded directly from your browser
            to Cloudflare R2. Your server does not proxy the video
            file.
          </p>
        </aside>
      </form>
    </div>
  );
}
