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
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var express = require('express');
var path = require('path');
var tinylr = require('tiny-lr');

var outputDir = 'dist';
var serverPort = '3000';

// Paths
var paths = {
  scripts: ['assets/js/*.js'],
  images: ['assets/img/**']
};

// Compile Jade to HTML
gulp.task('jade', function () {
  gulp.src(['**/*.jade', '!./{node_modules/**, node_modules}'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(outputDir))
    //.pipe(livereload());
});

// Compile Sass
gulp.task('sass', function () {
  gulp.src(['assets/scss/*.scss', '!assets/scss/_variables.scss'])
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['assets/scss'],
      outputStyle: 'expanded'
    }))
    .pipe(prefix(
      "last 1 version", "> 1%", "ie 8", "ie 7"
    ))
    .pipe(gulp.dest(outputDir + '/assets/css'))
    .pipe(minifycss())
    .pipe(gulp.dest(outputDir + '/assets/css'))
    //.pipe(livereload());
});

// Uglify JS
gulp.task('uglify', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(gulp.dest(outputDir + '/assets/js'))
    //.pipe(livereload());
});

// Compress images.
gulp.task('imagemin', function () {
  gulp.src(paths.images)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(outputDir + '/assets/img'));
});

// Watch files
gulp.task('watch', function (event) {
  gulp.watch('**/*.jade', ['jade']);
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch(paths.images, ['imagemin']);
  gulp.watch(paths.scripts, ['uglify']);
});

gulp.task('server', function () {
  var app = express();
  app.use(express.static(outputDir));
  app.listen(serverPort, function () {
    gutil.log('Listening on', serverPort);
  });
});

gulp.task('build', ['jade', 'sass', 'uglify']);
gulp.task('default', ['build', 'watch', 'server']);