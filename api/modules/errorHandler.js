'use strict';

var express = require('express');

var app = express();

function logErrors(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500);
    res.json({
      error: err
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.send(500);
}

app.use(function(req, res, next){
  res.send(404);
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = app;