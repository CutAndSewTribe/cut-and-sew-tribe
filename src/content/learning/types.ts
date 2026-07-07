export interface LearningLesson {
  id: string;
  slug: string;

  title: string;

  duration: string;

  videoUrl: string;

  description: string;

  resources?: {
    title: string;
    url: string;
  }[];
}

export interface LearningModule {
  id: string;

  title: string;

  lessons: LearningLesson[];
}

export interface LearningCourse {
  slug: string;

  modules: LearningModule[];
}