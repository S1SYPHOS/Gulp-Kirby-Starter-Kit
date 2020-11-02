const
  src = 'source/',
  dist = 'assets/',
  pkg = require('./package.json'),

  localURL = 'http://localhost:4000',
  faviconSnippet = 'favicon.html',

  pngquant = require('imagemin-pngquant')
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
    critical: dist + 'styles/critical',
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
    },
    critical: {
      enable: false,
      base: localURL,
      urls: [
        // '/some-url',
        // '/another-url',
      ],
      penthouse: {
        // The CSS file containg styles being scanned by critical CSS library `penthouse`
        css: dist + 'styles/main.css',
      },
    },
  },
  scripts: {
    input: 'main.js', // Place it in your `src` + `scripts` directory
    linting: {}, // For more options, see https://github.com/adametry/gulp-eslint#eslintoptions
    webpack: {
      mode: 'none',
      watch: false,
    },
    babel: {
      presets: ['@babel/preset-env'],
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
  fonts: {
    allowed: ['ttf', 'woff', 'woff2'], // For example, generating from OTF without shipping source files
  },
  server: {
    enable: true,
    connect: {
      // For more options, see https://github.com/micahblu/gulp-connect-php#options
      base: '.',
      router: 'kirby/router.php',
    },
  },
  browsersync: {
    // For more options, see https://browsersync.io/docs/options
    proxy: localURL,
    port: 4000,
    notify: true,
    open: true,
    online: false,
  },
  watch: {
    code: [
      'site/**/*.{php,yml}',
      'content/**/*',
    ],
  },
  sourcemaps: {
    enable: true,
    path: '.', // This defaulfs to `dist` + `styles` & `dist` + `scripts`
  },
  favicons: {
    enable: false,
    input: 'favicon.svg', // Place it in your `src` + `images` directory
    snippet: faviconSnippet,
    options: {
      // For more options, see https://github.com/itgalaxy/favicons
      appName: 'Gulp v4 - Kirby CMS - Starter',
      appShortName: 'Gulp+Kirby Starterkit',
      // The following are taken from `package.json` to prevent duplicate code
      appDescription: pkg.description,
      url: pkg.homepage,
      version: pkg.version,
      background: '#fafafa',
      start_url: '/',
      pipeHTML: true,
      html: '../../../site/snippets/generated/' + faviconSnippet,
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
  subsetting: {
    // For more options, see https://github.com/filamentgroup/glyphhanger
    enable: true,
    urls: [
      // In combination with `spider: true`, this should be sufficient:
      localURL, // Browsersync source
      // Otherwise, add as many local/external files & URLs as you like:
      // pkg.homepage,
      // 'http://example.com',
      // './example.html'
    ],
    formats: ['woff'], // Available formats: 'ttf', 'woff', 'woff-zopfli', 'woff2'
    spider: false,
    whitelist: false,
    us_ascii: false,
    latin: false,
    output_css: true,
    css_selector: false,
  },
};
