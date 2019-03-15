/*
---------------------------------------
Monitoring
---------------------------------------
*/

const
  {watch, parallel} = require('gulp'),
  conf = require('../config'),

  {styles} = require('./styles.js'),
  {scripts} = require('./scripts.js'),
  {images} = require('./images.js'),
  {fonts} = require('./fonts.js'),

  browserSync = require('browser-sync').init
;


/*
 * See https://github.com/BrowserSync/browser-sync/issues/711
 */

function reload(done) {
  browserSync.reload();
  done();
}


/*
 * Watches for changes, recompiles & injects assets
 */

function watchStyles() {
  watch(conf.src.styles + '/**/*.scss', styles);
}

function watchScripts() {
  watch(conf.src.scripts + '/**/*.js', scripts);
}

function watchImages() {
  watch(conf.src.images + '/**/*', images);
}

function watchFonts() {
  watch(conf.src.fonts + '/**/*', fonts);
}

function watchCode() {
  watch(conf.watch.code, reload);
}


/*
 * Exports
 */

exports.watch = parallel(
  watchStyles,
  watchScripts,
  watchImages,
  watchFonts,
  watchCode
);
