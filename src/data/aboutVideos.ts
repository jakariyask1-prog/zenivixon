import { AboutVideo, VideoCategory } from "@/types/aboutVideo";

export const VIDEO_CATEGORIES: ("All" | VideoCategory)[] = [
  "All",
  "Founder & CEO",
  "Co-Founder",
  "Team",
  "Client Conversations",
  "Behind the Work",
];

// All video URLs are completely blank ("").
// When you are ready to add a real video, simply paste its URL into the videoUrl field.
// Only real team members and authentic conversations are featured — no project showcase videos.
export const ABOUT_VIDEOS: AboutVideo[] = [
  {
    id: "founder-why-zenivixon",
    category: "Founder & CEO",
    name: "Jakariya",
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
    name: "Rahadul",
    role: "CTO / Head of AI",
    title: "Architecting Multi-Agent Systems with Guardrails",
    description:
      "Discussing how we design resilient LLM orchestration pipelines, vector indexing, and deterministic tool execution for enterprise workloads.",
    thumbnail: "/images/team/md-rahadul-islam.png",
    videoUrl: "", // Blank - paste your video URL here
    duration: "02:48",
    tags: ["AI Architecture", "System Design", "LLM Guardrails"],
  },
  {
    id: "team-web-automation",
    category: "Team",
    name: "Sazib",
    role: "Lead Web Developer & AI Automation Specialist",
    title: "Connecting Modern Web Apps to Autonomous Workflows",
    description:
      "Walking through sub-second Next.js interfaces that talk directly to webhook-driven AI background processors without latency.",
    thumbnail: "/images/team/md-sazib-hossain.jpeg",
    videoUrl: "", // Blank - paste your video URL here
    duration: "02:15",
    tags: ["Next.js", "Webhooks", "Real Work"],
  },
  {
    id: "behind-work-kausar",
    category: "Behind the Work",
    name: "Kausar",
    role: "AI Solutions & Automation Engineer",
    title: "Hands-on Development: Orchestrating Complex Workflows",
    description:
      "Working through live pipeline logic, debugging API handoffs, and testing webhook triggers in the development environment.",
    thumbnail: "/images/team/md-kausar-ahmed.png",
    videoUrl: "", // Blank - paste your video URL here
    duration: "03:45",
    tags: ["Coding", "Automation", "Behind the Scenes"],
  },
  {
    id: "client-conversation-strategy",
    category: "Client Conversations",
    name: "Sabbir & Engineering Team",
    role: "Client Discovery & Strategy",
    title: "Client Discussion: Scoping Operations & Technical Bottlenecks",
    description:
      "An unscripted excerpt from a real client alignment call discussing business workflow bottlenecks and practical AI scoping.",
    thumbnail: "/images/team/sabbir-ahmed.png",
    videoUrl: "", // Blank - paste your video URL here
    duration: "03:22",
    tags: ["Client Meeting", "Workflow Scoping", "Real Conversation"],
  },
  {
    id: "behind-design-collaboration",
    category: "Behind the Work",
    name: "Moushumi & Dipu",
    role: "Product & Motion Design",
    title: "Design Collaboration: Turning Complex AI into Intuitive UI",
    description:
      "A look inside our UI/UX and 3D motion design workflow as we translate intricate AI logic into clear, human-centered interfaces.",
    thumbnail: "/images/team/moushumi-khatun.png",
    videoUrl: "", // Blank - paste your video URL here
    duration: "01:58",
    tags: ["UI/UX Design", "Collaboration", "Product Building"],
  },
  {
    id: "team-cloud-security",
    category: "Team",
    name: "Antora",
    role: "AI Systems & Cybersecurity Engineer",
    title: "Hardening Enterprise AI Deployments & Zero-Trust IAM",
    description:
      "Overview of our security protocols, automated threat auditing, and data encryption standards across live AI agent endpoints.",
    thumbnail: "/images/team/antora-tabbassum-nupur.jpeg",
    videoUrl: "", // Blank - paste your video URL here
    duration: "02:35",
    tags: ["Cybersecurity", "Zero-Trust", "Infrastructure"],
  },
  {
    id: "founder-building-zenivixon",
    category: "Founder & CEO",
    name: "Jakariya",
    role: "Founder & CEO",
    title: "Building ZENIVIXON: What it Takes to Ship Production AI",
    description:
      "Behind-the-scenes thoughts on direct client engagement, avoiding vanity metrics, and maintaining extreme engineering rigor.",
    thumbnail: "/images/team/founder-ceo.jpg",
    videoUrl: "", // Blank - paste your video URL here
    duration: "03:40",
    tags: ["Behind the Scenes", "Leadership", "Execution"],
  },
];
