import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function appendLeadToSheet(data: {
  name: string;
  email: string;
  company: string;
  service: string;
  leadPriority: string;
  businessNeed: string;
  recommendedSolution: string;
}) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    console.error("Google Sheets credentials are not configured.");
    return;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: email,
      key: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    // Assuming the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Dynamically match column headers or fall back to standard defaults
    await sheet.loadHeaderRow().catch(() => {});
    const headers = sheet.headerValues || [];
    
    const nameKey = headers.find(h => h.trim().toLowerCase() === "name") || "Name ";
    const emailKey = headers.find(h => h.trim().toLowerCase() === "email") || "email";
    const serviceKey = headers.find(h => h.trim().toLowerCase() === "service") || "service";
    const priorityKey = headers.find(h => h.trim().toLowerCase() === "lead priority") || "lead priority";
    const needKey = headers.find(h => h.trim().toLowerCase() === "business need") || "business need";
    const solutionKey = headers.find(h => h.trim().toLowerCase() === "recommendation solution" || h.trim().toLowerCase() === "recommended solution") || "recommendation solution";
    const companyKey = headers.find(h => h.trim().toLowerCase() === "company") || "company";
    
    await sheet.addRow({
      [nameKey]: data.name,
      [emailKey]: data.email,
      [serviceKey]: data.service,
      [priorityKey]: data.leadPriority,
      [needKey]: data.businessNeed,
      [solutionKey]: data.recommendedSolution,
      [companyKey]: data.company || "N/A"
    });
    
    console.log("[ZENIVIXON Google Sheets] Successfully appended row.");
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw error;
  }
}
