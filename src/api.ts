import { ACInfo, DeviceInfo } from "./types";

class Api {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  getDeviceInfos(): DeviceInfo[] {
    const URL = "https://api.nature.global/1/devices";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
    const response = UrlFetchApp.fetch(URL, { method: "get", headers }).getContentText();

    return JSON.parse(response);
  }

  getACInfo(): ACInfo {
    const URL = "https://api.nature.global/1/appliances";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
    const response = UrlFetchApp.fetch(URL, { method: "get", headers }).getContentText();
    const data: { type: string }[] = JSON.parse(response);

    return data.find((item) => item.type === "AC") as ACInfo;
  }
}

export default Api;
