export interface DeviceStatus {
  statusCode: number;
  body: {
    deviceId: string;
    deviceType: string;
    hubDeviceId: string;
    humidity: number;
    temperature: number;
  };
  message: string;
}
