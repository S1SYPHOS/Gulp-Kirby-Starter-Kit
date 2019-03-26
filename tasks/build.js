/*
---------------------------------------
Assets - Build
---------------------------------------
*/

const
  {series, parallel} = require('gulp'),
  conf = require('../config'),

  {styles} = require('./styles.js'),
  {scripts} = require('./scripts.js'),
  {images} = require('./images.js'),
  {fonts} = require('./fonts.js'),

  del = require('del')
;


/*
 * Cleans assets folder
 */

function clean() {
  return del(Object.values(conf.dist));
}


/*
 * Exports
 */

exports.build = series(
  clean, parallel(
    styles,
    scripts,
    images,
    fonts
  )
);
