import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendLeadEmails(data: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  clientReplyHtml: string;
}) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  try {
    // 1. Send Email to Client (AI Generated Reply)
    await resend.emails.send({
      from: "ZENIVIXON <contact@zenivixon.com>",
      to: [data.email],
      subject: "Thank you for contacting ZENIVIXON",
      html: data.clientReplyHtml.replace(/\n/g, "<br>"),
    });

    // 2. Send Notification Email to Admin
    const adminHtml = `<h2>New Contact Form Submission</h2>
<p><b>Name:</b> ${data.name}</p>
<p><b>Email:</b> ${data.email}</p>
<p><b>Company:</b> ${data.company}</p>
<p><b>Service:</b> ${data.service}</p>
<p><b>Message:</b> ${data.message}</p>`;

    await resend.emails.send({
      from: "ZENIVIXON <contact@zenivixon.com>",
      to: ["zenivixon@gmail.com"],
      replyTo: data.email,
      subject: `🟢 New Lead: ${data.name}`,
      html: adminHtml,
    });

    console.log("[ZENIVIXON Email] Successfully sent both emails via Resend.");
  } catch (error) {
    console.error("Error sending emails:", error);
    throw error;
  }
}
