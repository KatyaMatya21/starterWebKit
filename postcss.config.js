module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-css-variables': {},
    'postcss-mixins': {},
    'precss': {},
    'postcss-preset-env': {
      browsers: "last 3 versions",
      autoprefixer: {
        grid: true
      },
      stage: 3
    },
    'css-mqpacker': {},
    'cssnano': {}
  }
};
