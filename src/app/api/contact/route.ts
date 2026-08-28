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
    const { name, email, company, service, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      service: typeof service === "string" ? service.trim() : "",
      message: message.trim(),
    };

    // ─── Forward to n8n Webhook ──────────────────────────────────────────────
    const webhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      "https://zenivixon.app.n8n.cloud/webhook-test/zenivixon-lead";

    let n8nError: string | null = null;
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        const errBody = await webhookRes.text();
        console.error(
          `[ZENIVIXON Contact Form] n8n webhook responded with status ${webhookRes.status}:`,
          errBody
        );
        try {
          const parsed = JSON.parse(errBody);
          n8nError =
            parsed.message ||
            parsed.hint ||
            `Webhook returned status ${webhookRes.status}`;
        } catch {
          n8nError = `Webhook returned status ${webhookRes.status}`;
        }
      }
    } catch (webhookErr) {
      console.error(
        "[ZENIVIXON Contact Form] Error connecting to n8n webhook:",
        webhookErr
      );
      n8nError =
        webhookErr instanceof Error
          ? webhookErr.message
          : "Failed to connect to webhook";
    }

    if (n8nError) {
      return NextResponse.json(
        { success: false, error: n8nError },
        { status: 502 }
      );
    }

    // ─── Send email using Resend (if configured) ─────────────────────────────
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== "your_resend_api_key_here"
    ) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "ZENIVIXON <noreply@zenivixon.com>",
          to: "zenivixon@gmail.com",
          subject: `New Inquiry from ${esc(payload.name)} — ${esc(payload.company || "No Company")}`,
          html: `
            <p><b>Name:</b> ${esc(payload.name)}</p>
            <p><b>Email:</b> ${esc(payload.email)}</p>
            <p><b>Company:</b> ${esc(payload.company || "N/A")}</p>
            <p><b>Service:</b> ${esc(payload.service || "N/A")}</p>
            <p><b>Message:</b><br/>${esc(payload.message).replace(/\n/g, "<br/>")}</p>
          `,
        });
      } catch (resendErr) {
        console.warn("[ZENIVIXON Contact Form] Resend email failed:", resendErr);
      }
    }

    console.log("[ZENIVIXON Contact Form] New Submission Processed:", {
      name: payload.name,
      email: payload.email,
      company: payload.company || "N/A",
      service: payload.service || "N/A",
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ZENIVIXON Contact Form] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
