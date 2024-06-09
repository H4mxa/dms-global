module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigation': './src/app/navigation',
          '@screens': './src/app/screens',
          '@model': './src/app/modules/model',
          '@common': './src/app/modules/common',
          '@helper': './src/app/modules/helper',
          '@rn-core': './src/library/components/core/index',
          '@config': './src/app/modules/config/config',
          '@store': './src/app/store',
          '@components': './src/library/components',
          '@redux': './src/redux',
          '@theme': './src/app/modules/themes/index',
          '@themes': './src/app/modules/themes',
          '@assets': './src/assets',
          '@animated': './src/app/modules/common/animated/index',
          '@hooks': './src/app/modules/common/hooks/index',
        },
      },
    ],
  ],
};
