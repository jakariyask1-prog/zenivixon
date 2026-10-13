import { AboutVideo, VideoCategory } from "@/types/aboutVideo";

export const VIDEO_CATEGORIES: ("All" | VideoCategory)[] = [
  "All",
  "Founder & CEO",
  "Co-Founder",
  "Team Leader",
];

// Only Founder, Co-Founder, and Team Leader (Sazib) are featured in the video showcase section.
export const ABOUT_VIDEOS: AboutVideo[] = [
  {
    id: "founder-why-zenivixon",
    category: "Founder & CEO",
    name: "Md. Jakariya Sheikh",
    role: "Founder & CEO",
    title: "Founder Speech: Why I Built ZENIVIXON",
    description:
      "A personal address from Founder & CEO Jakariya on bridging abstract AI research and reliable, deterministic software that businesses can actually depend on.",
    thumbnail: "/images/team/founder-ceo.jpg",
    videoUrl: "/videos/zenivixon-founder-speech.mp4",
    duration: "02:45",
    featured: true,
    tags: ["Founder Speech", "Company Vision", "Problem-First AI"],
  },
  {
    id: "cofounder-ai-architecture",
    category: "Co-Founder",
    name: "Md Rahadul Islam",
    role: "Co-Founder & CTO / Head of AI",
    title: "Architecting Multi-Agent Systems with Guardrails",
    description:
      "Discussing how we design resilient LLM orchestration pipelines, vector indexing, and deterministic tool execution for enterprise workloads.",
    thumbnail: "/images/team/md-rahadul-islam.png",
    videoUrl: "", // Blank - paste video URL when ready
    duration: "02:48",
    tags: ["AI Architecture", "System Design", "LLM Guardrails"],
  },
  {
    id: "team-web-automation",
    category: "Team Leader",
    name: "Md Sazib Hossain",
    role: "Team Leader & Lead Web Developer",
    title: "Connecting Modern Web Apps to Autonomous Workflows",
    description:
      "Walking through sub-second Next.js interfaces that talk directly to webhook-driven AI background processors without latency.",
    thumbnail: "/images/team/md-sazib-hossain.jpeg",
    videoUrl: "", // Blank - paste video URL when ready
    duration: "02:15",
    tags: ["Next.js", "Webhooks", "Team Leadership"],
  },
];
