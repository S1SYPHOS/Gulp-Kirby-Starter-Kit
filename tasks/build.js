/*
---------------------------------------
Assets - Build
---------------------------------------
*/

const
  {series, parallel} = require('gulp'),
  {styles} = require('./styles.js'),
  {scripts} = require('./scripts.js'),
  {images} = require('./images.js'),
  {fonts} = require('./fonts.js'),
  conf = require('../config'),

  del = require('del')
;


/*
 * Cleans assets folder
 */

function clean() {
  return del([conf.assets + '/**/*']);
}


/*
 * Exports
 */

exports.build = series(
  clean,
  parallel(styles, scripts, images, fonts)
);
