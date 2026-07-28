import type { Course } from "@/types";

export const menswearMasterclassCourse: Course = {
  id: "course-menswear-masterclass",

  slug: "menswear-masterclass",

  title: "Menswear Masterclass",

  subtitle:
    "Learn professional menswear drafting, tailoring, fitting, and garment construction.",

  description:
    "An advanced menswear specialization designed for fashion designers and dressmakers who want to create high-quality garments for male clients. Students will learn menswear measurements, shirt construction, trousers, traditional attire, jackets, fitting techniques, tailoring principles, and client management. By the end of the course, students will confidently produce professional menswear collections and custom garments.",

  level: "advanced",

  category: "menswear",

  thumbnail: "/images/courses/menswear-masterclass.jpg",

  previewVideo: "/videos/previews/menswear-masterclass.mp4",

  price: 199900,

  currency: "NGN",

  duration: "14 Weeks",

  modules: [
    {
      id: "module-menswear-foundations",
      title: "Menswear Fundamentals",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-measurements",
      title: "Menswear Measurements & Fit",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-shirts",
      title: "Professional Shirt Construction",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-trousers",
      title: "Trouser Drafting & Construction",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-native-wear",
      title: "Traditional & Native Menswear",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-jackets",
      title: "Jackets & Structured Garments",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-finishing",
      title: "Tailoring Finishing Techniques",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-business",
      title: "Menswear Client Management",
      lessons: 8,
      duration: "2 Weeks",
    },
  ],

  outcomes: [
    "Take accurate menswear measurements.",
    "Draft professional shirt patterns.",
    "Construct trousers with proper fit and finishing.",
    "Produce traditional and native menswear garments.",
    "Create structured jackets and advanced menswear pieces.",
    "Apply tailoring and finishing techniques.",
    "Manage menswear clients professionally.",
    "Build a menswear portfolio.",
    "Launch a menswear specialization service.",
    "Increase revenue through custom menswear production.",
  ],

community: {
  platform: "telegram",
  groupName: "Menswear Masterclass Students",
  inviteLink: "https://t.me/replace_with_menswear_group",
},

  featured: true,

  publishedAt: "2026-06-08T00:00:00.000Z",
};

export default menswearMasterclassCourse;