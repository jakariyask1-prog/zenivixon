import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
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
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

    if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
      console.warn("[ZENIVIXON Newsletter] Resend API keys missing. Cannot subscribe email.");
      return NextResponse.json(
        { success: false, error: "Newsletter service not configured." },
        { status: 503 }
      );
    }

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      
      const { error } = await resend.contacts.create({
        email,
        audienceId: RESEND_AUDIENCE_ID,
      });

      if (error) {
        console.error("[ZENIVIXON Newsletter] Resend Error:", error);
        return NextResponse.json(
          { success: false, error: "Failed to subscribe. Please try again." },
          { status: 500 }
        );
      }
    } catch (e) {
      console.error("[ZENIVIXON Newsletter] Integration Error:", e);
      return NextResponse.json(
        { success: false, error: "Failed to subscribe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ZENIVIXON Newsletter] Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
