import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
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

    // Send email using Resend
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.warn("[ZENIVIXON] RESEND_API_KEY is not set or is a placeholder. Email will not be sent.");
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "ZENIVIXON <noreply@zenivixon.com>",
        to: "zenivixon@gmail.com",
        subject: `New Project Brief from ${name} — ${projectType}`,
        html: `
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company}</p>
          <p><b>Project Type:</b> ${projectType}</p>
          <p><b>Problem:</b> ${problemDescription}</p>
          <p><b>Current Tools:</b> ${currentTools}</p>
          <p><b>Timeline:</b> ${timeline}</p>
          <p><b>Preferred Channel:</b> ${preferredChannel}</p>
        `,
      });
    }

    console.log("[ZENIVIXON Project Brief] New Submission:", {
      name,
      email,
      company: company || "N/A",
      projectType,
      problemDescription,
      currentTools: currentTools || "N/A",
      timeline,
      preferredChannel,
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
