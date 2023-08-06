module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel",
      ["expo-location", {
        "locationAlwaysAndWhenInUsePermission": "피클피클이 위치 정보를 사용하려고 합니다.",
      }],
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env"
      }]
    ],
  };
};
