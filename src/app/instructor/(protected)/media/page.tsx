import Link from "next/link";
import { Plus, Video as VideoIcon } from "lucide-react";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import VideoLibraryActions from "@/components/instructor/media/VideoLibraryActions";
import { getVideos } from "@/lib/instructor/videos";

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

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export default async function MediaPage() {
  const videos = await getVideos();

  const publishedCount = videos.filter(
    (video) => video.published
  ).length;

  const draftCount = videos.length - publishedCount;

  return (
    <InstructorPage
      title="Media Library"
      description="Manage your video content, previews, and public learning media."
    >
      <div className="space-y-8">
        {/* Header actions */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                <VideoIcon className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Video Library
                </h2>

                <p className="text-sm text-gray-500">
                  Upload and manage the videos used across Cut and
                  Sew Tribe.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/instructor/media/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#520b76]"
          >
            <Plus className="h-4 w-4" />
            Upload Video
          </Link>
        </div>

        {/* Library summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Videos
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {videos.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Published
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Drafts
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {draftCount}
            </p>
          </div>
        </div>

        {/* Video library */}
        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
              <VideoIcon className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Your media library is empty
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
              Upload your first video to begin building the Cut and
              Sew Tribe public video library. Videos can also be
              selected later as course preview videos.
            </p>

            <Link
              href="/instructor/media/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#520b76]"
            >
              <Plus className="h-4 w-4" />
              Upload Your First Video
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Video
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Level
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Duration
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Views
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Added
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {videos.map((video) => (
                    <tr
                      key={video.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {video.thumbnail_url ? (
                              <img
                                src={video.thumbnail_url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <VideoIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                              {video.title}
                            </p>

                            <p className="mt-1 truncate text-sm text-gray-500">
                              /videos/{video.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-600">
                        {getCategoryLabel(video.category)}
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-600">
                        {getLevelLabel(video.level)}
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-600">
                        {formatDuration(video.duration_seconds)}
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-600">
                        {video.views.toLocaleString()}
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            video.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {video.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-500">
                        {formatDate(video.created_at)}
                      </td>

                      <td className="px-6 py-5">
                        <VideoLibraryActions
                          videoId={video.id}
                          slug={video.slug}
                          published={video.published}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </InstructorPage>
  );
}