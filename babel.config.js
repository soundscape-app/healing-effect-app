module.exports = function(api) {
  api.cache(true);
  return {
    "ignore": [new RegExp("d3-array/dist/d3-array.js")],
    "presets": ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    "plugins": [
      'react-native-reanimated/plugin',
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
      ],
    ],
  };
};
