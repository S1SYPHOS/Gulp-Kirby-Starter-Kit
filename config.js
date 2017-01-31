module.exports = {
  paths: {
    source: './_posts',
    build: '_site',
  },
  assets: {
    source: '_resources',
    build: '_posts/assets',
  },
  server: {
    port: 4000,
    notify: true,
    open: true,
  },
  styles: {
    prefix: [
      // For more browsers, see https://github.com/ai/browserslist
      '> 1%',
      'last 3 versions',
      'IE >= 9',
    ],
    include: [
      // 'node_modules',
      // 'bower_components'
    ],
  },
  scripts: {
    webpack: {
      watch: false,
      // entry: {},
      // output: {},
      // plugins: []
    },
  },
  html: {
    minify: {
      // For more options, see https://github.com/kangax/html-minifier
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
    },
  },
};
