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

    // Map project-brief fields to the expected n8n contact form fields
    const mappedMessage = `
**Problem Description:**
${problemDescription}

**Current Tools:**
${currentTools || "N/A"}

**Timeline:**
${timeline || "N/A"}

**Preferred Channel:**
${preferredChannel || "N/A"}
    `.trim();

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      service: typeof projectType === "string" ? projectType.trim() : "Project Brief",
      message: mappedMessage,
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
        n8nError = `Webhook returned status ${webhookRes.status}`;
      }
    } catch (webhookErr) {
      console.error(
        "[ZENIVIXON Project Brief] Error connecting to n8n webhook:",
        webhookErr
      );
      n8nError = "Failed to connect to webhook";
    }

    if (n8nError) {
      return NextResponse.json(
        { success: false, error: n8nError },
        { status: 502 }
      );
    }

    console.log("[ZENIVIXON Project Brief] New Submission Processed:", {
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
