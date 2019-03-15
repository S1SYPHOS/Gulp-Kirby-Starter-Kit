/*
---------------------------------------
Assets - Styles
---------------------------------------
*/

const
  {src, dest, series, lastRun} = require('gulp'),
  conf = require('../config'),

  browserSync = require('browser-sync').init,
  gulpif = require('gulp-if'),
  minify = require('gulp-clean-css'),
  prefix = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  size = require('gulp-size'),
  stylelint = require('gulp-stylelint')
;


/*
 * Lints styles using stylelint (config under 'stylelint' in package.json)
 */

function lintStyles() {
  return src([conf.src.styles + '/**/*.scss', '!' + conf.src.styles + '/vendor/**/*.scss'], {since: lastRun(lintStyles)})
    // For more options, see http://stylelint.io/user-guide/example-config/
    .pipe(stylelint(conf.styles.linting))
    .pipe(gulpif(conf.styles.linting.fix == true, dest(conf.src.styles)))
  ;
}


/*
 * Compiles SASS files into CSS
*/

function makeStyles() {
  return src(conf.src.styles + '/*.scss', {sourcemaps: conf.styles.sourcemaps})
    .pipe(sass(conf.styles.sass).on('error', sass.logError))
    .pipe(prefix(conf.styles.prefix))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(dest(conf.dist.styles, {sourcemaps: '.'}))
    .pipe(browserSync.stream())
  ;
}


/*
 * Minifies stylesheets (only used in production)
 */

function minifyStyles() {
  return src(conf.dist.styles + '/*.css')
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(dest(conf.dist.styles))
  ;
}


/*
 * Exports
 */

if (process.env.NODE_ENV === 'production') {
  exports.styles = series(makeStyles, minifyStyles);
} else {
  exports.styles = series(lintStyles, makeStyles);
}
