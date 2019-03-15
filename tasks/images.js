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
  isLive = (process.env.NODE_ENV) === 'production',
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  size = require('gulp-size'),
  svg = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin')
;


/*
 * Minifies images losslessly
 */

function compressImages() {
  const filetypes = conf.images.allowed.join(',');

  return src([conf.src.images + '/**/*.{' + filetypes + '}'], {since: lastRun(compressImages)})
    .pipe(imagemin(conf.images.minify))
    .pipe(size({showFiles: true}))
    .pipe(dest(conf.dist.images))
    .pipe(browserSync.stream())
  ;
}


/*
 * Compresses SVG icons & combines them to a sprite
 */

function combineIcons() {
  return src(conf.src.icons + '/**/*.svg')
    .pipe(newer(conf.dist.icons))
    .pipe(svgmin(conf.icons.minify))
    .pipe(svg({inlineSvg: conf.icons.inline})) // See https://github.com/w0rm/gulp-svgstore#options
    .pipe(rename(conf.icons.output))
    .pipe(dest(conf.dist.icons));
}


/*
 * Generates a set of favicons (production)
 */

function createFavicons() {
  const snippet = filter('**/' + conf.favicons.snippet, {restore: true});

  return src(conf.src.images + '/' + conf.favicons.input)
    .pipe(favicons(conf.favicons.options))
    .pipe(snippet)
    .pipe(rename({extname: '.php'}))
    .pipe(snippet.restore)
    .pipe(dest(conf.src.images + '/favicons'));
}


/*
 * Exports
 */

if (conf.favicons.enable && isLive) {
  exports.images = parallel(
    combineIcons,
    series(
      createFavicons,
      compressImages
    )
  );
} else {
  exports.images = parallel(combineIcons, compressImages);
}
