"use strict";

// Gulp
var gulp = require('gulp');

// Plugins
var gutil = require('gulp-util');
var sass = require('gulp-sass');
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
var watching = false;

// Paths
var paths = {
  scripts: ['assets/js/*.js'],
  images: ['assets/img/**'],
  icons: ['assets/icons/*.svg']
};

var devnull = function () {
  var stream = new WritableStream({
    objectMode: true
  });
  stream._write = function (chunk, encoding, callback) {
    callback();
  };
  return stream;
};

var liveReloadifWatching = function () {
  if (watching) {
    return livereload();
  } else {
    return devnull();
  }
};

// Compile Sass
gulp.task('sass', function () {
  gulp.src(['assets/scss/*.scss', '!assets/scss/_variables.scss'])
    .pipe(plumber())
    .pipe(sass({
      sourceComments: 'map'
    }))
    .pipe(prefix(
      "last 1 version", "> 1%", "ie 8", "ie 7"
    ))
    .pipe(gulp.dest(outputDir + '/assets/css'))
    .pipe(minifycss())
    .pipe(gulp.dest(outputDir + '/assets/css'))
    .pipe(liveReloadifWatching());
});

// Uglify JS
gulp.task('uglify', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(gulp.dest(outputDir + '/assets/js'))
    .pipe(liveReloadifWatching());
});

// Copy images.
gulp.task('copyimages', function () {
  gulp.src(paths.images)
    .pipe(gulp.dest(outputDir + '/assets/img'));
});

gulp.task('sprites', function () {
  gulp.src(paths.icons)
    .pipe(svg({
      className: ".%f-icon",
      cssFile: "../../../assets/sprites/_sprites.scss",
      preview: {
        svgSprite: "sprites/preview-svg-sprite.html"
      }
    }))
    .pipe(gulp.dest(outputDir + '/assets'));
});

// Watch files
gulp.task('watch', function (event) {
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch(paths.images, ['copyimages']);
  gulp.watch(paths.icons, ['sprites']);
  gulp.watch(paths.scripts, ['uglify']);

  watching = true;
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js'
  })
    .on('restart', function () {
      console.log('restarted node');
    });
});

gulp.task('build', ['sprites', 'sass', 'uglify', 'copyimages']);
gulp.task('default', ['build', 'watch', 'server']);