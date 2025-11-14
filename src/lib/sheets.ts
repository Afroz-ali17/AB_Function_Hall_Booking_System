import { google } from 'googleapis';

interface GoogleAuthConfig {
  privateKey: string;
  clientEmail: string;
  projectId: string;
}

interface SheetRow {
  [key: string]: string | number | boolean | null;
}

interface SheetResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class GoogleSheetsClient {
  private auth;
  private sheets;
  private spreadsheetId: string;

  constructor(config: GoogleAuthConfig, spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
    this.auth = new google.auth.JWT({
      email: config.clientEmail,
      key: config.privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async appendRow(sheetName: string, row: SheetRow): Promise<SheetResponse<{ updatedRows: number }>> {
    try {
      const values = Object.values(row);
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [values],
        },
      });

      return {
        success: true,
        data: { updatedRows: response.data.updates?.updatedRows || 1 },
      };
    } catch (error) {
      console.error('Google Sheets append error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to append row',
      };
    }
  }

  async readRows(sheetName: string): Promise<SheetResponse<SheetRow[]>> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const [headers, ...rows] = response.data.values || [[], []];
      if (!headers || rows.length === 0) {
        return { success: true, data: [] };
      }

      const data = rows.map(row =>
        headers.reduce<SheetRow>((acc, header, index) => {
          acc[header] = row[index] || '';
          return acc;
        }, {})
      );

      return { success: true, data };
    } catch (error) {
      console.error('Google Sheets read error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to read rows',
      };
    }
  }

  async updateCell(sheetName: string, cell: string, value: string | number | boolean): Promise<SheetResponse<null>> {
    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!${cell}`,
        valueInputOption: 'RAW',
        requestBody: { values: [[value]] },
      });

      return { success: true, data: null };
    } catch (error) {
      console.error('Google Sheets update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update cell',
      };
    }
  }

  async batchUpdate(
    sheetName: string,
    updates: Array<{ cell: string; value: any }>
  ): Promise<SheetResponse<{ updatedCells: number }>> {
    try {
      const data = updates.map(update => ({
        range: `${sheetName}!${update.cell}`,
        values: [[update.value]],
      }));

      const response = await this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          valueInputOption: 'RAW',
          data,
        },
      });

      return {
        success: true,
        data: { updatedCells: response.data.responses?.length || 0 },
      };
    } catch (error) {
      console.error('Google Sheets batch update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to batch update',
      };
    }
  }
}

export function getSheetsClient(): GoogleSheetsClient | null {
  // Return null if Google Sheets is not configured (optional feature)
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || 
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || 
      !process.env.GOOGLE_SHEETS_PROJECT_ID || 
      !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn('Google Sheets not configured - skipping sync');
    return null;
  }

  return new GoogleSheetsClient(
    {
      privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      projectId: process.env.GOOGLE_SHEETS_PROJECT_ID,
    },
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  );
}
