# ZENIVIXON

**AI-First Technology Company** — We build AI agents, intelligent workflow automations, modern web applications, and enterprise AI integrations.

🌐 **Website:** [zenivixon.com](https://zenivixon.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v13 |
| Theming | next-themes (light/dark) |
| Email | Resend SDK |
| Icons | Lucide React |
| Fonts | Manrope + Inter (Google Fonts) |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Get a free Resend API key at [resend.com](https://resend.com).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes (contact, project-brief, newsletter)
│   ├── about/
│   ├── contact/
│   ├── insights/
│   ├── projects/
│   ├── solutions/
│   ├── start-a-project/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   └── page.tsx            # Home page
├── components/
│   ├── layout/             # Navbar, Footer, PageHeader
│   ├── sections/           # Page section components
│   ├── ui/                 # Button, Badge, Card, ScrollReveal, etc.
│   └── providers/          # ThemeProvider
├── data/                   # Navigation, projects, solutions, team data
├── lib/                    # Constants, utils
└── types/                  # TypeScript interfaces
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Capabilities, Projects, CTA |
| `/about` | About ZENIVIXON |
| `/solutions` | All solutions overview |
| `/solutions/ai-agents` | AI Agents & Support |
| `/solutions/ai-automation` | AI Workflow Automation |
| `/solutions/software-web-development` | Software & Web Dev |
| `/solutions/ai-integration` | AI Integration & RAG |
| `/projects` | Project showcase |
| `/insights` | Insights / blog |
| `/contact` | Contact form |
| `/start-a-project` | Project brief form |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

Deployed on **Vercel**. Push to `main` to trigger auto-deploy.

Make sure to set the `RESEND_API_KEY` environment variable in the Vercel dashboard.

