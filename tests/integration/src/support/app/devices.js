exports.ios = {
  browserName: 'iPhone',
  'appium-version': '1.6',
  platformName: 'iOS',
  platformVersion: '10.2',
  automationName: 'XCUITest',
  deviceName: 'iPhone 6',
  app: '../../platforms/ios/build/emulator/ActionSportsCommunity.app'
};

exports.android = {
  browserName: 'android',
  'appium-version': '1.6',
  platformName: 'Android',
  platformVersion: '5.1',
  deviceName: 'crosswalk',
  app: '../../platforms/android/build/outputs/apk/android-armv7-debug.apk'
};

