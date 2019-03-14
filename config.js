const
  pngquant = require('imagemin-pngquant'),
  pkg = require('./package.json'),
  src = 'source/',
  dist = 'assets/',
  snippet = 'favicon.html'
;

module.exports = {
  src: {
    styles: src + 'styles',
    scripts: src + 'scripts',
    images: src + 'images',
    icons: src + 'images/icons',
    fonts: src + 'fonts',
  },
  dist: {
    styles: dist + 'styles',
    scripts: dist + 'scripts',
    images: dist + 'images',
    icons: dist + 'images',
    fonts: dist + 'fonts',
  },
  styles: {
    linting: {
      // For more options, see https://github.com/olegskl/gulp-stylelint#formatters
      fix: false,
      failAfterError: false,
      reporters: [{
        formatter: 'string',
        console: true,
      }],
    },
    sass: {
      // For more options, see https://github.com/sass/node-sass#options
      precision: 10, // https://github.com/sass/sass/issues/1122
      includePaths: ['node_modules'],
    },
    prefix: {
      // For more options, see https://github.com/postcss/autoprefixer#options
      browsers: [
        // For more browsers, see https://github.com/ai/browserslist
        '> 1%',
        'last 3 versions',
        'IE >= 9',
      ],
    },
  },
  scripts: {
    input: 'main.js', // Place it in your `src` + `scripts` directory
    linting: {}, // For more options, see https://github.com/adametry/gulp-eslint#eslintoptions
    webpack: {
      watch: false,
    },
  },
  images: {
    allowed: ['png', 'jpg'],
    minify: {
      progressive: true,
      use: [pngquant()],
    },
  },
  icons: {
    minify: {}, // For more options, see https://github.com/ben-eb/gulp-svgmin#plugins
    output: 'icons.svg', // SVG sprite filename
    inline: false,
  },
  server: {
    router: 'kirby/router.php',
    debug: true,
  },
  browsersync: {
    proxy: '127.0.0.1:8000',
    port: 4000,
    notify: true,
    open: true,
    online: false,
  },
  favicons: {
    enable: false,
    input: 'favicon.svg', // Place it in your `src` + `images` directory
    snippet: snippet,
    options: {
      // For more options, see https://github.com/itgalaxy/favicons
      appName: 'Gulp v4 - Kirby CMS - Starter',
      appShortName: 'Gulp+Kirby Starterkit',
      appDescription: pkg.description,
      url: pkg.homepage,
      version: pkg.version,
      background: '#fafafa',
      start_url: '/',
      pipeHTML: true,
      html: '../../../site/snippets/generated/' + snippet,
      icons: {
        // By default, only `android`, `appleIcon` & `windows` are enabled
        appleStartup: false,
        coast: false,
        favicons: false, // See https://forum.getkirby.com/t/how-to-make-a-proper-compressed-favicon-ico/2725
        firefox: false,
        yandex: false,
      },
    },
  },
};
