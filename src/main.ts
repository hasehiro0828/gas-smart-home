import NatureApi from "./natureApi";
import SpreadsheetService from "./spreadsheetService";
import SwitchBotApi from "./switchBotApi";

const SHEET_NAME = "データ記録";
const PROPERTY_KEYS = {
  NATURE_ACCESS_TOKEN: "NATURE_ACCESS_TOKEN",
  SWITCH_BOT_ACCESS_TOKEN: "SWITCH_BOT_ACCESS_TOKEN",
  SWITCH_BOT_METER_PLUS_DEVICE_ID: "SWITCH_BOT_METER_PLUS_DEVICE_ID",
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

  const properties = PropertiesService.getScriptProperties();

  const natureAccessToken = properties.getProperty(PROPERTY_KEYS.NATURE_ACCESS_TOKEN);
  if (!natureAccessToken) {
    Logger.log(`${PROPERTY_KEYS.NATURE_ACCESS_TOKEN} が設定されていません`);
  }

  const switchBOtAccessToken = properties.getProperty(PROPERTY_KEYS.SWITCH_BOT_ACCESS_TOKEN);
  if (!switchBOtAccessToken) {
    Logger.log(`${PROPERTY_KEYS.SWITCH_BOT_ACCESS_TOKEN} が設定されていません`);
  }

  const switchBotMeterPlusDeviceId = properties.getProperty(PROPERTY_KEYS.SWITCH_BOT_METER_PLUS_DEVICE_ID);
  if (!switchBotMeterPlusDeviceId) {
    Logger.log(`${PROPERTY_KEYS.SWITCH_BOT_METER_PLUS_DEVICE_ID} が設定されていません`);
  }

  if (!natureAccessToken || !switchBOtAccessToken || !switchBotMeterPlusDeviceId) {
    Logger.log("properties を設定してください");
    return;
  }

  const spreadsheetService = getSpreadsheetService(SHEET_NAME);
  if (!spreadsheetService) return;

  const natureApi = new NatureApi(natureAccessToken);
  const switchBotApi = new SwitchBotApi(switchBOtAccessToken);

  const deviceInfos = natureApi.getDeviceInfos();
  const acInfo = natureApi.getACInfo();
  const status = switchBotApi.getDeviceStatus(switchBotMeterPlusDeviceId);

  spreadsheetService.appendRow(deviceInfos[0], acInfo, status);
};

// eslint-disable-next-line no-unused-vars
const setProperties = (): void => {
  // const properties: { [key: string]: string } = {};
  //
  // properties[PROPERTY_KEYS.NATURE_ACCESS_TOKEN] = "{{access_token}}";
  // properties[PROPERTY_KEYS.SWITCH_BOT_ACCESS_TOKEN] = "{{access_token}}";
  // properties[PROPERTY_KEYS.SWITCH_BOT_METER_PLUS_DEVICE_ID] = "{{deviceId}}";
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
