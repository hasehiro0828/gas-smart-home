// eslint-disable-next-line no-unused-vars
const main = (): void => {
  console.log("hello");
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
    Logger.log("キー: %s, 値: %s", key, properties[key]);
  }
};
