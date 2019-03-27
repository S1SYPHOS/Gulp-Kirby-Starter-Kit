/*
---------------------------------------
Assets - Fonts
---------------------------------------
*/

const
  {src, dest, series, parallel, lastRun} = require('gulp'),
  conf = require('../config'),

  subsetSrc = conf.src.fonts + '/subset',
  subsetDist = conf.dist.fonts + '/subset',

  browserSync = require('browser-sync').init,
  del = require('del'),
  {execSync} = require('child_process'),
  flatten = require('gulp-flatten')
;


/*
 * Copies fonts - well, that's it
 */

function copyFonts() {
  const filetypes = conf.fonts.allowed.join(',');
  const fontSource = [
    conf.src.fonts + '/**/*.{' + filetypes + '}',
    '!' + subsetSrc + '/**/*',
  ];

  return src(fontSource, {since: lastRun(copyFonts)})
    .pipe(flatten())
    .pipe(dest(conf.dist.fonts))
    .pipe(browserSync.stream())
  ;
}


/*
 * Subsets fonts for smaller filesize
 */

function subsetFonts(cb) {
  const option = conf.subsetting;
  const command = [
    './node_modules/.bin/glyphhanger ',
    '--subset=' + subsetSrc + '/*.ttf',
    option.urls.join(' '),
    option.formats ? '--formats=' + option.formats.join(',') : '',
    option.spider ? '--spider' : '',
    option.whitelist ? '--whitelist=' + option.whitelist : '',
    option.latin ? '--LATIN' : '',
    option.us_ascii ? '--US_ASCII' : '',
    option.output_css ? '--css' : '',
    option.css_selector ? '--cssSelector="' + option.css_selector + '"' : '',
    '--output=' + subsetDist,
    '> ' + subsetSrc + '/result.log',
  ];

  execSync('mkdir -p ' + subsetDist);
  execSync(command.filter(Boolean).join(' '));
  cb();
}


/*
 * Copies generated font styles to CSS directory
 */

function copyStyles() {
  return src(subsetDist + '/*.css')
    .pipe(dest(conf.dist.styles));
}


/*
 * Removes CSS files from fonts folder
 */

function removeCSS() {
  return del(subsetDist + '/*.css');
}


/*
 * Exports
 */

if (conf.subsetting.enable && process.env.NODE_ENV === 'production') {
  exports.fonts = parallel(
    copyFonts,
    series(subsetFonts, copyStyles, removeCSS)
  );
} else {
  exports.fonts = copyFonts;
}
