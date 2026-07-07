import type { LearningModule } from "../types";

const module02: LearningModule = {
  id: "module-02",

  title: "Garment Fitting",

  lessons: [
    {
      id: "lesson-04",

      slug: "body-analysis",

      title: "Body Analysis",

      duration: "20 min",

      videoUrl:
        "https://example.com/videos/professional-dressmaking/body-analysis.mp4",

      description:
        "Understanding client body shapes."
    },

    {
      id: "lesson-05",

      slug: "fitting",

      title: "Professional Fitting",

      duration: "34 min",

      videoUrl:
        "https://example.com/videos/professional-dressmaking/fitting.mp4",

      description:
        "Professional garment fitting."
    }
  ]
};

export default module02;