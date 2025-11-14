import { google } from 'googleapis';

interface SheetRow {
  [key: string]: string | number | null | undefined;
}

class GoogleSheetsClient {
  private sheets;
  private spreadsheetId: string;

  constructor() {
    // Check if all required environment variables are present
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const projectId = process.env.GOOGLE_SHEETS_PROJECT_ID;
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '';

    if (!privateKey || !clientEmail || !projectId || !this.spreadsheetId) {
      throw new Error('Google Sheets environment variables not configured');
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
        project_id: projectId,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  /**
   * Append a row to a specific sheet
   */
  async appendRow(sheetName: string, data: SheetRow): Promise<void> {
    try {
      // Get headers from the first row
      const headerResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!1:1`,
      });

      const headers = headerResponse.data.values?.[0] || [];
      
      // Map data to match header order
      const row = headers.map((header) => {
        const value = data[header];
        return value !== null && value !== undefined ? String(value) : '';
      });

      // Append the row
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:A`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });
    } catch (error) {
      console.error(`Error appending row to ${sheetName}:`, error);
      throw error;
    }
  }

  /**
   * Update a specific row by searching for a matching value in a column
   */
  async updateRow(
    sheetName: string,
    searchColumn: string,
    searchValue: string | number,
    updates: SheetRow
  ): Promise<void> {
    try {
      // Get all data from the sheet
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return;

      const headers = rows[0];
      const searchColumnIndex = headers.indexOf(searchColumn);

      if (searchColumnIndex === -1) {
        throw new Error(`Column "${searchColumn}" not found in sheet "${sheetName}"`);
      }

      // Find the row to update
      let rowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][searchColumnIndex]) === String(searchValue)) {
          rowIndex = i;
          break;
        }
      }

      if (rowIndex === -1) {
        console.warn(`Row with ${searchColumn}="${searchValue}" not found in ${sheetName}`);
        return;
      }

      // Build update values based on headers
      const updateValues = [...rows[rowIndex]];
      for (const [key, value] of Object.entries(updates)) {
        const columnIndex = headers.indexOf(key);
        if (columnIndex !== -1) {
          updateValues[columnIndex] = value !== null && value !== undefined ? String(value) : '';
        }
      }

      // Update the row
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A${rowIndex + 1}:${String.fromCharCode(65 + headers.length - 1)}${rowIndex + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [updateValues],
        },
      });
    } catch (error) {
      console.error(`Error updating row in ${sheetName}:`, error);
      throw error;
    }
  }

  /**
   * Get all rows from a sheet
   */
  async getRows(sheetName: string): Promise<SheetRow[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return [];

      const headers = rows[0];
      const data: SheetRow[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row: SheetRow = {};
        headers.forEach((header, index) => {
          row[header] = rows[i][index] || '';
        });
        data.push(row);
      }

      return data;
    } catch (error) {
      console.error(`Error getting rows from ${sheetName}:`, error);
      throw error;
    }
  }
}

let sheetsClient: GoogleSheetsClient | null = null;

/**
 * Get or create a singleton Google Sheets client
 * Returns null if not configured (to allow optional integration)
 */
export function getSheetsClient(): GoogleSheetsClient | null {
  // Return null if environment variables are not set (optional integration)
  if (
    !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEETS_PROJECT_ID ||
    !process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  ) {
    return null;
  }

  try {
    if (!sheetsClient) {
      sheetsClient = new GoogleSheetsClient();
    }
    return sheetsClient;
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    return null;
  }
}

/**
 * Log user registration to Google Sheets
 */
export async function logRegistration(data: {
  userId: string;
  name: string;
  email: string;
  timestamp: string;
}): Promise<void> {
  const client = getSheetsClient();
  if (!client) return;

  try {
    await client.appendRow('Registrations', {
      'User ID': data.userId,
      'Name': data.name,
      'Email': data.email,
      'Registered At': data.timestamp,
    });
    console.log('✅ Registration logged to Google Sheets');
  } catch (error) {
    console.error('Failed to log registration to Google Sheets:', error);
  }
}

/**
 * Log user login to Google Sheets
 */
export async function logLogin(data: {
  userId: string;
  email: string;
  timestamp: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<void> {
  const client = getSheetsClient();
  if (!client) return;

  try {
    await client.appendRow('Logins', {
      'User ID': data.userId,
      'Email': data.email,
      'Login Time': data.timestamp,
      'IP Address': data.ipAddress || '',
      'User Agent': data.userAgent || '',
    });
    console.log('✅ Login logged to Google Sheets');
  } catch (error) {
    console.error('Failed to log login to Google Sheets:', error);
  }
}

/**
 * Log booking to Google Sheets
 */
export async function logBooking(data: {
  bookingId: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  message: string | null;
  status: string;
  userId: string | null;
  createdAt: string;
}): Promise<void> {
  const client = getSheetsClient();
  if (!client) return;

  try {
    await client.appendRow('Bookings', {
      'Booking ID': data.bookingId,
      'Name': data.name,
      'Email': data.email,
      'Phone': data.phone,
      'Event Type': data.eventType,
      'Start Date': data.startDate,
      'End Date': data.endDate,
      'Guest Count': data.guestCount,
      'Status': data.status,
      'Message': data.message || '',
      'User ID': data.userId || '',
      'Created At': data.createdAt,
    });
    console.log('✅ Booking logged to Google Sheets');
  } catch (error) {
    console.error('Failed to log booking to Google Sheets:', error);
  }
}

/**
 * Update booking status in Google Sheets
 */
export async function updateBookingStatus(
  bookingId: number,
  status: string
): Promise<void> {
  const client = getSheetsClient();
  if (!client) return;

  try {
    await client.updateRow('Bookings', 'Booking ID', bookingId, {
      'Status': status,
      'Updated At': new Date().toISOString(),
    });
    console.log('✅ Booking status updated in Google Sheets');
  } catch (error) {
    console.error('Failed to update booking status in Google Sheets:', error);
  }
}
