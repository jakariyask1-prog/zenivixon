import { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/projects";
import { SITE_METADATA } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.url;

  const staticRoutes = [
    "",
    "/solutions",
    "/solutions/ai-agents",
    "/solutions/ai-automation",
    "/solutions/ai-integration",
    "/solutions/software-web-development",
    "/projects",
    "/about",
    "/insights",
    "/contact",
    "/start-a-project",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/solutions") || route === "/start-a-project" ? 0.9 : 0.8,
  }));

  const projectRoutes = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...projectRoutes];
}
