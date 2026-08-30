# ZENIVIXON

**AI-First Technology Company** — We engineer purpose-built autonomous AI agents, intelligent workflow automations, custom Next.js web applications, and enterprise AI system integrations.

🌐 **Website:** [zenivixon.com](https://zenivixon.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.3 (App Router, Turbopack) |
| **Runtime / Language** | React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion v13, GSAP, Lottie |
| **Theming** | next-themes (Light & Dark mode support) |
| **Workflow Automation** | n8n Webhook Integration |
| **Email Service** | Resend SDK |
| **Rate Limiting** | Upstash Redis |
| **Icons & Typography** | Lucide React, Manrope + Inter |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/jakariyask1-prog/zenivixon.git
cd zenivixon

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# n8n Webhook Integration (Lead Intake)
N8N_WEBHOOK_URL=https://zenivixon.app.n8n.cloud/webhook/zenivixon-lead

# Resend Email Delivery (Optional)
RESEND_API_KEY=your_resend_api_key_here

# Upstash Redis for Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Key Environment Configuration:
- **`N8N_WEBHOOK_URL`**: Target n8n webhook URL where contact form and quote inquiries are dispatched via secure server-side POST requests.
- **`RESEND_API_KEY`**: Optional API key from [resend.com](https://resend.com) for sending notification emails.
- **`UPSTASH_REDIS_REST_URL` / `TOKEN`**: Optional Upstash credentials used for API rate limiting to protect endpoints against spam.

---

## Webhook & Lead Automation (`/api/contact`)

When users submit the **Contact / Get a Quote** form, the payload is validated on the server and sent to the configured n8n webhook:

### JSON Payload Schema:
```json
{
  "name": "Alex Morgan",
  "email": "alex@company.com",
  "company": "Acme Technologies Ltd",
  "service": "AI Agents & 24/7 Support",
  "message": "We need an autonomous AI customer support copilot."
}
```

- **Security:** The webhook URL is stored on the backend and is never exposed to client-side code.
- **Resilience:** Includes IP-based rate limiting, input sanitization, and graceful error handling.

---

## Project Structure

```
zenivixon/
├── public/                 # Static assets (images, logos, videos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── contact/    # Contact form -> n8n webhook & Resend
│   │   │   ├── newsletter/ # Newsletter subscription
│   │   │   └── project-brief/ # Interactive project wizard handler
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact & Inquiry page
│   │   ├── insights/       # Technical articles & blog
│   │   ├── projects/       # Case studies & project showcase
│   │   ├── solutions/      # Detailed solution pillars
│   │   ├── start-a-project/# Multi-step project brief wizard
│   │   ├── layout.tsx      # Root layout (Navbar, Footer, Providers)
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── forms/          # ContactForm, StartProjectWizard
│   │   ├── layout/         # Navbar, Footer, PageHeader
│   │   ├── sections/       # Hero, Capabilities, ROI Calculator, etc.
│   │   ├── ui/             # Reusable UI components & animations
│   │   └── providers/      # Theme and page transition providers
│   ├── data/               # Static data for solutions, projects, insights
│   ├── lib/                # Constants and utility functions
│   └── types/              # TypeScript type definitions
├── .env.example            # Example environment configuration
├── .env.local              # Local environment variables (git-ignored)
└── package.json
```

---

## Available Pages & Routes

| Route | Description |
|---|---|
| `/` | **Homepage** — Hero, problem-first intake, solutions overview, showcase & ROI calculator |
| `/about` | **About ZENIVIXON** — Mission, technical philosophy, and engineering team |
| `/solutions` | **Solutions Overview** — Comprehensive breakdown of service offerings |
| `/solutions/ai-agents` | **AI Agents** — 24/7 Customer Support & Autonomous Decision Copilots |
| `/solutions/ai-automation` | **AI Automation** — Intelligent Document & Cross-System Workflow Pipelines |
| `/solutions/software-web-development` | **Software & Web Dev** — High-Performance Next.js Web Platforms & SaaS |
| `/solutions/ai-integration` | **AI Integration & RAG** — Vector Retrieval, Semantic Search & Legacy Middleware |
| `/projects` | **Project Catalog** — Real-world case studies and implementations |
| `/insights` | **Engineering Insights** — Technical deep-dives and automation guides |
| `/contact` | **Contact Page** — Direct communication channels & n8n integrated inquiry form |
| `/start-a-project` | **Start a Project** — 3-step interactive project brief intake wizard |

---

## Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build optimized production bundle
npm run start    # Start production server
npm run lint     # Run ESLint validation
```

---

## Deployment

ZENIVIXON is optimized for zero-configuration deployment on **Vercel**:

1. Push to the `main` branch on GitHub.
2. In the **Vercel Project Dashboard** > **Settings** > **Environment Variables**, configure:
   - `N8N_WEBHOOK_URL` = `https://zenivixon.app.n8n.cloud/webhook/zenivixon-lead`
   - `RESEND_API_KEY` = `your_resend_api_key` (optional)
   - `UPSTASH_REDIS_REST_URL` = `your_upstash_url` (optional)
   - `UPSTASH_REDIS_REST_TOKEN` = `your_upstash_token` (optional)

