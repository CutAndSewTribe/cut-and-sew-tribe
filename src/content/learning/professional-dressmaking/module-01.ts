import type { LearningModule } from "../types";

const module01: LearningModule = {
  id: "module-01",

  title: "Advanced Pattern Drafting",

  lessons: [
    {
      id: "lesson-01",

      slug: "introduction",

      title: "Welcome to Professional Dressmaking",

      duration: "8 min",

      videoUrl:
        "https://example.com/videos/professional-dressmaking/introduction.mp4",

      description:
        "Course overview and what you'll accomplish."
    },

    {
      id: "lesson-02",

      slug: "tools",

      title: "Professional Tools",

      duration: "18 min",

      videoUrl:
        "https://example.com/videos/professional-dressmaking/tools.mp4",

      description:
        "Essential professional equipment."
    },

    {
      id: "lesson-03",

      slug: "advanced-patterns",

      title: "Advanced Pattern Drafting",

      duration: "42 min",

      videoUrl:
        "https://example.com/videos/professional-dressmaking/patterns.mp4",

      description:
        "Drafting professional patterns."
    }
  ]
};

export default module01;