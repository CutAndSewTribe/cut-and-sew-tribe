export interface Module {
  id: string;

  course_id: string;

  title: string;

  description: string | null;

  position: number;

  published: boolean;

  created_at: string;

  updated_at: string;
}