'use strict';

/*
---------------------------------------
I. Prerequisites
---------------------------------------
*/

const
  {series, parallel} = require('gulp'),
  {styles} = require('./tasks/styles.js'),
  {scripts} = require('./tasks/scripts.js'),
  {images} = require('./tasks/images.js'),
  {fonts} = require('./tasks/fonts.js'),
  {server} = require('./tasks/server.js'),
  {watch} = require('./tasks/watch.js')
;

/*
---------------------------------------
II. Bringing together the best of all possible worlds
---------------------------------------
*/

exports.build = parallel(styles, scripts, images, fonts);

module.exports = {
  styles: styles,

  default: series(
    exports.build,
    parallel(
      watch,
      server
    )
  ),
};

// exports.build = parallel(styles, scripts, images, fonts);
//
// exports.default = ;
