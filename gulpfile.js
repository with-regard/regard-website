"use strict";

// Gulp
var gulp = require('gulp');

// Plugins
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var path = require('path');
var tinylr = require('tiny-lr');
var WritableStream = require('stream').Writable;
var svgSprites = require('gulp-svg-sprites');
var svg = svgSprites.svg;
var png = svgSprites.png;

var outputDir = 'website/dist';

// Paths
var paths = {
  scripts: ['assets/js/*.js'],
  images: ['assets/img/**'],
  icons: ['assets/icons/*.svg']
};

// Uglify JS
gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(gulp.dest(outputDir + '/assets/js'))
});

// Copy images.
gulp.task('copyimages', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(outputDir + '/assets/img'));
});

gulp.task('sprites', function () {
  return gulp.src(paths.icons)
    .pipe(svg({
      className: ".%f-icon",
      cssFile: "_sprites.scss"
    }))
    .pipe(gulp.dest('assets/scss'))
    .pipe(png())
});

// Watch files
gulp.task('watch', function (event) {
  gulp.watch(paths.images, ['copyimages']);
  gulp.watch(paths.icons, ['sprites']);
  gulp.watch(paths.scripts, ['uglify']);
});

gulp.task('server', ['build'], function (cb) {
  var productConfig = require('./development-config.json');

  if (productConfig['port'] === -1) {
      console.log('You need to have a product config defined');
      process.exit(-1);
  }

  nodemon({
    script: 'server.js',
    env: productConfig
  })
    .on('restart', function () {
      console.log('restarted node');
    });
});

gulp.task('azure-exit', ['build'], function (cb) {
	process.exit(0);
	cb(err);
});

gulp.task('build', ['uglify', 'copyimages']);
gulp.task('azure', ['azure-exit']);
gulp.task('default', ['sprites', 'server', 'watch']); //there is a race condition here so it will probably fail the first time
