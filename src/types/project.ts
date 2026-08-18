export type SolutionCategory =
  | "ai-agents"
  | "ai-automation"
  | "software-web-development"
  | "ai-integration";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: SolutionCategory;
  categoryLabel: string;
  summary: string;
  problem: string;
  solution: string;
  valueDelivered: string[];
  technologies: string[];
  featured: boolean;
  image: string;
  videoUrl?: string;
  deliverables: string[];
  status?: string;
}
