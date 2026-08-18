"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight } from "lucide-react";
import { SolutionCategory } from "@/types/project";

const categories: { label: string; value: "all" | SolutionCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "AI Agents & Support", value: "ai-agents" },
  { label: "AI Automation", value: "ai-automation" },
  { label: "Software & Web Dev", value: "software-web-development" },
  { label: "AI Integration & RAG", value: "ai-integration" },
];

export function ProjectsCatalog() {
  const [activeCategory, setActiveCategory] = useState<"all" | SolutionCategory>("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-6" role="tablist" aria-label="Project Categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-20 space-y-3">
            <p className="text-slate-400 text-sm font-medium">No projects in this category yet.</p>
            <a
              href="/contact"
              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Get in touch to discuss a project →
            </a>
          </div>
        )}
        {filteredProjects.map((project) => (
          <div
            key={project.slug}
            className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Visual Preview */}
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="blue" size="sm">
                  {project.categoryLabel}
                </Badge>
                {project.status && (
                  <span className="text-xs font-heading text-slate-500 font-semibold">
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] font-heading group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-heading px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-between w-full text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
