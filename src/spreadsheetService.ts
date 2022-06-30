import { ACInfo, DeviceInfo } from "./types";
import Utils from "./utils";

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

  appendRow(deviceInfo: DeviceInfo, acInfo: ACInfo): void {
    const createdAtString = Utils.getFormattedDate(new Date(deviceInfo.newest_events.te.created_at));
    const nowString = Utils.getFormattedDate(new Date());

    // [id, エアコン設定温度, 室温, センサー取得日時, 関数実行日時]
    this.sheet.appendRow([
      "=ROW()-1",
      acInfo.settings.temp,
      deviceInfo.newest_events.te.val.toString(),
      createdAtString,
      nowString,
    ]);
  }
}

export default SpreadsheetService;
