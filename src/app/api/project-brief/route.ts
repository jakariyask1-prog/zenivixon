import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (await checkRateLimit(ip)) {
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

    const projectTypeLabels: Record<string, string> = {
      "ai-agents": "AI Agents & 24/7 Customer Support",
      "ai-automation": "AI Workflow & Business Automation",
      "software-web-development": "Custom Software & Web Development",
      "ai-integration": "AI System Integration & Vector RAG",
      "custom-system": "Comprehensive Architecture Audit",
    };

    const resolvedService =
      (typeof projectType === "string" && projectTypeLabels[projectType]) ||
      (typeof projectType === "string" && projectType.trim() ? projectType.trim() : "AI Project Brief");

    // Clean, structured message without raw multi-line markdown that could break downstream n8n Resend JSON payloads
    const messageParts: string[] = [];
    if (problemDescription && problemDescription.trim()) {
      messageParts.push(problemDescription.trim());
    }
    if (currentTools && currentTools.trim()) {
      messageParts.push(`Current Tools: ${currentTools.trim()}`);
    }
    if (timeline && timeline.trim()) {
      messageParts.push(`Timeline: ${timeline.trim()}`);
    }
    if (preferredChannel && preferredChannel.trim()) {
      messageParts.push(`Preferred Contact: ${preferredChannel.trim()}`);
    }

    const cleanMessage = messageParts.join(" | ");

    if (cleanMessage.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long. Please limit to 5000 characters." },
        { status: 400 }
      );
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      service: resolvedService,
      message: cleanMessage,
    };

    // ─── Forward to n8n Webhook ──────────────────────────────────────────────
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[ZENIVIXON Project Brief] N8N_WEBHOOK_URL is not configured.");
      return NextResponse.json(
        { success: false, error: "Service configuration error." },
        { status: 503 }
      );
    }

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
          `[ZENIVIXON Project Brief] n8n webhook responded with status ${webhookRes.status}:`,
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
        "[ZENIVIXON Project Brief] Error connecting to n8n webhook:",
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

    console.log("[ZENIVIXON Project Brief] New Submission Processed:", {
      name: payload.name,
      email: payload.email,
      company: payload.company || "N/A",
      service: payload.service,
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
