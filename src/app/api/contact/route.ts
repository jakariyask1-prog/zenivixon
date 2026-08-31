import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations";

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
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // ─── Forward to n8n Webhook ──────────────────────────────────────────────
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[ZENIVIXON Contact Form] N8N_WEBHOOK_URL is not configured.");
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
