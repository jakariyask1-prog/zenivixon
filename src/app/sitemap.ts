import { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/projects";
import { INSIGHTS_DATA } from "@/data/insights";
import { SITE_METADATA } from "@/lib/constants";

// Last meaningful site-wide update — update this date on each deployment
const SITE_LAST_UPDATED = new Date("2025-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.url;

  const staticRoutes = [
    { path: "", priority: 1.0, updated: SITE_LAST_UPDATED },
    { path: "/solutions", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/solutions/ai-agents", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/solutions/ai-automation", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/solutions/ai-integration", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/solutions/software-web-development", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/projects", priority: 0.85, updated: SITE_LAST_UPDATED },
    { path: "/about", priority: 0.8, updated: SITE_LAST_UPDATED },
    { path: "/insights", priority: 0.8, updated: SITE_LAST_UPDATED },
    { path: "/contact", priority: 0.8, updated: SITE_LAST_UPDATED },
    { path: "/start-a-project", priority: 0.9, updated: SITE_LAST_UPDATED },
    { path: "/privacy", priority: 0.5, updated: SITE_LAST_UPDATED },
    { path: "/terms", priority: 0.5, updated: SITE_LAST_UPDATED },
    { path: "/cookies", priority: 0.5, updated: SITE_LAST_UPDATED },
  ].map(({ path, priority, updated }) => ({
    url: `${baseUrl}${path}`,
    lastModified: updated,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const projectRoutes = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    // Use project-specific date if available, otherwise fall back to site update date
    lastModified: (project as { updatedAt?: Date }).updatedAt ?? SITE_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const insightRoutes = INSIGHTS_DATA.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    // Use article-specific date if available, otherwise fall back to site update date
    lastModified: (article as { updatedAt?: Date }).updatedAt ?? SITE_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...insightRoutes];
}
