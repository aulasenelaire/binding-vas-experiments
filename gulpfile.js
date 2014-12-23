// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var webserver = require('gulp-webserver');

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

/**
 * Optimize and move all images from app to dist
 */
gulp.task('copy', function () {
  gulp.src('./src/index.html').pipe(gulp.dest('./public'));
  gulp.src(['./src/fonts/**/*']).pipe(gulp.dest('./public/fonts'));
  gulp.src(['./src/images/**/*']).pipe(gulp.dest('./public/images'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./src/javascripts/app.js')
    .pipe(
      browserify({
        insertGlobals : false,
        debug : true, //enable source maps
        transform: [reactify, es6ify]
      })
    )
    .pipe(gulp.dest('./public/js/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch('./src/javascripts/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// Not used. Serving assets from Sinatra app
// gulp.task('webserver', function() {
//   gulp.src('public')
//     .pipe(webserver({
//       livereload: false,
//       directoryListing: false,
//       open: false,
//       fallback: 'index.html'
//     }));
// });

// Default Task
gulp.task('default', ['copy', 'scripts', 'sass', 'watch']);
