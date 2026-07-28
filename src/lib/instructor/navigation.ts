import {
  Award,
  BarChart3,
  BookOpen,
  DollarSign,
  FileText,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface InstructorNavigationChild {
  title: string;
  href: string;
}

export interface InstructorNavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  children?: InstructorNavigationChild[];
}

export const instructorNavigation: InstructorNavigationItem[] = [
  {
    title: "Dashboard",
    href: "/instructor/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Courses",
    href: "/instructor/courses",
    icon: BookOpen,

    children: [
      {
        title: "All Courses",
        href: "/instructor/courses",
      },
      {
        title: "Create Course",
        href: "/instructor/courses/new",
      },
    ],
  },

  {
    title: "Lessons",
    href: "/instructor/lessons",
    icon: Video,
  },

  {
    title: "Students",
    href: "/instructor/students",
    icon: Users,
  },

  {
    title: "Sales",
    href: "/instructor/sales",
    icon: DollarSign,
  },

  {
    title: "Analytics",
    href: "/instructor/analytics",
    icon: BarChart3,
  },

  {
    title: "Telegram Communities",
    href: "/instructor/telegram",
    icon: MessageCircle,
  },

  {
    title: "Media Library",
    href: "/instructor/media",
    icon: ImageIcon,
  },

  {
    title: "Certificates",
    href: "/instructor/certificates",
    icon: Award,
  },

  {
    title: "Blog",
    href: "/instructor/blog",
    icon: FileText,
  },

  {
    title: "Resources",
    href: "/instructor/resources",
    icon: FolderOpen,
  },

  {
    title: "Settings",
    href: "/instructor/settings",
    icon: Settings,
  },
];