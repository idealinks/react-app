const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const atImport = require('postcss-import');
const colorFunction = require('postcss-color-function');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      features: {
        'nesting-rules': true
      },
      importFrom: ['./styles/base.css']
    }),
    atImport(),
    colorFunction(),
    autoprefixer({
      browsers: ['> 1%', 'last 4 versions']
    })
  ]
};
