/*
---------------------------------------
Assets - Images & Icons
---------------------------------------
*/

const
  {src, dest, series, parallel, lastRun} = require('gulp'),
  conf = require('../config'),

  browserSync = require('browser-sync').init,
  favicons = require('gulp-favicons'),
  filter = require('gulp-filter'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  svg = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin')
;


/*
 * Minifies images losslessly
 */

function compressImages() {
  const filetypes = conf.images.allowed.join(',');
  const imagesSource = [
    conf.src.images + '/**/*.{' + filetypes + '}',
  ];

  return src(imagesSource, {since: lastRun(compressImages)})
    .pipe(imagemin(conf.images.minify))
    .pipe(dest(conf.dist.images))
    .pipe(browserSync.stream())
  ;
}


/*
 * Compresses SVG icons & combines them to a sprite
 */

function combineIcons() {
  const iconsSource = [
    conf.src.icons + '/**/*.svg',
  ];

  return src(iconsSource)
    .pipe(newer(conf.dist.icons))
    .pipe(svgmin(conf.icons.minify))
    .pipe(svg({inlineSvg: conf.icons.inline})) // See https://github.com/w0rm/gulp-svgstore#options
    .pipe(rename(conf.icons.output))
    .pipe(dest(conf.dist.icons));
}


/*
 * Generates a set of favicons (only used in production & when enabled, see `config.js#favicons.enable`)
 */

function createFavicons() {
  const snippet = filter('**/' + conf.favicons.snippet, {restore: true});
  const faviconSource = conf.src.images + '/' + conf.favicons.input;

  return src(faviconSource)
    .pipe(favicons(conf.favicons.options))
    .pipe(snippet)
    .pipe(rename({extname: '.php'}))
    .pipe(snippet.restore)
    .pipe(dest(conf.src.images + '/favicons'));
}


/*
 * Exports
 */

if (conf.favicons.enable && process.env.NODE_ENV === 'production') {
  exports.images = parallel(
    combineIcons,
    series(createFavicons, compressImages)
  );
} else {
  exports.images = parallel(
    combineIcons,
    compressImages
  );
}
