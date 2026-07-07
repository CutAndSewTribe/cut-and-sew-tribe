export interface LessonResource {
  id: string;
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  slug: string;

  title: string;

  description: string;

  duration: string;

  videoUrl: string;

  resources: LessonResource[];
}

export interface LearningModule {
  id: string;

  slug: string;

  title: string;

  description: string;

  duration: string;

  lessons: Lesson[];
}

export interface LearningCourse {
  slug: string;

  title: string;

  modules: LearningModule[];
}