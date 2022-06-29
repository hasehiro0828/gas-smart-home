class SpreadsheetService {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(name: string) {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    const sheet = this.spreadsheet.getSheetByName(name);
    if (!sheet) {
      throw new Error(`Sheet:${name} not found`);
    }
    this.sheet = sheet;
  }

  appendRow(acSettingTemp: string, temp: number, createdAtString: string, nowString: string): void {
    this.sheet.appendRow(["=ROW()-1", acSettingTemp, temp.toString(), createdAtString, nowString]);
  }
}

export default SpreadsheetService;
