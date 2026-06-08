import type { Course } from "@/types";

export const beginnerFashionDesignCourse: Course = {
  id: "course-beginner-fashion-design",

  slug: "beginner-fashion-design",

  title: "Beginner Fashion Design & Dressmaking",

  subtitle:
    "Learn fashion design, pattern drafting, fabric cutting, and garment construction from scratch.",

  description:
    "A beginner-friendly fashion design and dressmaking program created for aspiring designers and sewing enthusiasts. This course teaches the complete foundation of garment creation, including measurements, pattern drafting, fabric cutting, sewing techniques, finishing methods, and professional workflow. By the end of the program, students will confidently create well-fitted garments and prepare for advanced specialization courses.",

  level: "beginner",

  category: "dressmaking",

  thumbnail: "/images/courses/beginner-fashion-design.jpg",

  previewVideo: "/videos/previews/beginner-fashion-design.mp4",

  price: 49900,

  currency: "NGN",

  duration: "8 Weeks",

  modules: [
    {
      id: "module-introduction",
      title: "Introduction to Fashion Design & Sewing",
      lessons: 6,
      duration: "1 Week",
    },

    {
      id: "module-tools-materials",
      title: "Tools, Equipment & Fabric Fundamentals",
      lessons: 5,
      duration: "1 Week",
    },

    {
      id: "module-measurements",
      title: "Body Measurements & Sizing Systems",
      lessons: 7,
      duration: "1 Week",
    },

    {
      id: "module-pattern-drafting",
      title: "Basic Pattern Drafting",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-fabric-cutting",
      title: "Fabric Layout & Cutting Techniques",
      lessons: 5,
      duration: "1 Week",
    },

    {
      id: "module-garment-construction",
      title: "Garment Construction & Sewing",
      lessons: 12,
      duration: "1 Week",
    },

    {
      id: "module-finishing",
      title: "Finishing Techniques & Professional Presentation",
      lessons: 5,
      duration: "1 Week",
    },
  ],

  outcomes: [
    "Understand essential fashion design principles.",
    "Take accurate body measurements confidently.",
    "Draft basic bodice, skirt, and sleeve patterns.",
    "Choose appropriate fabrics for different garment types.",
    "Cut fabric accurately using professional methods.",
    "Construct garments using industry-standard sewing techniques.",
    "Apply finishing techniques for a polished look.",
    "Create complete beginner-level garments independently.",
    "Build a foundation for bridal, menswear, childrenswear, and advanced dressmaking.",
    "Prepare for professional fashion design opportunities or further specialization.",
  ],

  featured: true,

  publishedAt: "2026-06-08T00:00:00.000Z",
};

export default beginnerFashionDesignCourse;