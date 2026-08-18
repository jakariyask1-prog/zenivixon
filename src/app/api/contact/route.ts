import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
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

    // ─────────────────────────────────────────────────────────────
    // TODO: Connect your preferred email service here.
    //
    // Option A — Resend (recommended, free tier available):
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "ZENIVIXON <noreply@zenivixon.com>",
    //     to: "support@zenivixon.com",
    //     subject: `New Inquiry from ${name} — ${company || "No Company"}`,
    //     html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Company:</b> ${company}</p><p><b>Message:</b> ${message}</p>`,
    //   });
    //
    // Option B — Nodemailer (SMTP):
    //   const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
    //   await transporter.sendMail({ from, to, subject, html });
    // ─────────────────────────────────────────────────────────────

    console.log("[ZENIVIXON Contact Form] New Submission:", {
      name,
      email,
      company: company || "N/A",
      message,
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
