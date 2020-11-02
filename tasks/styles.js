/*
---------------------------------------
Assets - Styles
---------------------------------------
*/

const
  {src, dest, series, parallel, lastRun} = require('gulp'),
  conf = require('../config'),

  browserSync = require('browser-sync').init,
  concat = require('gulp-concat'),
  fs = require('fs'),
  gulpif = require('gulp-if'),
  minify = require('gulp-clean-css'),
  penthouse = require('penthouse'),
  prefix = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  stylelint = require('gulp-stylelint')
;


/*
 * Lints styles using stylelint (config under 'stylelint' in package.json)
 */

function lintStyles() {
  const lintSource = [
    conf.src.styles + '/**/*.scss',
    '!' + conf.src.styles + '/vendor/**/*.scss',
  ];

  return src(lintSource, {since: lastRun(lintStyles)})
    // For more options, see http://stylelint.io/user-guide/example-config/
    .pipe(stylelint(conf.styles.linting))
    .pipe(gulpif(conf.styles.linting.fix == true, dest(conf.src.styles)))
  ;
}


/*
 * Compiles SASS files into CSS
*/

function makeStyles() {
  const stylesSource = [
    conf.src.styles + '/**/*.scss',
  ];

  return src(stylesSource, {sourcemaps: conf.sourcemaps.enable})
    .pipe(sass(conf.styles.sass).on('error', sass.logError))
    .pipe(prefix(conf.styles.prefix))
    .pipe(dest(conf.dist.styles, {sourcemaps: conf.sourcemaps.path}))
    .pipe(browserSync.stream())
  ;
}


/*
 * Extracts critical CSS (only used in production)
 */

function extractCritical(cb) {
  if (!fs.existsSync(conf.dist.critical)){
    fs.mkdirSync(conf.dist.critical);
  }

  const urls = conf.styles.critical.urls.map((url) => {
    return conf.styles.critical.base + url;
  });

  urls.push(conf.styles.critical.base);

  const extractCSS = () => {
    const url = urls.pop();

    if (!url) {
      return Promise.resolve();
    }

    const list = url.split('/');
    let identifier = list[list.length - 1];

    if (urls.length === 0) {
      identifier = 'index';
    }

    return penthouse({
      url,
      ...conf.styles.critical.penthouse
    })
    .then((criticalCSS) => {
      fs.writeFileSync(conf.dist.critical + '/' + identifier + '.css', criticalCSS);

      return extractCSS();
    })
  }

  Promise.all([
    extractCSS(),
    extractCSS(),
    extractCSS(),
    extractCSS(),
    extractCSS(),
  ]).then(() => {
    src(conf.dist.critical + '/*.css')
      .pipe(concat('critical.css'))
      .pipe(minify(conf.styles.minify))
      .pipe(dest(conf.dist.styles))
    ;
  });

  cb();
}


/*
 * Minifies stylesheets (only used in production)
 */

function minifyStyles() {
  const minifySource = [
    conf.dist.styles + '/**/*.css',
  ];

  return src(minifySource, {sourcemaps: conf.sourcemaps.enable})
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(conf.dist.styles, {sourcemaps: conf.sourcemaps.path}))
  ;
}


/*
 * Exports
 */

if (conf.styles.critical.enable && process.env.NODE_ENV === 'production') {
  exports.styles = series(
    makeStyles,
    parallel(minifyStyles, extractCritical)
  );
} else if (process.env.NODE_ENV === 'production') {
  exports.styles = series(makeStyles, minifyStyles);
} else {
  exports.styles = series(lintStyles, makeStyles);
}
