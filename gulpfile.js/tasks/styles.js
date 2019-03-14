/*
---------------------------------------
Assets - Styles
---------------------------------------
*/

const
  {src, dest, series, lastRun} = require('gulp'),
  conf = require('../../config'),

  browserSync = require('browser-sync').init,
  gulpif = require('gulp-if'),
  isLive = (process.env.NODE_ENV) === 'production',
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
 * Compiles sass into css & minifies it (production)
*/

function makeStyles() {
  return src(conf.src.styles + '/*.scss')
    .pipe(sass(conf.styles.sass).on('error', sass.logError))
    .pipe(prefix(conf.styles.prefix))
    .pipe(gulpif(isLive, minify()))
    .pipe(gulpif(isLive, rename({suffix: '.min'})))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(dest(conf.dist.styles))
    .pipe(browserSync.stream())
  ;
}


/*
 * Exports
 */

exports.styles = series(lintStyles, makeStyles);
