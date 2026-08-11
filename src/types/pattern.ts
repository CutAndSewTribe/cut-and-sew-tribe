export type PatternAccess =
| "free"
| "premium";

export type PatternLevel =
| "beginner"
| "intermediate"
| "advanced";

export type PatternCategory =
| "dressmaking"
| "bridal"
| "menswear"
| "childrenswear"

export interface Pattern {
id: string;

title: string;
slug: string;

excerpt: string | null;
content: string | null;

category: PatternCategory;
level: PatternLevel;

hero_image: string | null;
thumbnail: string | null;

access: PatternAccess;

file_format: string;
download_url: string | null;

video_url: string | null;

featured: boolean;
published: boolean;

position: number | null;

related_course_slug: string | null;

seo_title: string | null;
seo_description: string | null;

created_at: string;
updated_at: string;
}
