// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);

// Thêm cấu hình cho assets
const defaultAssetExts = config.resolver.assetExts || [];
config.resolver.assetExts = [
  ...defaultAssetExts,
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'ttf',
  'otf'
];

// Cấu hình để Metro có thể tìm thấy assets
config.watchFolders = [__dirname];

// Wrap với Reanimated config
module.exports = wrapWithReanimatedMetroConfig(config);