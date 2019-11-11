const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.jsx'],
    alias: {
      '@core': './src/core',
      '@screens': './src/screens',
      '@styles': './src/styles',
    },
  },
];
module.exports = {
  plugins: [MODULE_RESOLVER],
  presets: ['module:metro-react-native-babel-preset'],
};
