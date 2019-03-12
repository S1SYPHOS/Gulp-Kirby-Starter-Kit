/*
---------------------------------------
Assets - Scripts
---------------------------------------
*/

const
  {src, dest, series, lastRun} = require('gulp'),
  conf = require('../config'),

  babel = require('gulp-babel'),
  browserSync = require('browser-sync').init,
  eslint = require('gulp-eslint'),
  gulpif = require('gulp-if'),
  isLive = (process.env.NODE_ENV) === 'production',
  named = require('vinyl-named'),
  rename = require('gulp-rename'),
  size = require('gulp-size'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack-stream')
;


/*
 * Lints javascript using eslint & caches results (config under eslintConfig in package.json)
 */

function lintScripts() {
  return src(conf.src.scripts + '/**/*.js', {since: lastRun(lintScripts)})
    .pipe(eslint(conf.scripts.linting))
    .pipe(eslint.format());
}

/*
 * Compiles and concatenates javascript & minifies it (production)
 */

function makeScripts() {
  return src(conf.src.scripts + '/' + conf.scripts.input)
    .pipe(named())
    .pipe(webpack(conf.scripts.webpack))
    .pipe(babel({presets: ['env']}))
    .pipe(gulpif(isLive, uglify()))
    .pipe(gulpif(isLive, rename({suffix: '.min'})))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(dest(conf.dist.scripts))
    .pipe(browserSync.stream())
  ;
}


exports.scripts = series(lintScripts, makeScripts);
