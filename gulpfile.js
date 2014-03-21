// Gulp
var gulp = require('gulp');

// Plugins
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var express = require('express');
var path = require('path');
var tinylr = require('tiny-lr');
var WritableStream = require('stream').Writable;

var outputDir = 'dist';
var serverPort = '3000';
var watching = false;

// Paths
var paths = {
  scripts: ['assets/js/*.js'],
  images: ['assets/img/**']
};

var devnull = function () {
  var stream = new WritableStream({
    objectMode: true
  });
  stream._write = function (chunk, encoding, callback) {
    callback();
  };
  return stream;
}

var liveReloadifWatching = function () {
  if (watching) {
    return livereload();
  } else {
    return devnull();
  }
}

// Compile Jade to HTML
gulp.task('jade', function () {
  gulp.src(['**/*.jade', '!./{node_modules/**, node_modules}'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(outputDir))
    .pipe(liveReloadifWatching());
});

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

// Watch files
gulp.task('watch', function (event) {
  gulp.watch('**/*.jade', ['jade']);
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch(paths.images, ['imagemin']);
  gulp.watch(paths.scripts, ['uglify']);

  watching = true;
});

gulp.task('server', function () {
  var app = express();
  app.use(express.static(outputDir));
  app.listen(serverPort, function () {
    gutil.log('Listening on', serverPort);
  });
});

gulp.task('build', ['jade', 'sass', 'uglify', 'copyimages']);
gulp.task('default', ['build', 'watch', 'server']);