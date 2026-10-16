import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface LeadEmailData {
  source?: "contact" | "project-brief";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  problemDescription?: string;
  currentTools?: string;
  budget?: string;
  timeline?: string;
  projectFileUrl?: string;
  preferredChannel?: string;
  clientReplyHtml?: string;
}

/**
 * Generate a high-end, responsive HTML email for the Client.
 */
function generateClientEmailHtml(data: LeadEmailData): string {
  const isBrief = data.source === "project-brief";
  const channel = data.preferredChannel || "Email";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - ZENIVIXON</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F1F5F9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08); border: 1px solid #E2E8F0;">
          
          <!-- Top Accent Gradient Line -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #2563EB 0%, #06B6D4 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color: #0B1120; padding: 32px 36px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">ZENIVIXON</span>
                    <span style="font-size: 11px; font-weight: 700; color: #38BDF8; letter-spacing: 1.5px; text-transform: uppercase; margin-left: 8px; vertical-align: middle; padding: 2px 8px; background: rgba(56, 189, 248, 0.1); border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.2);">TECHNOLOGIES</span>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">AI-First Technology Company &bull; Global Engineering</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 36px 24px 36px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
                Thank you for contacting ZENIVIXON, ${escapeHtml(data.name)}.
              </h2>
              <p style="font-size: 14px; color: #475569; margin: 0 0 20px 0;">
                We have successfully received your ${isBrief ? "project brief" : "inquiry"} regarding <b style="color: #0F172A;">${escapeHtml(data.service)}</b>. Our engineering team is currently reviewing your submission.
              </p>

              <!-- Submission Summary Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; margin: 20px 0; font-size: 13px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E2E8F0; font-weight: 700; color: #0F172A;">
                    📋 Summary of Received Details:
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px;">
                    <table width="100%" cellpadding="4" cellspacing="0" style="color: #475569; font-size: 13px;">
                      <tr>
                        <td width="35%" style="color: #64748B;">Service / Capability:</td>
                        <td style="color: #0F172A; font-weight: 600;">${escapeHtml(data.service)}</td>
                      </tr>
                      ${data.company ? `
                      <tr>
                        <td style="color: #64748B;">Company:</td>
                        <td style="color: #0F172A;">${escapeHtml(data.company)}</td>
                      </tr>` : ""}
                      ${data.phone ? `
                      <tr>
                        <td style="color: #64748B;">Phone / WhatsApp:</td>
                        <td style="color: #0F172A; font-weight: 600;">${escapeHtml(data.phone)}</td>
                      </tr>` : ""}
                      ${data.budget ? `
                      <tr>
                        <td style="color: #64748B;">Target Budget:</td>
                        <td style="color: #059669; font-weight: 700;">${escapeHtml(data.budget)}</td>
                      </tr>` : ""}
                      ${data.timeline ? `
                      <tr>
                        <td style="color: #64748B;">Timeline:</td>
                        <td style="color: #0F172A;">${escapeHtml(data.timeline)}</td>
                      </tr>` : ""}
                      <tr>
                        <td style="color: #64748B;">Preferred Channel:</td>
                        <td style="color: #2563EB; font-weight: 600;">${escapeHtml(channel)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What to Expect Next -->
              <div style="margin: 24px 0;">
                <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 8px;">What to expect next:</div>
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #475569;">
                  <tr>
                    <td width="24" valign="top" style="color: #2563EB; font-weight: bold;">1.</td>
                    <td><b>Technical Audit:</b> We analyze your current manual bottlenecks and tool stack feasibility.</td>
                  </tr>
                  <tr>
                    <td width="24" valign="top" style="color: #2563EB; font-weight: bold;">2.</td>
                    <td><b>Direct Response:</b> A senior technology consultant will reply via <b>${escapeHtml(channel)}</b> within 24 hours.</td>
                  </tr>
                </table>
              </div>

              <!-- Fast Track Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ECFDF5; border-radius: 12px; border: 1px solid #A7F3D0; margin: 24px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="font-size: 13px; font-weight: 700; color: #065F46;">Need an immediate discussion or urgent consultation?</div>
                          <div style="font-size: 12px; color: #047857; margin-top: 2px;">Our team is available directly on WhatsApp Business.</div>
                        </td>
                        <td align="right" style="padding-left: 12px;">
                          <a href="https://wa.me/8801937685423?text=Hi%20ZENIVIXON%2C%20following%20up%20on%20my%20brief" target="_blank" style="display: inline-block; background-color: #059669; color: #FFFFFF; font-size: 12px; font-weight: 700; text-decoration: none; padding: 8px 14px; border-radius: 8px;">
                            Chat on WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #64748B; margin: 24px 0 0 0;">
                Best regards,<br>
                <b style="color: #0F172A;">ZENIVIXON Technologies Team</b><br>
                <span style="font-size: 12px; color: #94A3B8;">Dhaka, Bangladesh &bull; Global AI Systems &amp; Engineering</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 36px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #94A3B8;">
              <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} ZENIVIXON TECHNOLOGIES. All rights reserved.</p>
              <p style="margin: 0;">
                <a href="https://zenivixon.com" style="color: #2563EB; text-decoration: none;">zenivixon.com</a> &bull; 
                <a href="mailto:contact@zenivixon.com" style="color: #2563EB; text-decoration: none;">contact@zenivixon.com</a> &bull; 
                <a href="https://wa.me/8801937685423" style="color: #2563EB; text-decoration: none;">+880 1937-685423</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generate a structured, executive HTML email for the Technical Admin Team.
 */
function generateAdminEmailHtml(data: LeadEmailData): string {
  const isBrief = data.source === "project-brief";
  const cleanPhone = data.phone ? data.phone.replace(/[^0-9+]/g, '') : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - ZENIVIXON</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B1120; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; background-color: #0F172A; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); border: 1px solid #1E293B;">
          
          <!-- Top Accent Line -->
          <tr>
            <td style="height: 5px; background: ${isBrief ? "linear-gradient(90deg, #3B82F6, #8B5CF6)" : "linear-gradient(90deg, #10B981, #06B6D4)"};"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background-color: #0B1120; border-bottom: 1px solid #1E293B;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; ${isBrief ? "background: #1E3A8A; color: #60A5FA; border: 1px solid #3B82F6;" : "background: #064E3B; color: #34D399; border: 1px solid #10B981;"}">
                      ${isBrief ? "🚀 NEW PROJECT BRIEF INTAKE" : "🟢 NEW DIRECT CONTACT INQUIRY"}
                    </span>
                    <h1 style="font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 12px 0 4px 0;">
                      ${escapeHtml(data.name)}
                    </h1>
                    <div style="font-size: 13px; color: #94A3B8;">
                      ${data.company ? `Company: <b style="color: #E2E8F0;">${escapeHtml(data.company)}</b> &bull; ` : ""}
                      Received at: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (BST)
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Client Contact Block -->
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #38BDF8; margin-bottom: 12px;">
                👤 Client Contact Dossier
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #070E1E; border-radius: 12px; border: 1px solid #1E293B; margin-bottom: 24px; font-size: 13px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0">
                      <tr>
                        <td width="30%" style="color: #64748B; font-weight: 600;">Full Name:</td>
                        <td style="color: #FFFFFF; font-weight: 700;">${escapeHtml(data.name)}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Business Email:</td>
                        <td>
                          <a href="mailto:${escapeHtml(data.email)}" style="color: #38BDF8; font-weight: 600; text-decoration: none;">
                            ${escapeHtml(data.email)}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Phone / WhatsApp:</td>
                        <td>
                          ${data.phone ? `
                            <span style="color: #34D399; font-weight: 800; font-size: 14px;">${escapeHtml(data.phone)}</span>
                            <span style="margin-left: 8px;">
                              <a href="tel:${escapeHtml(cleanPhone)}" style="color: #60A5FA; text-decoration: underline; font-size: 12px;">Dial</a> &bull; 
                              <a href="https://wa.me/${escapeHtml(cleanPhone)}" target="_blank" style="color: #34D399; text-decoration: underline; font-size: 12px;">Open WhatsApp</a>
                            </span>
                          ` : `<span style="color: #64748B; font-style: italic;">Not provided</span>`}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Company / Org:</td>
                        <td style="color: #E2E8F0;">${escapeHtml(data.company || "Individual / Not specified")}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Preferred Channel:</td>
                        <td>
                          <span style="display: inline-block; padding: 2px 10px; background: #1E293B; color: #F1F5F9; border-radius: 6px; font-weight: 700; border: 1px solid #334155;">
                            ${escapeHtml(data.preferredChannel || "Email")}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Project Scoping & Requirements Block -->
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #38BDF8; margin-bottom: 12px;">
                🎯 Project &amp; Technical Scope
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #070E1E; border-radius: 12px; border: 1px solid #1E293B; margin-bottom: 24px; font-size: 13px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0">
                      <tr>
                        <td width="30%" style="color: #64748B; font-weight: 600;">Service Category:</td>
                        <td style="color: #FFFFFF; font-weight: 700;">${escapeHtml(data.service)}</td>
                      </tr>
                      ${data.budget ? `
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Estimated Budget:</td>
                        <td style="color: #34D399; font-weight: 800; font-size: 14px;">${escapeHtml(data.budget)}</td>
                      </tr>` : ""}
                      ${data.timeline ? `
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Target Timeline:</td>
                        <td style="color: #E2E8F0; font-weight: 600;">${escapeHtml(data.timeline)}</td>
                      </tr>` : ""}
                      ${data.currentTools ? `
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Current Stack / Tools:</td>
                        <td style="color: #F1F5F9;">${escapeHtml(data.currentTools)}</td>
                      </tr>` : ""}
                      ${data.projectFileUrl ? `
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Project Spec / Link:</td>
                        <td>
                          <a href="${escapeHtml(data.projectFileUrl)}" target="_blank" style="color: #38BDF8; text-decoration: underline; word-break: break-all;">
                            ${escapeHtml(data.projectFileUrl)}
                          </a>
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Requirements / Message Block -->
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #38BDF8; margin-bottom: 12px;">
                💬 Submitted Problem Statement / Message
              </div>
              <div style="background-color: #070E1E; border-radius: 12px; border: 1px solid #1E293B; padding: 20px; font-size: 14px; color: #F1F5F9; line-height: 1.7; white-space: pre-wrap; margin-bottom: 28px;">
${escapeHtml(data.problemDescription || data.message || "No additional text provided.")}
              </div>

              <!-- Quick Action Bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20ZENIVIXON%20-%20${encodeURIComponent(data.service)}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; margin-right: 12px;">
                      ✉️ Reply by Email
                    </a>
                    ${cleanPhone ? `
                    <a href="https://wa.me/${escapeHtml(cleanPhone)}?text=Hi%20${encodeURIComponent(data.name)}%2C%20this%20is%20ZENIVIXON%20Technologies." target="_blank" style="display: inline-block; background-color: #059669; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px;">
                      💬 Open WhatsApp Chat
                    </a>` : ""}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0B1120; padding: 20px 32px; border-top: 1px solid #1E293B; text-align: center; font-size: 11px; color: #64748B;">
              ZENIVIXON Lead Ingestion Pipeline &bull; Automated Dispatch to Technical Team
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function escapeHtml(text?: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadEmails(data: LeadEmailData) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const isBrief = data.source === "project-brief";
  const clientSubject = isBrief
    ? `Thank you for your project brief — ZENIVIXON TECHNOLOGIES`
    : `Thank you for contacting ZENIVIXON TECHNOLOGIES`;

  const adminSubject = isBrief
    ? `🚀 New Project Brief: ${data.name}${data.company ? ` (${data.company})` : ""} — ${data.service}`
    : `🟢 New Contact Lead: ${data.name}${data.company ? ` (${data.company})` : ""}`;

  const clientHtml = generateClientEmailHtml(data);
  const adminHtml = generateAdminEmailHtml(data);

  try {
    // 1. Send Email to Client
    const clientResponse = await resend.emails.send({
      from: "ZENIVIXON <contact@zenivixon.com>",
      to: [data.email],
      replyTo: "contact@zenivixon.com",
      subject: clientSubject,
      html: clientHtml,
    });

    if (clientResponse.error) {
      console.error("[Resend Error - Client Email]:", clientResponse.error);
      throw new Error(`Client email failed: ${clientResponse.error.message}`);
    }

    // 2. Send Notification Email to Admin Technical Team
    const adminEmail = process.env.ADMIN_EMAIL || "zenivixon@gmail.com";
    const adminResponse = await resend.emails.send({
      from: "ZENIVIXON <contact@zenivixon.com>",
      to: [adminEmail],
      replyTo: data.email,
      subject: adminSubject,
      html: adminHtml,
    });

    if (adminResponse.error) {
      console.error("[Resend Error - Admin Email]:", adminResponse.error);
      throw new Error(`Admin email failed: ${adminResponse.error.message}`);
    }

    console.log(`[ZENIVIXON Email] Successfully sent both emails (Client & Admin) for ${data.name}.`);
  } catch (error) {
    console.error("Error sending emails:", error);
    throw error;
  }
}
