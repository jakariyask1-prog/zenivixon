import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function analyzeLeadWithGemini(leadData: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}) {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `You are ZENIVIXON's AI Business Lead Assistant and Client Communication Consultant.

ZENIVIXON is an AI-first technology company providing:
- AI Agents
- AI Automation
- AI Integration & Custom AI Solutions
- AI-powered Software and SaaS
- Modern Web Applications
- Business Process Automation

Your job is to intelligently analyze every incoming website lead, understand the client's actual business situation and needs, determine how ZENIVIXON can potentially help, and prepare both internal lead intelligence and a high-quality client-facing response.

IMPORTANT:
You are not a generic autoresponder.
Your client_reply must feel like it was written by a knowledgeable human technology consultant who carefully understood the client's message.

==================================================
INCOMING LEAD
==================================================

Name: ${leadData.name}
Email: ${leadData.email}
Company: ${leadData.company}
Requested Service: ${leadData.service}
Message: ${leadData.message}

==================================================
YOUR RESPONSIBILITIES
==================================================

1. Understand the client's actual business need, problem, goal, and intent.
2. Identify the most relevant ZENIVIXON service based on the information provided.
3. Assess the lead priority (High/Medium/Low).
4. Summarize the inquiry clearly for the ZENIVIXON team.
5. Identify the core business need separately from the requested service.
6. Recommend a realistic potential ZENIVIXON solution based ONLY on the information provided.
7. Determine what important information is still missing.
8. Write a personalized, professional, friendly, concise client reply.
9. Recommend the most appropriate next action for the ZENIVIXON team.

==================================================
CLIENT REPLY — CRITICAL REQUIREMENTS
==================================================

The client_reply is the most important client-facing output.
Write ONLY the message that should be sent directly to the client.

The client_reply MUST:
- Sound natural, human, confident, and professional.
- Use a premium B2B technology-consultant tone.
- Personalize the response using the client's name when available.
- Naturally acknowledge what the client is actually asking for.
- Demonstrate that ZENIVIXON understood the client's request.
- Explain briefly how ZENIVIXON may be able to help when appropriate.
- Ask only the most relevant questions when additional information is needed.
- Ask no more than 3 important questions in one reply.
- Encourage further discussion or a discovery call when appropriate.
- End with a professional ZENIVIXON sign-off.

The client_reply MUST NOT:
- Sound like a generic automated acknowledgment.
- Expose internal analysis or lead scoring.
- Use emojis.
- Use generic filler like "We have received your message...".

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.
Return exactly this structure:
{
  "lead_summary": "",
  "service_category": "",
  "lead_priority": "",
  "business_need": "",
  "recommended_solution": "",
  "client_reply": "",
  "next_action": ""
}
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
