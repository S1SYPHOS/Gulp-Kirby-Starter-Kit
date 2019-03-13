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
  {watch} = require('./tasks/watch.js'),

  build = parallel(styles, scripts, images, fonts)
;


/*
---------------------------------------
II. Bringing together the best of all possible worlds
---------------------------------------
*/

module.exports = {
  styles: styles,
  scripts: scripts,
  images: images,
  fonts: fonts,
  build: build,

  default: series(
    build,
    parallel(
      watch,
      server
    )
  ),
};
