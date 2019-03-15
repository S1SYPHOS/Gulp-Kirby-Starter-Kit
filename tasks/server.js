/*
---------------------------------------
Development / Deployment
---------------------------------------
*/

const
  {parallel} = require('gulp'),
  conf = require('../config'),

  browserSync = require('browser-sync').init,
  php = require('gulp-connect-php')
;


/*
 * Starts a local development server (using PHP)
 */

function connect() {
  php.server(conf.server.connect);
}


/*
 * Starts a live reload proxy via Browsersync
 */

function livereload() {
  browserSync.init(conf.browsersync);
}


/*
 * Exports
 */

if (conf.server.enable) {
  exports.server = parallel(
    connect,
    livereload
  );
} else {
  exports.server = livereload;
}
