"use client";

import { useMemo, useState } from "react";

interface Lesson {
id: string;
title: string;
slug: string;
description: string | null;
lesson_type: string;
video_url: string | null;
content_md: string | null;
module_id: string;
published: boolean;
position: number;
}

interface CourseModule {
id: string;
title: string;
position: number;
lessons: Lesson[];
}

interface Course {
title: string;
subtitle: string | null;
telegram_group_name: string | null;
telegram_invite_link: string | null;
}

interface Props {
course: Course;
modules: CourseModule[];
firstLesson: Lesson;
}

function getYouTubeEmbedUrl(
videoUrl: string
): string {
try {
const url = new URL(videoUrl);

if (url.hostname === "youtu.be") {
  const videoId = url.pathname.replace("/", "");

  return `https://www.youtube.com/embed/${videoId}`;
}

if (
  url.hostname.includes("youtube.com") &&
  url.pathname === "/watch"
) {
  const videoId = url.searchParams.get("v");

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

if (
  url.hostname.includes("youtube.com") &&
  url.pathname.startsWith("/embed/")
) {
  return videoUrl;
}

return videoUrl;

} catch {
return videoUrl;
}
}

export default function LearningWorkspace({
course,
modules,
firstLesson,
}: Props) {
const [selectedLessonId, setSelectedLessonId] =
useState(firstLesson.id);

const selectedLesson = useMemo(() => {
for (const courseModule of modules) {
const lesson = courseModule.lessons.find(
(item) => item.id === selectedLessonId
);

  if (lesson) {
    return lesson;
  }
}

return firstLesson;

}, [
modules,
selectedLessonId,
firstLesson,
]);

/*

* Temporary placeholder link.
*
* This allows the Telegram community card
* to appear while testing the learning workspace.
*
* Later, when the real course.telegram_invite_link
* exists, it will automatically be used instead.
  */
  const telegramLink =
  course.telegram_invite_link ??
  "https://t.me/cutandsewtribe";

const telegramGroupName =
course.telegram_group_name ??
"Cut and Sew Tribe Community";

return ( <div className="space-y-6"> <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"> <main className="min-w-0"> <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
{/* VIDEO PLAYER */} <div className="aspect-video bg-black">
{selectedLesson.lesson_type === "video" &&
selectedLesson.video_url ? (
<iframe
key={selectedLesson.id}
src={getYouTubeEmbedUrl(
selectedLesson.video_url
)}
title={selectedLesson.title}
className="h-full w-full"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
/>
) : ( <div className="flex h-full items-center justify-center px-6 text-center text-white">
This lesson does not have a video yet. </div>
)} </div>

        {/* TELEGRAM COMMUNITY — CLOSE TO VIDEO */}
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mt-4 flex items-center gap-4 rounded-2xl border border-[#229ED9]/30 bg-[#229ED9]/10 p-4 transition hover:border-[#229ED9]/50 hover:bg-[#229ED9]/20 sm:mx-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#229ED9] text-2xl text-white">
            ✈️
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-neutral-900">
              Download Telegram App and Click this Link to Watch Offline
            </p>

            <p className="mt-1 text-sm text-neutral-600">
              Connect with other students, receive course updates, and stay connected with the community.
            </p>

            <p className="mt-2 text-sm font-semibold text-[#229ED9]">
              {telegramGroupName}
            </p>
          </div>

          <span className="ml-auto shrink-0 text-xl text-[#229ED9]">
            →
          </span>
        </a>

        {/* CURRENT LESSON DETAILS */}
        <div className="p-6">
          <p className="text-sm font-semibold text-[#661093]">
            Now learning
          </p>

          <h2 className="mt-2 text-2xl font-bold text-neutral-900">
            {selectedLesson.title}
          </h2>

          {selectedLesson.description && (
            <p className="mt-3 leading-7 text-neutral-600">
              {selectedLesson.description}
            </p>
          )}
        </div>
      </div>
    </main>

    {/* COURSE SIDEBAR */}
    <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-xl font-bold text-neutral-900">
        Course Content
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        Select a lesson to continue learning.
      </p>

      <div className="mt-6 space-y-6">
        {modules.map(
          (courseModule, moduleIndex) => (
            <div key={courseModule.id}>
              <h3 className="font-semibold text-neutral-900">
                Module {moduleIndex + 1}:{" "}
                {courseModule.title}
              </h3>

              <div className="mt-3 space-y-2">
                {courseModule.lessons.map(
                  (lesson, lessonIndex) => {
                    const isSelected =
                      lesson.id ===
                      selectedLesson.id;

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() =>
                          setSelectedLessonId(
                            lesson.id
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                          isSelected
                            ? "bg-[#661093]/10 text-[#661093]"
                            : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isSelected
                              ? "bg-[#661093] text-white"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          {isSelected
                            ? "▶"
                            : lessonIndex + 1}
                        </span>

                        <span className="min-w-0 text-sm font-medium">
                          {lesson.title}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}
      </div>
    </aside>
  </div>
</div>
);
}
