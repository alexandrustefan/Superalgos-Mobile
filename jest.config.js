const { defaults: tsjPreset } = require("ts-jest/presets")

module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "/e2e", "@react-native", "<rootDir>/nodejs_assets/", "<rootDir>/android/app/intermediates/merged_assets/debug/"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setup.ts"],
}
