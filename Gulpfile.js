'use strict';

/*
---------------------------------------
I. Prerequisites
---------------------------------------
*/

const
  {series, parallel} = require('gulp'),

  {styles} = require('./tasks/styles'),
  {scripts} = require('./tasks/scripts'),
  {images} = require('./tasks/images'),
  {fonts} = require('./tasks/fonts'),
  {server} = require('./tasks/server'),
  {watch} = require('./tasks/watch'),
  {build} = require('./tasks/build')
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
    build, parallel(
      watch,
      server
    )
  ),
};
