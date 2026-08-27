import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "ZENIVIXON | AI-First Technology Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020817 0%, #0f172a 50%, #020817 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #2563eb, #06b6d4, #2563eb)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.12)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(6,182,212,0.10)",
            filter: "blur(80px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2563eb, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(37,99,235,0.4)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
                border: "2px solid rgba(255,255,255,0.6)",
              }}
            />
          </div>
          <span style={{ fontSize: 38, fontWeight: 800, color: "#ffffff", letterSpacing: "0.18em" }}>
            ZENIVIXON
          </span>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Automate Your Business. Scale with AI.
        </div>
        <div style={{ fontSize: 22, color: "#94a3b8", textAlign: "center", maxWidth: 700 }}>
          AI Agents - Workflow Automation - Web Development - System Integration
        </div>
        <div
          style={{
            marginTop: 48,
            padding: "10px 28px",
            borderRadius: 999,
            border: "1px solid rgba(37,99,235,0.5)",
            background: "rgba(37,99,235,0.15)",
            color: "#93c5fd",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          AI-FIRST TECHNOLOGY COMPANY
        </div>
      </div>
    ),
    { ...size }
  );
}