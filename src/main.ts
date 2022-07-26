import NatureApi from "./natureApi";
import SpreadsheetService from "./spreadsheetService";

const SHEET_NAME = "データ記録";
const PROPERTY_KEYS = {
  NATURE_ACCESS_TOKEN: "NATURE_ACCESS_TOKEN",
  SWITCH_BOT_ACCESS_TOKEN: "SWITCH_BOT_ACCESS_TOKEN",
};

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

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty(PROPERTY_KEYS.NATURE_ACCESS_TOKEN);
  if (!ACCESS_TOKEN) {
    Logger.log(`${PROPERTY_KEYS.NATURE_ACCESS_TOKEN} が設定されていません`);
    return;
  }

  const spreadsheetService = getSpreadsheetService(SHEET_NAME);
  if (!spreadsheetService) return;

  const natureApi = new NatureApi(ACCESS_TOKEN);

  const deviceInfos = natureApi.getDeviceInfos();
  const acInfo = natureApi.getACInfo();

  spreadsheetService.appendRow(deviceInfos[0], acInfo);
};

// eslint-disable-next-line no-unused-vars
const setProperties = (): void => {
  // // NATURE_ACCESS_TOKEN に サイトで発行した access_token を set する
  // // SWITCH_BOT_ACCESS_TOKEN に アプリで発行した access_token を set する
  //
  // const properties: { [key: string]: string } = {};
  //
  // properties[PROPERTY_KEYS.NATURE_ACCESS_TOKEN] = "{{access_token}}";
  // properties[PROPERTY_KEYS.SWITCH_BOT_ACCESS_TOKEN] = "{{access_token}}";
  //
  // const scriptProperties = PropertiesService.getScriptProperties();
  // scriptProperties.setProperties(properties);
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
