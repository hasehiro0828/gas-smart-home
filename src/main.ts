import Api from "./api";
import SpreadsheetService from "./spreadsheetService";
import Utils from "./utils";

const SHEET_NAME = "データ記録";

// eslint-disable-next-line no-unused-vars
const main = (): void => {
  const getSpreadsheetService = (sheetName: string): SpreadsheetService | null => {
    try {
      return new SpreadsheetService(sheetName);
    } catch (error) {
      Logger.log(error);
      return null;
    }
  };

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("NATURE_ACCESS_TOKEN");
  if (!ACCESS_TOKEN) {
    Logger.log("NATURE_ACCESS_TOKEN が設定されていません");
    return;
  }

  const spreadsheetService = getSpreadsheetService(SHEET_NAME);
  if (!spreadsheetService) return;

  const api = new Api(ACCESS_TOKEN);

  const deviceInfos = api.getDeviceInfos();
  const acInfo = api.getACInfo();

  const createdAtString = Utils.getFormattedDate(new Date(deviceInfos[0].newest_events.te.created_at));
  const nowString = Utils.getFormattedDate(new Date());

  spreadsheetService.appendRow(acInfo.settings.temp, deviceInfos[0].newest_events.te.val, createdAtString, nowString);
};

// eslint-disable-next-line no-unused-vars
const setProperties = (): void => {
  // // NATURE_ACCESS_TOKEN に サイトで発行した access_token を set する
  // const scriptProperties = PropertiesService.getScriptProperties();
  // scriptProperties.setProperties({ NATURE_ACCESS_TOKEN: "{{access_token}}" });
};

// eslint-disable-next-line no-unused-vars
const getProperties = (): void => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties();

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in properties) {
    Logger.log(`キー: ${key}, 値: ${properties[key]}`);
  }
};
