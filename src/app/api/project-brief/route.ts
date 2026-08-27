import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Simple in-memory rate limiter (5 requests / 60s per IP) ─────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ─── Sanitize user input to prevent XSS in email HTML ────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { projectType, problemDescription, currentTools, timeline, name, email, company, preferredChannel } = body;

    if (!name || !email || !problemDescription) {
      return NextResponse.json(
        { success: false, error: "Name, email, and problem description are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Send email using Resend
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.warn("[ZENIVIXON] RESEND_API_KEY is not set or is a placeholder. Email will not be sent.");
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "ZENIVIXON <noreply@zenivixon.com>",
        to: "zenivixon@gmail.com",
        subject: `New Project Brief from ${esc(name)} — ${esc(projectType || "N/A")}`,
        html: `
          <p><b>Name:</b> ${esc(name)}</p>
          <p><b>Email:</b> ${esc(email)}</p>
          <p><b>Company:</b> ${esc(company || "N/A")}</p>
          <p><b>Project Type:</b> ${esc(projectType || "N/A")}</p>
          <p><b>Problem:</b><br/>${esc(problemDescription).replace(/\n/g, "<br/>")}</p>
          <p><b>Current Tools:</b> ${esc(currentTools || "N/A")}</p>
          <p><b>Timeline:</b> ${esc(timeline || "N/A")}</p>
          <p><b>Preferred Channel:</b> ${esc(preferredChannel || "N/A")}</p>
        `,
      });
    }

    console.log("[ZENIVIXON Project Brief] New Submission:", {
      name,
      email,
      company: company || "N/A",
      projectType,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ZENIVIXON Project Brief] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
