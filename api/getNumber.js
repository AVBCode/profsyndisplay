export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
  const SHEET_ID = "1RKloafEUhUi2t4wPxMJxrLRcxuKFFdoAQz4MYFEqHo4";
  const SHEET_NAME = "Sheet2";
  const RANGE = "A1";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const value = parseInt(data?.values?.[0]?.[0], 10);

    if (isNaN(value)) {
      return res.status(500).json({ error: "Invalid number" });
    }

    res.status(200).json({ number: value });
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    res.status(500).json({ error: "Failed to fetch number" });
  }
}
