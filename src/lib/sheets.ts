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

    // Note: The keys here should match the column headers in your Google Sheet exactly.
    // In your n8n workflow the columns were:
    // "Name ", "email", "service", "lead priority", "business need", "recommendation solution", "company"
    
    await sheet.addRow({
      "Name ": data.name,
      "email": data.email,
      "service": data.service,
      "lead priority": data.leadPriority,
      "business need": data.businessNeed,
      "recommendation solution": data.recommendedSolution,
      "company": data.company || "N/A"
    });
    
    console.log("[ZENIVIXON Google Sheets] Successfully appended row.");
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw error;
  }
}
