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

    const { projectType, problemDescription, currentTools, budget, timeline, projectFileUrl, name, email, phone, company, preferredChannel } = parsed.data;

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
    if (phone && phone.trim()) {
      messageParts.push(`Phone / WhatsApp: ${phone.trim()}`);
    }
    if (budget && budget.trim()) {
      messageParts.push(`Target Budget: ${budget.trim()}`);
    }
    if (timeline && timeline.trim()) {
      messageParts.push(`Timeline: ${timeline.trim()}`);
    }
    if (preferredChannel && preferredChannel.trim()) {
      messageParts.push(`Preferred Contact: ${preferredChannel.trim()}`);
    }
    if (projectFileUrl && projectFileUrl.trim()) {
      messageParts.push(`Project Reference: ${projectFileUrl.trim()}`);
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

    // 1. Analyze lead with Gemini AI (Resilient fallback to avoid losing leads)
    let aiAnalysis = {
      lead_summary: payload.message.slice(0, 200),
      service_category: payload.service,
      lead_priority: "Normal",
      business_need: payload.message,
      recommended_solution: "Engineering Review Required",
      client_reply: `Dear ${payload.name},\n\nThank you for submitting your project brief to ZENIVIXON for ${payload.service}. Our engineering team is reviewing your project requirements and will reach out within 24 hours to schedule a technical discovery call.\n\nBest regards,\nZENIVIXON Technologies Team`,
      next_action: "Schedule technical discovery call",
    };

    try {
      const result = await analyzeLeadWithGemini(payload);
      if (result) {
        aiAnalysis = { ...aiAnalysis, ...result };
      }
    } catch (aiErr) {
      console.warn("[ZENIVIXON Project Brief] Gemini AI analysis failed, proceeding with fallback data:", aiErr);
    }

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
      source: "project-brief",
      name: payload.name,
      email: payload.email,
      phone: phone?.trim(),
      company: payload.company || "",
      service: payload.service,
      message: cleanMessage,
      problemDescription: problemDescription?.trim(),
      currentTools: currentTools?.trim(),
      budget: budget?.trim(),
      timeline: timeline?.trim(),
      projectFileUrl: projectFileUrl?.trim(),
      preferredChannel: preferredChannel?.trim(),
      clientReplyHtml: aiAnalysis.client_reply,
    }).catch(err => console.error("Failed to send emails:", err));

    // 4. Send POST request to Render API (zenivixon-ai-consultant)
    const aiConsultantUrl = process.env.AI_CONSULTANT_URL || process.env.NEXT_PUBLIC_AI_CONSULTANT_URL || "https://zenivixon-ai-consultant.onrender.com";
    try {
      await fetch(`${aiConsultantUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: phone?.trim() || "",
          company: payload.company || "",
          service: payload.service,
          message: payload.message,
          budget: budget?.trim() || "",
          timeline: timeline?.trim() || "",
          preferredChannel: preferredChannel?.trim() || "",
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
