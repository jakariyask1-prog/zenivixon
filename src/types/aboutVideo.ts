export type VideoCategory =
  | "Founder & CEO"
  | "Co-Founder"
  | "Team Leader";

export interface AboutVideo {
  id: string;
  category: VideoCategory;
  title: string;
  name?: string;
  role?: string;
  description?: string;
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
  featured?: boolean;
  tags?: string[];
  aspectRatio?: "video" | "square" | "portrait";
}
