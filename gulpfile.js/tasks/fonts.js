/*
---------------------------------------
Assets - Fonts
---------------------------------------
*/

const
  {src, dest, lastRun} = require('gulp'),
  conf = require('../../config'),

  browserSync = require('browser-sync').init
;


/*
 * Copies fonts - well, that's it
 */

function copyFonts() {
  return src(conf.src.fonts + '/**/*', {since: lastRun(copyFonts)})
    .pipe(dest(conf.dist.fonts))
    .pipe(browserSync.stream())
  ;
}


exports.fonts = copyFonts;
