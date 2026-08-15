"use client";

import { useState } from "react";

import {
  createCourseAction,
  updateCourseAction,
} from "@/app/instructor/courses/actions";
import { uploadCourseImage } from "@/lib/upload";

interface CourseFormValues {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  price: number;
  currency: string;
  duration: string;

  hero_image: string | null;
  thumbnail: string | null;
  preview_video: string | null;

  telegram_group_name: string | null;
  telegram_invite_link: string | null;

  featured: boolean;
  published: boolean;
}

interface CourseFormProps {
  initialValues?: Partial<CourseFormValues>;
  courseId?: string;
}

const defaults: CourseFormValues = {
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  category: "Dressmaking",
  level: "Beginner",
  price: 0,
  currency: "NGN",
  duration: "",

  hero_image: null,
  thumbnail: null,
  preview_video: null,

  telegram_group_name: null,
  telegram_invite_link: null,

  featured: false,
  published: false,
};

export default function CourseForm({
  initialValues,
  courseId,
}: CourseFormProps) {
  const [values, setValues] = useState({
    ...defaults,
    ...initialValues,
  });

  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const isEditing = Boolean(courseId);

  function update<K extends keyof CourseFormValues>(
    key: K,
    value: CourseFormValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function generateSlug(title: string) {
return title
.toLowerCase()
.trim()
.replace(/[^a-z0-9\s-]/g, "")
.replace(/\s+/g, "-")
.replace(/-+/g, "-")
.replace(/^-|-$/g, "");
}


  async function handleHeroUpload(file: File) {
  try {
    setUploadingHero(true);

    const url = await uploadCourseImage(
      file,
      "courses",
      values.slug || "course",
      "hero"
    );

    update("hero_image", url);
  } catch (error) {
    console.error(error);
    alert("Failed to upload hero image.");
  } finally {
    setUploadingHero(false);
  }
}

async function handleThumbnailUpload(file: File) {
  try {
    setUploadingThumbnail(true);

    const url = await uploadCourseImage(
      file,
      "courses",
      values.slug || "course",
      "thumbnail"
    );

    update("thumbnail", url);
  } catch (error) {
    console.error(error);
    alert("Failed to upload thumbnail.");
  } finally {
    setUploadingThumbnail(false);
  }
}

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: values.title,
        slug: values.slug,
        subtitle: values.subtitle,
        description: values.description,

        category: values.category,
        level: values.level,

        price: values.price,
        currency: values.currency,

        duration: values.duration,

        hero_image: values.hero_image,
        thumbnail: values.thumbnail,
        preview_video: values.preview_video,

        telegram_group_name: values.telegram_group_name,
        telegram_invite_link: values.telegram_invite_link,

        featured: values.featured,
        published: values.published,
      };

      if (courseId) {
        await updateCourseAction(courseId, payload);
      } else {
        await createCourseAction(payload);
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : JSON.stringify(error)
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="mb-6">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">
          Basic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Course Title
            </label>

            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.title}
              onChange={(e) => {
                const title = e.target.value;
                update("title", title);
                update("slug", generateSlug(title));
              }}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Slug
            </label>

            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.slug}
              onChange={(e) => update("slug", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-neutral-800">
              Subtitle
            </label>

            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-neutral-800">
              Description
            </label>

            <textarea
              rows={6}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">
          Course Details
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Category
            </label>

            <select
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option>Dressmaking</option>
              <option>Bridal</option>
              <option>Menswear</option>
              <option>Business</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Level
            </label>

            <select
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.level}
              onChange={(e) => update("level", e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Duration
            </label>

            <input
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.duration}
              onChange={(e) => update("duration", e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Price
            </label>

            <input
              type="number"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Currency
            </label>

            <select
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:border-[#661093] focus:outline-none focus:ring-2 focus:ring-[#661093]/20"
              value={values.currency}
              onChange={(e) => update("currency", e.target.value)}
            >
              <option>NGN</option>
              <option>USD</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">
          Media
        </h2>

        <div className="space-y-8">
          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Hero Image
            </label>

            {values.hero_image ? (
              <img
                src={values.hero_image}
                alt="Hero preview"
                className="mb-3 h-48 w-full rounded-xl border border-neutral-200 object-cover"
              />
            ) : (
              <div className="mb-3 flex h-48 items-center justify-center rounded-xl border border-dashed border-neutral-300 text-sm text-neutral-500">
                No hero image uploaded
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={uploadingHero}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleHeroUpload(file);
              }}
              className="block w-full text-sm text-neutral-700"
            />

            {uploadingHero && (
              <p className="mt-2 text-sm text-[#661093]">
                Uploading hero image...
              </p>
            )}

            <p className="mt-2 text-sm text-neutral-500">
              Large image used on the course landing page and as the preview poster.
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Course Thumbnail
            </label>

            {values.thumbnail ? (
              <img
                src={values.thumbnail}
                alt="Thumbnail preview"
                className="mb-3 h-32 w-32 rounded-xl border border-neutral-200 object-cover"
              />
            ) : (
              <div className="mb-3 flex h-32 w-32 items-center justify-center rounded-xl border border-dashed border-neutral-300 text-xs text-neutral-500">
                No thumbnail
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={uploadingThumbnail}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleThumbnailUpload(file);
              }}
              className="block w-full text-sm text-neutral-700"
            />

            {uploadingThumbnail && (
              <p className="mt-2 text-sm text-[#661093]">
                Uploading thumbnail...
              </p>
            )}

            <p className="mt-2 text-sm text-neutral-500">
              Small image used for course cards and marketplace listings.
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Preview Video URL
            </label>

            <input
              placeholder="https://... or /videos/preview.mp4"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
              value={values.preview_video ?? ""}
              onChange={(e) =>
                update(
                  "preview_video",
                  e.target.value === "" ? null : e.target.value
                )
              }
            />

            <p className="mt-2 text-sm text-neutral-500">
              When provided, the hero image becomes the clickable thumbnail that
              starts the preview video on the landing page.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">
          Telegram Community
        </h2>

        <div className="space-y-6">
          <input
            placeholder="Group Name"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            value={values.telegram_group_name ?? ""}
            onChange={(e) =>
              update(
                "telegram_group_name",
                e.target.value === ""
                  ? null
                  : e.target.value
              )
            }
          />

          <input
            placeholder="Invite Link"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            value={values.telegram_invite_link ?? ""}
            onChange={(e) =>
              update(
                "telegram_invite_link",
                e.target.value === ""
                  ? null
                  : e.target.value
              )
            }
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-6 text-2xl font-bold text-neutral-900">
          Publishing
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-neutral-800">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) =>
                update("featured", e.target.checked)
              }
            />
            Featured Course
          </label>

          <label className="flex items-center gap-3 text-neutral-800">
            <input
              type="checkbox"
              checked={values.published}
              onChange={(e) =>
                update("published", e.target.checked)
              }
            />
            Publish Immediately
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-800 hover:bg-neutral-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#661093] px-8 py-3 font-semibold text-white disabled:opacity-60"
        >
          {saving
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
            ? "Save Changes"
            : "Create Course"}
        </button>
      </div>
    </form>
  );
}