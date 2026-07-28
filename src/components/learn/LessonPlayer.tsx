"use client";

import { useState } from "react";

import type {
  LearningCourse,
  LearningLesson,
} from "@/content/learning/types";

import { markLessonComplete } from "@/lib/lesson-progress";

import VideoPlayer from "./VideoPlayer";
import LessonHeader from "./LessonHeader";
import LessonOverview from "./LessonOverview";
import LessonResources from "./LessonResources";
import CourseCommunityCard from "./CourseCommunityCard";
import LessonCompletionCard from "./LessonCompletionCard";

interface Props {
  lesson: LearningLesson;
  course: LearningCourse;
}

export default function LessonPlayer({
  lesson,
  course,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function handleComplete() {
    try {
      setSaving(true);

      await markLessonComplete(
        course.slug,
        lesson.id
      );

      setCompleted(true);
    } catch (error) {
      console.error(error);
      alert("Unable to save lesson progress.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

      <VideoPlayer
        videoUrl={lesson.videoUrl}
      />

      <div className="space-y-8 p-8">

        <LessonHeader lesson={lesson} />

        <LessonOverview
          description={lesson.description}
        />

        <LessonResources
          resources={[]}
        />

        <CourseCommunityCard
          groupName={`${course.title} Students`}
          inviteLink={course.telegramCommunity}
        />

        <LessonCompletionCard
          saving={saving}
          completed={completed}
          onComplete={handleComplete}
        />

      </div>

    </section>
  );
}