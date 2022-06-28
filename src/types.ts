export interface DeviceInfo {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  mac_address: string;
  serial_number: string;
  firmware_version: string;
  temperature_offset: number;
  humidity_offset: number;
  users: {
    id: string;
    nickname: string;
    superuser: boolean;
  }[];
  newest_events: {
    te: {
      val: number;
      created_at: string;
    };
  };
}

export interface ACInfo {
  id: string;
  type: "AC";
  settings: {
    temp: string;
    temp_unit: string;
    mode: string;
    vol: string;
    dir: string;
    dirh: string;
    button: string;
    updated_at: Date;
  };
}
