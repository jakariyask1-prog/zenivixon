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
| **Form Validation** | Zod + React Hook Form |
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
# Google Gemini AI Integration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Resend Email Delivery (Notification & Auto-Reply)
RESEND_API_KEY=your_resend_api_key_here

# Upstash Redis for Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# ZENIVIXON AI Consultant API
NEXT_PUBLIC_AI_CONSULTANT_URL=https://zenivixon-ai-consultant.onrender.com
AI_CONSULTANT_URL=https://zenivixon-ai-consultant.onrender.com
```

### Key Environment Configuration:
- **`GEMINI_API_KEY`**: Powers intelligent lead analysis, inquiry categorization, and personalized client auto-replies.
- **`GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_PRIVATE_KEY` / `GOOGLE_SHEET_ID`**: Direct spreadsheet integration logging all leads and inquiries.
- **`RESEND_API_KEY`**: Dispatches client acknowledgment emails and instant admin notification emails.
- **`UPSTASH_REDIS_REST_URL` / `TOKEN`**: Rate limits public endpoints to prevent spam.
- **`NEXT_PUBLIC_AI_CONSULTANT_URL`**: Connects the interactive streaming AI Consultant chat widget.

---

## Intelligent Lead Pipeline (`/api/contact` & `/api/project-brief`)

When users submit the **Contact / Project Brief** form:
1. **Validation & Rate Limiting:** Enforces strict Zod validation schemas and Redis IP rate-limiting.
2. **Gemini AI Enrichment:** Automatically categorizes intent, evaluates priority, and drafts personalized B2B client responses.
3. **Resilient Data Persistence:** Automatically logs lead details into Google Sheets with dynamic column mapping.
4. **Instant Notification:** Sends transactional emails to both client and ZENIVIXON admin via Resend SDK.
5. **AI Consultant Forwarding:** Dispatches real-time lead events to the AI Consultant engine.

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
   - `GEMINI_API_KEY` = `your_gemini_api_key`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `your_service_account_email`
   - `GOOGLE_PRIVATE_KEY` = `your_google_service_account_private_key`
   - `GOOGLE_SHEET_ID` = `your_google_sheet_id`
   - `RESEND_API_KEY` = `your_resend_api_key`
   - `UPSTASH_REDIS_REST_URL` = `your_upstash_url` (optional)
   - `UPSTASH_REDIS_REST_TOKEN` = `your_upstash_token` (optional)
   - `NEXT_PUBLIC_AI_CONSULTANT_URL` = `https://zenivixon-ai-consultant.onrender.com`

