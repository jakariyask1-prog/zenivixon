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

    const effectiveMessage = payload.phone
      ? `${payload.message}\n\n[Direct Phone/WhatsApp: ${payload.phone}]`
      : payload.message;

    // 1. Analyze lead with Gemini AI (Resilient fallback to avoid losing leads)
    let aiAnalysis = {
      lead_summary: effectiveMessage.slice(0, 200),
      service_category: payload.service || "General Inquiry",
      lead_priority: "Normal",
      business_need: effectiveMessage,
      recommended_solution: "Engineering Review Required",
      client_reply: `Dear ${payload.name},\n\nThank you for reaching out to ZENIVIXON. We have received your inquiry regarding ${payload.service || "our technology services"} and our engineering team is reviewing your requirements. We will contact you within 24 hours.\n\nBest regards,\nZENIVIXON Technologies Team`,
      next_action: "Review inquiry and schedule discovery call",
    };

    try {
      const result = await analyzeLeadWithGemini({
        name: payload.name,
        email: payload.email,
        company: payload.company || "",
        service: payload.service || "N/A",
        message: effectiveMessage,
      });
      if (result) {
        aiAnalysis = { ...aiAnalysis, ...result };
      }
    } catch (aiErr) {
      console.warn("[ZENIVIXON Contact] Gemini AI analysis failed, proceeding with fallback data:", aiErr);
    }

    // 2. Append to Google Sheets
    await appendLeadToSheet({
      name: payload.name,
      email: payload.email,
      company: payload.company || "",
      service: aiAnalysis.service_category || payload.service || "N/A",
      leadPriority: aiAnalysis.lead_priority,
      businessNeed: aiAnalysis.business_need,
      recommendedSolution: aiAnalysis.recommended_solution,
    }).catch(err => console.error("Failed to append to Google Sheets:", err));

    // 3. Send Emails via Resend (To Client and To Admin)
    await sendLeadEmails({
      source: "contact",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company || "",
      service: payload.service || "General Inquiry",
      message: payload.message,
      clientReplyHtml: aiAnalysis.client_reply,
    }).catch(err => console.error("Failed to send emails:", err));

    // 4. Send POST request to Render API (zenivixon-ai-consultant)
    const aiConsultantUrl = process.env.AI_CONSULTANT_URL || process.env.NEXT_PUBLIC_AI_CONSULTANT_URL || "https://zenivixon-ai-consultant.onrender.com";
    try {
      await fetch(`${aiConsultantUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 5s timeout — Render free tier has cold-start delays
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          company: payload.company || "",
          service: payload.service || "N/A",
          message: effectiveMessage,
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
