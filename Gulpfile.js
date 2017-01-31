'use strict';

var
  browserSync   = require('browser-sync').create(),
  cache         = require('gulp-memory-cache'),
  changed       = require('gulp-changed'),
  config        = require('./config'),
  eslint        = require('gulp-eslint'),
  gulp          = require('gulp'),
  gulpif        = require('gulp-if'),
  imagemin      = require('gulp-imagemin'),
  minify        = require('gulp-clean-css'),
  named         = require('vinyl-named'),
  plumber       = require('gulp-plumber'),
  pngquant      = require('imagemin-pngquant'),
  postcss       = require('gulp-postcss'),
  prefix        = require('autoprefixer'),
  reporter      = require('postcss-reporter'),
  sass          = require('gulp-sass'),
  size          = require('gulp-size'),
  stylelint     = require('stylelint'),
  syntax_scss   = require('postcss-scss'),
  uglify        = require('gulp-uglify'),
  webpack       = require('webpack-stream')
;



// STYLES

/*
* `gulp lint:styles` - lints styles using stylelint (config under 'stylelint' in package.json)
*/

gulp.task('lint:styles', function() {

  return gulp.src(config.assets.source + '/styles/**/*.scss', { since: gulp.lastRun('lint:styles') })
   .pipe(postcss([
  // For more options, see http://stylelint.io/user-guide/example-config/
   stylelint(),
   reporter({ clearMessages: true })
  ], { syntax: syntax_scss }));
});


/*
 * `gulp make:styles` - compiles sass into css & minifies it (production)
 */

gulp.task('make:styles', function() {

  var onError = function(err) {
   console.log(err);
   this.emit('end');
  };

  return gulp.src(config.assets.source + '/styles/*.scss')
   .pipe(plumber({ errorHandler: onError }))
   .pipe(sass({
  precision: 10, // https://github.com/sass/sass/issues/1122
  includePaths: config.styles.include
   }))
   .pipe(postcss([
  prefix({ browsers: config.styles.prefix })
   ]))
   .pipe(gulpif(!config.envDev, minify()))
   .pipe(size({ gzip: true, showFiles: true }))
   .pipe(gulp.dest(config.assets.build + '/styles'))
   .pipe(browserSync.stream())
  ;
});

gulp.task('styles', gulp.series(
  'lint:styles',
  'make:styles'
));



// SCRIPTS

/*
 * `gulp lint:scripts` - lints javascript using eslint & caches results (config under eslintConfig in package.json)
 */

gulp.task('lint:scripts', function() {
  return gulp.src(config.assets.source + '/scripts/**/*.js', { since: gulp.lastRun('lint:scripts') })
   // For more options, see http://eslint.org/docs/rules/
   // For more environments, see http://eslint.org/docs/user-guide/configuring.html#specifying-environments
   .pipe(eslint())
   .pipe(eslint.format())
});


/*
 * `gulp make:scripts` - compiles / concatenates javascript & minifies it (production)
 */

gulp.task('make:scripts', function() {

  if (config.enable.webpack) {

    // Array of used webpack plugins
    var webpackPlugins = [];

    return gulp.src(config.assets.source + '/scripts/scripts.js')
      .pipe(named())
      .pipe(webpack(config.scripts.webpack))
      .pipe(gulpif(!config.metadata.envDev, uglify()))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(config.assets.build + '/scripts'))
      .pipe(browserSync.stream())
    ;

  } else {

    return gulp.src(config.assets.source + '/scripts/*.js', { since: cache.lastMtime('concatJS') })
      .pipe(cache('concatJS'))
      .pipe(concat('scripts.js'))
      .pipe(gulpif(!config.envDev, uglify()))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(config.assets.build + '/scripts'))
      .pipe(browserSync.stream())
    ;
  }
  });

gulp.task('scripts', gulp.series(
  'lint:scripts',
  'make:scripts'
));



// IMAGES

/*
 * `gulp images` - compressing images (unless they already got compressed)
 */

gulp.task('images', function () {
  return gulp.src(config.assets.source + '/images/**/*')
   .pipe(changed(config.assets.build + '/images'))
   .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
   }))
   .pipe(size({ showFiles: true }))
   .pipe(gulp.dest(config.assets.build + '/images'))
   .pipe(browserSync.stream())
  ;
});



// FONTS

/*
 * `gulp fonts`
 */

gulp.task('fonts', function () {
  return gulp.src(config.assets.source + '/fonts/**/*')
    .pipe(changed(config.assets.build + '/fonts'))
    .pipe(gulp.dest(config.assets.build + '/fonts'))
    .pipe(browserSync.stream())
  ;
});



// HTML

/*
 * `gulp html` - runs the Metalsmith build script to build the site
 */

gulp.task('html', function (cb) {
  exec('node ./index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})



// SERVER

/*
 * gulp server - starts a local development server
 */

gulp.task('server', function() {
 browserSync.init({
   server: {
     baseDir: config.paths.build,
   },
   port: config.server.port,
   notify: config.server.notify,
   open: config.server.open,
 });
});


// WATCH TASKS

/*
 * `gulp watch` - watches for changes, recompiles & injects html + assets
 */

gulp.task('watch:styles', function() {
  gulp.watch(
  config.assets.source + '/styles/**/*.scss',
  gulp.series('styles')
  );
});

gulp.task('watch:scripts', function() {
  gulp.watch(
  config.assets.source + '/scripts/**/*.js',
  gulp.series('scripts')
  );
});

gulp.task('watch:images', function() {
  gulp.watch(
  config.assets.source + '/images/**/*',
  gulp.series('images')
  );
 });

gulp.task('watch:code', function() {

  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload(done) {
    browserSync.reload();
    done();
  };

  gulp.watch([
  '_posts/**/*',
  '_layouts/**/*',
  'gulpfile.js',
  'config.js',
  ], gulp.series('html', reload));
});

gulp.task('watch', gulp.parallel(
  'watch:styles',
  'watch:scripts',
  'watch:images',
  'watch:code'
));



// DEPLOY

/*
 * `gulp deploy` - pushes site content onto a remote repository
 */

 // gulp.task('deploy', function() {
 //   return gulp.src(config.paths.build + '/**/*')
 //     .pipe(ghPages());
 // });



// GENERAL TASKS

gulp.task('assets', gulp.parallel(
  'styles',
  'scripts',
  'images'
));

gulp.task('build', gulp.series(
  'assets',
  'html'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'server',
    'watch'
  )
));
