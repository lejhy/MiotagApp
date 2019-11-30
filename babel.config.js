const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.jsx'],
    alias: {
      '@core': './src/core',
      '@hooks': './src/hooks',
      '@screens': './src/screens',
      '@services': './src/services',
      '@styles': './src/styles',
      '@utils': './src/utils',
    },
  },
];
module.exports = {
  plugins: [MODULE_RESOLVER],
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ],
};
