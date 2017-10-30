'use strict';

/*
---------------------------------------
I. Prerequisites
---------------------------------------
*/

var
  babel         = require('gulp-babel'),
  browserSync   = require('browser-sync').init,
  cache         = require('gulp-memory-cache'),
  changed       = require('gulp-changed'),
  config        = require('./config'),
  connect       = require('gulp-connect-php'),
  development   = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'),
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



/*
---------------------------------------
II. Assets
---------------------------------------
*/


/*
 * 1. Styles
 *
 * `gulp lint:styles` - lints styles using stylelint (config under 'stylelint' in package.json)
 * `gulp make:styles` - compiles sass into css & minifies it (production)
*/

gulp.task('lint:styles', function() {

  return gulp.src([config.assets.source + '/styles/**/*.scss', '!source/styles/vendor/**/*.scss'], {since: gulp.lastRun('lint:styles')})
    .pipe(postcss([
      // For more options, see http://stylelint.io/user-guide/example-config/
      stylelint(),
      reporter({clearMessages: true})
    ], {syntax: syntax_scss}))
  ;
});

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
    prefix({browsers: config.styles.prefix})
  ]))
  .pipe(gulpif(!development, minify()))
  .pipe(size({gzip: true, showFiles: true}))
  .pipe(gulp.dest(config.assets.build + '/styles'))
  .pipe(browserSync.stream())
  ;
});

gulp.task('styles', gulp.series(
  'lint:styles',
  'make:styles'
));


/*
 * 2. Scripts
 *
 * `gulp lint:scripts` - lints javascript using eslint & caches results (config under eslintConfig in package.json)
 * `gulp make:scripts` - compiles / concatenates javascript & minifies it (production)
 *
 */

gulp.task('lint:scripts', function() {
  return gulp.src(config.assets.source + '/scripts/**/*.js', {since: gulp.lastRun('lint:scripts')})
  // For more options, see http://eslint.org/docs/rules/
  // For more environments, see http://eslint.org/docs/user-guide/configuring.html#specifying-environments
  .pipe(eslint())
  .pipe(eslint.format())
});

gulp.task('make:scripts', function() {

  return gulp.src(config.assets.source + '/scripts/main.js')
    .pipe(named())
    .pipe(webpack({watch: false}))
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulpif(!development, uglify()))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(config.assets.build + '/scripts'))
    .pipe(browserSync.stream())
  ;
});

gulp.task('scripts', gulp.series(
  'lint:scripts',
  'make:scripts'
));


/*
 * 3. Images
 *
 * `gulp images` - compressing images (unless they already got compressed)
 */

gulp.task('images', function() {
  return gulp.src(config.assets.source + '/images/**/*')
   .pipe(changed(config.assets.build + '/images'))
   .pipe(imagemin({
      progressive: true,
      use: [pngquant()],
   }))
   .pipe(size({showFiles: true}))
   .pipe(gulp.dest(config.assets.build + '/images'))
   .pipe(browserSync.stream())
  ;
});


/*
 * 4. Fonts
 *
 * `gulp fonts`
 */

gulp.task('fonts', function () {
  return gulp.src(config.assets.source + '/fonts/**/*')
    .pipe(changed(config.assets.build + '/fonts'))
    .pipe(gulp.dest(config.assets.build + '/fonts'))
    .pipe(browserSync.stream())
  ;
});


/*
 * 5. Fonts
 *
 * `gulp build` - compiles & collects all assets simultaneously
 */

gulp.task('build', gulp.parallel(
  'styles',
  'scripts',
  'images',
  'fonts'
));



/*
---------------------------------------
III. Development / Deployment
---------------------------------------
*/


/*
 * 1. Development Server
 *
 * gulp server - starts a local development server, using php & live-reload via browsersync
 */

gulp.task('connect', function() {
  connect.server({base: config.paths.build});
});

gulp.task('browsersync', function() {
  browserSync.init(config.server);
});

gulp.task('server', gulp.parallel(
  'connect',
  'browsersync'
));


/*
 * 2. Monitoring
 *
 * `gulp watch` - watches for changes, recompiles & injects assets
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

gulp.task('watch:fonts', function() {
  gulp.watch(
    config.assets.source + '/fonts/**/*',
    gulp.series('fonts')
  );
});

gulp.task('watch:code', function() {

  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload(done) {
    browserSync.reload();
    done();
  }

  gulp.watch([
    config.paths.build + '/site/**/*.{php,yml,txt}',
    'gulpfile.js',
    'config.js',
    ], gulp.series(reload));
});

gulp.task('watch', gulp.parallel(
  'watch:styles',
  'watch:scripts',
  'watch:images',
  'watch:fonts',
  'watch:code'
));



/*
 * 3. Deployment
 *
 * `gulp deploy` - pushes site content onto a remote repository
 */

 // gulp.task('deploy', function() {
 //   return gulp.src(config.paths.build + '/**/*')
 //
 // });



/*
---------------------------------------
IV. The best of all possible worlds
---------------------------------------
*/

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'server',
    'watch'
  )
));
