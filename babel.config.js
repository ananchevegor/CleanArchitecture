module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@entities': './src/domain/entities',
          '@repositories': './src/domain/repositories',
          '@use-cases': './src/application/use-cases',
          '@composition': './src/composition',
          '@infrastructure': './src/infrastructure',
          '@': '.',
          '@presentation': './src/presentation',
        },
      },
    ],
  ],
};