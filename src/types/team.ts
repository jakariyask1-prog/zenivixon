export type Department =
  | "Leadership"
  | "AI & Engineering"
  | "Product & Design"
  | "Operations";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  titleBadge?: string;
  department: Department;
  expertise: string[];
  qualities?: string[];
  bio: string;
  linkedin?: string;
  facebook?: string;
  github?: string;
  email?: string;
  image: string;
  featured?: boolean;
}
