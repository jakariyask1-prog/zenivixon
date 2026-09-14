import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { projectBriefSchema } from "@/lib/validations";
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
    const parsed = projectBriefSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { projectType, problemDescription, currentTools, timeline, name, email, company, preferredChannel } = parsed.data;

    const projectTypeLabels: Record<string, string> = {
      "ai-agents": "AI Agents & 24/7 Customer Support",
      "ai-automation": "AI Workflow & Business Automation",
      "software-web-development": "Custom Software & Web Development",
      "ai-integration": "AI System Integration & Vector RAG",
      "custom-system": "Comprehensive Architecture Audit",
    };

    const resolvedService = projectTypeLabels[projectType] || projectType || "AI Project Brief";

    // Clean, structured message
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

    // ─── Direct Lead Processing (Replacing n8n) ──────────────────────────────
    console.log(`[ZENIVIXON Project Brief] Processing new lead for: ${payload.email}`);

    // 1. Analyze lead with Gemini AI
    const aiAnalysis = await analyzeLeadWithGemini(payload);

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
      service: payload.service,
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
          service: payload.service,
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

    console.log("[ZENIVIXON Project Brief] New Submission Processed Successfully.");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ZENIVIXON Project Brief] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
