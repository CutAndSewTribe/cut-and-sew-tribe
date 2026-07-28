import type { Course } from "@/types";

export const bridalMasterclassCourse: Course = {
  id: "course-bridal-masterclass",

  slug: "bridal-masterclass",

  title: "Bridal Fashion Masterclass",

  subtitle:
    "Master bridal gown design, corsetry, luxury finishing, and couture bridal production.",

  description:
    "An advanced bridal fashion program designed for dressmakers who want to specialize in wedding gowns and luxury bridal wear. Students will learn bridal gown construction, corsetry, boning techniques, luxury fabrics, lace application, embellishments, fitting sessions, and bridal client management. By the end of the course, students will confidently design and produce professional bridal garments suitable for paying clients.",

  level: "advanced",

  category: "bridal",

  thumbnail: "/images/courses/bridal-masterclass.jpg",

  previewVideo: "/videos/previews/bridal-masterclass.mp4",

  price: 249900,

  currency: "NGN",

  duration: "16 Weeks",

  modules: [
    {
      id: "module-bridal-industry",
      title: "Introduction to Bridal Fashion",
      lessons: 6,
      duration: "1 Week",
    },

    {
      id: "module-bridal-design",
      title: "Bridal Design & Sketch Development",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-corsetry",
      title: "Corsetry & Structured Bodices",
      lessons: 14,
      duration: "3 Weeks",
    },

    {
      id: "module-bridal-patterns",
      title: "Advanced Bridal Pattern Drafting",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-luxury-fabrics",
      title: "Luxury Fabrics & Lace Techniques",
      lessons: 10,
      duration: "2 Weeks",
    },

    {
      id: "module-embellishment",
      title: "Beading, Embellishment & Finishing",
      lessons: 12,
      duration: "2 Weeks",
    },

    {
      id: "module-fittings",
      title: "Bridal Fittings & Alterations",
      lessons: 8,
      duration: "2 Weeks",
    },

    {
      id: "module-client-management",
      title: "Bridal Client Workflow",
      lessons: 8,
      duration: "1 Week",
    },

    {
      id: "module-final-project",
      title: "Complete Bridal Gown Project",
      lessons: 16,
      duration: "1 Week",
    },
  ],

  outcomes: [
    "Design professional bridal gowns from concept to completion.",
    "Create structured corsets and bodices.",
    "Draft advanced bridal garment patterns.",
    "Work confidently with lace, satin, tulle, and luxury fabrics.",
    "Apply couture finishing techniques.",
    "Execute professional bridal fittings and adjustments.",
    "Manage bridal consultations and client expectations.",
    "Price and deliver bridal projects professionally.",
    "Build a bridal fashion portfolio.",
    "Launch or expand a bridal fashion business.",
  ],

community: {
  platform: "telegram",
  groupName: "Bridal Masterclass Students",
  inviteLink: "https://t.me/replace_with_bridal_group",
},

  featured: true,

  publishedAt: "2026-06-08T00:00:00.000Z",
};

export default bridalMasterclassCourse;