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
  php.server(conf.server);
}

/*
 * Starts a live reload proxy via Browsersync
 */


function livereload() {
  browserSync.init(conf.browsersync);
}


exports.server = parallel(connect, livereload);
