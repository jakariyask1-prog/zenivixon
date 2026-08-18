export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: {
    label: string;
    href: string;
    description: string;
  }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "AI Agents & Support",
        href: "/solutions/ai-agents",
        description: "24/7 AI customer support agents and autonomous decision systems.",
      },
      {
        label: "AI Automation",
        href: "/solutions/ai-automation",
        description: "Intelligent pipelines reducing repetitive manual work and operational overhead.",
      },
      {
        label: "Software & Web Dev",
        href: "/solutions/software-web-development",
        description: "Modern web platforms, custom SaaS applications, and AI software architectures.",
      },
      {
        label: "AI Integration & RAG",
        href: "/solutions/ai-integration",
        description: "Custom vector RAG, internal databases, and secure enterprise API connectors.",
      },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const FOOTER_LINKS = {
  solutions: [
    { label: "AI Agents & Support", href: "/solutions/ai-agents" },
    { label: "AI Automation", href: "/solutions/ai-automation" },
    { label: "Software & Web Dev", href: "/solutions/software-web-development" },
    { label: "AI Integration & RAG", href: "/solutions/ai-integration" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Start Your AI Project", href: "/start-a-project" },
  ],
  connect: [
    { label: "WhatsApp Business", href: "https://wa.me/message/ZENIVIXON", external: true },
    { label: "Business Email", href: "mailto:contact@zenivixon.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/company/zenivixon", external: true },
    { label: "Facebook", href: "https://www.facebook.com/share/1Re24w32HP/", external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
