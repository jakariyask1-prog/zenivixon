import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations";
import { analyzeLeadWithGemini } from "@/lib/gemini";
import { appendLeadToSheet } from "@/lib/sheets";
import { sendLeadEmails } from "@/lib/email";

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

    // ─── Direct Lead Processing (Replacing n8n) ──────────────────────────────
    console.log(`[ZENIVIXON Contact] Processing new lead for: ${payload.email}`);

    // We process the external integrations asynchronously to not block the user response,
    // or we can await them if we want to ensure they succeed before returning success.
    // It's usually better to await them to let the client know if something failed,
    // but on Vercel we need to return within the timeout. 10 seconds is usually enough.

    // 1. Analyze lead with Gemini AI
    const aiAnalysis = await analyzeLeadWithGemini({
      name: payload.name,
      email: payload.email,
      company: payload.company || "",
      service: payload.service || "N/A",
      message: payload.message,
    });

    // 2. Append to Google Sheets
    await appendLeadToSheet({
      name: payload.name,
      email: payload.email,
      company: payload.company || "",
      service: aiAnalysis.service_category || payload.service,
      leadPriority: aiAnalysis.lead_priority,
      businessNeed: aiAnalysis.business_need,
      recommendedSolution: aiAnalysis.recommended_solution,
    }).catch(err => console.error("Failed to append to Google Sheets:", err));

    // 3. Send Emails via Resend (To Client and To Admin)
    await sendLeadEmails({
      name: payload.name,
      email: payload.email,
      company: payload.company || "",
      service: payload.service || "N/A",
      message: payload.message,
      clientReplyHtml: aiAnalysis.client_reply,
    }).catch(err => console.error("Failed to send emails:", err));

    // 4. Send POST request to Render API (zenivixon-ai-consultant)
    try {
      await fetch("https://zenivixon-ai-consultant.onrender.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          company: payload.company || "",
          service: payload.service || "N/A",
          message: payload.message,
          lead_priority: aiAnalysis.lead_priority,
          business_need: aiAnalysis.business_need,
          recommended_solution: aiAnalysis.recommended_solution,
        }),
      });
      console.log("[ZENIVIXON Render API] Lead forwarded successfully.");
    } catch (renderErr) {
      console.error("Failed to forward lead to Render API:", renderErr);
    }

    console.log("[ZENIVIXON Contact Form] New Submission Processed Successfully.");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ZENIVIXON Contact Form] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
