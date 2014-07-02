"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var outputDir = 'website/dist';

gulp.task('server', function (cb) {
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

gulp.task('default', ['server']); //there is a race condition here so it will probably fail the first time
