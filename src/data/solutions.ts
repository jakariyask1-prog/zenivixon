import { SolutionPillar } from "@/types/solution";

export const SOLUTIONS_DATA: SolutionPillar[] = [
  {
    slug: "ai-agents",
    title: "AI Agents & 24/7 Customer Support",
    shortTitle: "AI Agents & Support",
    tagline: "Autonomous systems & 24/7 customer support agents executing real business tasks",
    positioning:
      "24/7 AI Customer Support & Autonomous Decision Agents.",
    description:
      "We engineer purpose-built autonomous AI agents and customer support copilots that interact with internal software, resolve customer inquiries in real time, process complex information, and assist human operators using Grounded & Validated AI, without fragility.",
    problemStatement:
      "High-value teams spend disproportionate hours on multi-step customer inquiry triage, repetitive ticket resolution, data synthesis, and manual follow-ups that traditional rule-based chatbots cannot handle.",
    solutionApproach:
      "We design goal-oriented AI agents equipped with deterministic tool execution, sandboxed API access, validation checkpoints, and human-in-the-loop oversight for mission-critical reliability.",
    features: [
      {
        title: "24/7 AI Customer Support & Triage",
        description:
          "Context-aware agents resolving complex customer inquiries, verifying account status in CRMs, and routing edge cases with full conversation history.",
        outcome: "Sub-minute response times, 24/7 coverage, and consistent resolution quality.",
      },
      {
        title: "Internal Knowledge & Operations Assistants",
        description:
          "Secure agents querying internal databases, SOPs, and technical documentation to assist engineers and operations staff.",
        outcome: "Instant access to verified institutional knowledge.",
      },
      {
        title: "Lead Qualification & Sales Ingestion",
        description:
          "Intelligent conversational agents qualifying inbound opportunities, scoring intent, and scheduling consultations directly on calendar.",
        outcome: "Higher conversion velocity with zero missed inbound leads.",
      },
      {
        title: "Document Processing & Research Agents",
        description:
          "Agents analyzing incoming reports, invoices, and contracts, extracting structured data, and synthesizing executive summaries.",
        outcome: "Elimination of manual document extraction bottlenecks.",
      },
    ],
    useCases: [
      {
        title: "Multi-Channel Customer Support",
        description: "Automate tier-1 and tier-2 customer support across email, webchat, WhatsApp, and ticketing platforms.",
        targetRole: "Customer Operations & Support Leaders",
      },
      {
        title: "Internal Knowledge Discovery",
        description: "Empower distributed teams to query company wikis, code repos, and policy libraries naturally.",
        targetRole: "CTOs & Engineering Managers",
      },
      {
        title: "Autonomous Inbound Triage",
        description: "Qualify, categorize, and enrich incoming enterprise sales inquiries 24/7.",
        targetRole: "Sales & Marketing Directors",
      },
    ],
    process: [
      {
        step: "01",
        title: "Task & Decision Mapping",
        description: "Isolate the exact steps, tool permissions, and edge cases required for the target workflow.",
      },
      {
        step: "02",
        title: "Agent Architecture & Guardrails",
        description: "Configure deterministic logic, output schema validations, and fallback safety boundaries.",
      },
      {
        step: "03",
        title: "Tool & API Integration",
        description: "Connect the agent directly to your CRM, databases, messaging channels, and internal APIs.",
      },
      {
        step: "04",
        title: "Controlled Pilot & Deployment",
        description: "Deploy in shadow mode with real data, verify accuracy thresholds, and scale to full production.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Workflow & Business Automation",
    shortTitle: "AI Automation",
    tagline: "Transform manual operational bottlenecks into intelligent automated workflows",
    positioning:
      "Manual process → Intelligent workflow → Automation → Maximum efficiency.",
    description:
      "We replace fragile manual steps and rigid legacy automations with adaptive, AI-driven pipelines that parse unstructured data, trigger downstream business events, and keep operations running reliably around the clock.",
    problemStatement:
      "Businesses suffer from fractured processes where human staff act as 'glue' between disparate tools—retyping data, reviewing PDFs, verifying invoices, and generating repetitive reports.",
    solutionApproach:
      "We connect your software ecosystem with intelligent workflow orchestration that handles unstructured inputs (emails, scans, spreadsheets) and converts them into validated, actionable data automatically.",
    features: [
      {
        title: "Intelligent Document & Invoice Pipelines",
        description:
          "Extract, validate, and reconcile data from receipts, invoices, bills of lading, and legal forms directly into your ERP/accounting tools.",
        outcome: "Eliminate manual data entry errors and accelerate processing cycles.",
      },
      {
        title: "CRM & Inbound Lead Automation",
        description:
          "Automatically enrich incoming leads, score buyer fit using AI, generate custom briefs, and trigger targeted follow-up workflows.",
        outcome: "Instant lead engagement with tailored business context.",
      },
      {
        title: "Automated Reporting & Data Synthesis",
        description:
          "Aggregate metrics across multiple software platforms and generate daily/weekly executive narrative summaries automatically.",
        outcome: "Clear visibility into operational performance without manual reporting prep.",
      },
      {
        title: "Cross-Platform Workflow Orchestration",
        description:
          "Bridge legacy systems and modern cloud applications using custom webhooks, event listeners, and AI validation layers.",
        outcome: "Unified operations across previously disconnected platforms.",
      },
    ],
    useCases: [
      {
        title: "Accounts Payable & Invoice Auditing",
        description: "Ingest vendor invoices, match purchase orders, and flag discrepancies for human review.",
        targetRole: "Finance & Operations Executives",
      },
      {
        title: "E-commerce & Inventory Synchronization",
        description: "Reconcile supplier feeds, update stock levels, and automate catalog enrichment with AI.",
        targetRole: "E-Commerce Operations Managers",
      },
      {
        title: "Compliance & Contract Ingestion",
        description: "Parse newly signed agreements, extract key obligations, and populate compliance calendars.",
        targetRole: "Legal & Administrative Teams",
      },
    ],
    process: [
      {
        step: "01",
        title: "Process Audit & ROI Analysis",
        description: "Identify high-volume manual bottlenecks and quantify potential efficiency gains.",
      },
      {
        step: "02",
        title: "Pipeline Design & Parsing Logic",
        description: "Build robust extraction schemas and validation tests for unstructured data inputs.",
      },
      {
        step: "03",
        title: "System Synchronization",
        description: "Connect target endpoints (CRMs, ERPs, databases) with automated retry and error-logging logic.",
      },
      {
        step: "04",
        title: "Monitoring & Continuous Tuning",
        description: "Implement observability dashboards to track throughput, error rates, and automated execution health.",
      },
    ],
  },
  {
    slug: "software-web-development",
    title: "Custom Software & Modern Web Development",
    shortTitle: "Software & Web Dev",
    tagline: "High-performance modern web platforms, custom SaaS applications, and AI-native software",
    positioning:
      "Enterprise Web Architecture + Custom AI Software Development.",
    description:
      "We design and build bespoke software applications, responsive Next.js/React web platforms, customer portals, and AI-powered SaaS interfaces engineered for maximum speed, security, and effortless scalability.",
    problemStatement:
      "Businesses require modern, scalable web applications with native AI capabilities, but struggle with sluggish legacy codebases, poor UX conversions, and fragmented agency teams that lack deep AI engineering experience.",
    solutionApproach:
      "We engineer production-grade web and software architectures using clean TypeScript, modern component design systems, secure cloud backends, and deeply embedded AI capabilities.",
    features: [
      {
        title: "Modern Next.js & React Web Platforms",
        description:
          "High-speed, SEO-optimized web applications with modern design aesthetics, intuitive user interfaces, and mobile-first responsiveness.",
        outcome: "Sub-second page loads, higher user engagement, and elevated brand trust.",
      },
      {
        title: "Custom SaaS & Client Portals",
        description:
          "Full-stack software platforms with role-based access control, billing integration, analytics dashboards, and multi-tenant security.",
        outcome: "Scalable digital infrastructure built for recurring business operations.",
      },
      {
        title: "Embedded AI Features & Copilots",
        description:
          "Native AI copilot sidebars, natural language search, intelligent content drafting, and automated suggestions embedded directly in your app.",
        outcome: "Dramatically improved software utility and competitive product differentiation.",
      },
      {
        title: "High-Throughput Backend & Cloud Architecture",
        description:
          "Scalable backend APIs using FastAPI/Node.js, PostgreSQL/Redis databases, Docker containerization, and enterprise security standards.",
        outcome: "Rock-solid uptime, deterministic execution, and predictable performance under load.",
      },
    ],
    useCases: [
      {
        title: "AI-Powered SaaS Product Launches",
        description: "Transform your product vision into a production-ready SaaS application with integrated AI features.",
        targetRole: "Founders & Digital Product Leaders",
      },
      {
        title: "Internal Operations & Admin Dashboards",
        description: "Build custom internal software that unifies your team's operational workflows.",
        targetRole: "Operations Directors & COOs",
      },
      {
        title: "Customer & Client Collaboration Portals",
        description: "Launch modern customer self-service portals with integrated AI support and real-time status.",
        targetRole: "Customer Experience Leaders & CTOs",
      },
    ],
    process: [
      {
        step: "01",
        title: "Product Architecture & UX Design",
        description: "Define technical stack, wireframes, user personas, database schemas, and AI interaction flows.",
      },
      {
        step: "02",
        title: "Full-Stack Agile Development",
        description: "Engineer modular frontend components and secure backend microservices with rigorous code reviews.",
      },
      {
        step: "03",
        title: "Security & Performance Testing",
        description: "Audit page speed, cross-device responsiveness, end-to-end security permissions, and API load handling.",
      },
      {
        step: "04",
        title: "Production Deployment & Support",
        description: "Deploy to cloud infrastructure with CI/CD automation, monitoring telemetry, and ongoing maintenance.",
      },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI System Integration & Vector RAG",
    shortTitle: "AI Integration & RAG",
    tagline: "Embed AI intelligence directly into the software and databases your business already uses",
    positioning:
      "Integrate AI into the systems your business already uses.",
    description:
      "You do not need to discard existing software infrastructure to benefit from AI. We embed custom AI models, semantic search, vector pipelines, and intelligent capabilities directly into your current web apps, databases, and enterprise platforms.",
    problemStatement:
      "Companies hesitate to adopt AI when faced with the prospect of expensive platform migrations or disruptive 'rip-and-replace' software projects.",
    solutionApproach:
      "We build clean, secure API adapters and microservices that inject AI intelligence directly into your existing databases, legacy backends, client portals, and SaaS tools without disrupting ongoing business operations.",
    features: [
      {
        title: "Custom Vector Databases & Retrieval (RAG)",
        description:
          "Transform your proprietary product catalogs, manuals, and customer records into searchable semantic knowledge bases with pinpoint accuracy.",
        outcome: "Answers grounded strictly in your verified business data.",
      },
      {
        title: "Legacy Database Natural Language Querying",
        description:
          "Enable business leaders to ask natural language questions and receive accurate SQL analytics and synthesized charts automatically.",
        outcome: "Instant business intelligence without manual data engineering tickets.",
      },
      {
        title: "Secure Enterprise API Connectors",
        description:
          "Design dedicated middleware layers that sanitize data, manage LLM rate limits, enforce privacy compliance, and protect proprietary data.",
        outcome: "Enterprise-grade security and predictable operational costs.",
      },
      {
        title: "Custom AI Microservices & Middleware",
        description:
          "Develop dedicated backend modules in Python/TypeScript to handle classification, ranking, translation, and scoring workloads.",
        outcome: "High-performance AI capabilities tailored to your exact domain requirements.",
      },
    ],
    useCases: [
      {
        title: "Enterprise Semantic Search Portals",
        description: "Replace keyword search with semantic AI search across massive internal content libraries.",
        targetRole: "Product Managers & Engineering Directors",
      },
      {
        title: "Existing App AI Modernization",
        description: "Equip your legacy software with generative draft assistants and AI analytics widgets.",
        targetRole: "Startup Founders & SaaS Product Leads",
      },
      {
        title: "Legacy System Unification",
        description: "Bridge isolated legacy ERP and CRM databases with modern AI translation layers.",
        targetRole: "Chief Information Officers (CIOs)",
      },
    ],
    process: [
      {
        step: "01",
        title: "Architecture & Security Review",
        description: "Assess existing system topology, data governance constraints, and latency requirements.",
      },
      {
        step: "02",
        title: "Adapter & RAG Implementation",
        description: "Build custom embedding pipelines, vector indexing, and isolated API microservices.",
      },
      {
        step: "03",
        title: "Integration & Regression Testing",
        description: "Embed endpoints into existing apps, test backward compatibility, and benchmark latency.",
      },
      {
        step: "04",
        title: "Production Release & Maintenance",
        description: "Deploy to production with real-time logging, failover fallbacks, and cost optimization monitors.",
      },
    ],
  },
];
