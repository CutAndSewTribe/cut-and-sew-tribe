export interface LessonResource {
  id: string;

  title: string;

  type: string;

  href: string;

  size?: string;
}

export interface LearningLesson {
  id: string;

  slug: string;

  title: string;

  duration: string;

  videoUrl: string;

  description: string;

  resources?: LessonResource[];
}

export interface LearningModule {
  id: string;

  title: string;

  lessons: LearningLesson[];
}

export interface LearningCourse {
  slug: string;

  title: string;

  telegramCommunity: string;

  modules: LearningModule[];
}