import { DeviceStatus } from "./types/switchBot";

class SwitchBotApi {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  getDeviceStatus(deviceId: string): DeviceStatus {
    const URL = `https://api.switch-bot.com/v1.0/devices/${deviceId}/status`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
    const response = UrlFetchApp.fetch(URL, { method: "get", headers }).getContentText();

    return JSON.parse(response);
  }
}

export default SwitchBotApi;
