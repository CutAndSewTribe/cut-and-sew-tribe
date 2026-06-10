import type { Course } from "@/types";

export const professionalDressmakingCourse: Course = {
  id: "course-professional-dressmaking",

  slug: "professional-dressmaking",

  title: "Professional Dressmaking Mastery",

  subtitle:
    "Master advanced dressmaking, garment fitting, alterations, and professional finishing techniques.",

  description:
    "A comprehensive intermediate-level dressmaking program designed for students who already understand the basics of sewing and garment construction. This course focuses on advanced pattern drafting, precision fitting, garment alterations, professional finishing methods, and commercial production workflows. Students will develop the technical skills required to create high-quality garments for clients, build a professional portfolio, and confidently transition from hobbyist to professional dressmaker.",

  level: "intermediate",

  category: "dressmaking",

  thumbnail: "/images/courses/professional-dressmaking.jpg",

  previewVideo: "/videos/previews/professional-dressmaking.mp4",

  price: 149900,

  currency: "NGN",

  duration: "12 Weeks",

  modules: [
    {
      id: "module-advanced-pattern-drafting",
      title: "Advanced Pattern Drafting",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-garment-fitting",
      title: "Garment Fitting & Adjustments",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-alterations",
      title: "Professional Alteration Techniques",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-dress-construction",
      title: "Advanced Dress Construction",
      lessons: 14,
      duration: "2 Weeks",
    },

    {
      id: "module-sleeves-collars",
      title: "Sleeves, Collars & Design Variations",
      lessons: 10,
      duration: "1 Week",
    },

    {
      id: "module-finishing-techniques",
      title: "Professional Finishing Techniques",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-client-workflow",
      title: "Client Measurement & Production Workflow",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-portfolio-project",
      title: "Portfolio Garment Project",
      lessons: 12,
      duration: "2 Weeks",
    },
  ],

  outcomes: [
    "Draft advanced garment patterns with confidence.",
    "Perform accurate garment fitting and corrections.",
    "Handle professional clothing alterations for clients.",
    "Construct high-quality dresses using advanced techniques.",
    "Create and modify sleeves, collars, and design details.",
    "Apply industry-standard garment finishing methods.",
    "Manage client measurements and production processes.",
    "Build a portfolio of professionally finished garments.",
    "Increase earning potential through dressmaking services.",
    "Prepare for specialization in bridal, couture, or fashion business.",
  ],

  featured: true,

  publishedAt: "2026-06-08T00:00:00.000Z",
};

export default professionalDressmakingCourse;