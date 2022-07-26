import { ACInfo, DeviceInfo } from "./types";
import { DeviceStatus } from "./types/switchBot";
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

  appendRow(deviceInfo: DeviceInfo, acInfo: ACInfo, status: DeviceStatus): void {
    const createdAtString = Utils.getFormattedDate(new Date(deviceInfo.newest_events.te.created_at));
    const nowString = Utils.getFormattedDate(new Date());
    const power = acInfo.settings.button === "power-off" ? "OFF" : "ON";

    // [id, エアコン電源, エアコンモード, エアコン設定温度, 室温(Nature), 室温(SwitchBot), 湿度, センサー取得日時, 関数実行日時, deviceInfoJson, acInfoJson]
    this.sheet.appendRow([
      "=ROW()-1",
      power,
      acInfo.settings.mode,
      acInfo.settings.temp,
      deviceInfo.newest_events.te.val.toString(),
      status.body.temperature.toString(),
      status.body.humidity.toString(),
      createdAtString,
      nowString,
      JSON.stringify(deviceInfo),
      JSON.stringify(acInfo),
    ]);
  }
}

export default SpreadsheetService;
