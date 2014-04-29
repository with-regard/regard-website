"use strict";

var express = require('express');
var projectController = require('./modules/projectController.js');
var investigationController = require('./modules/investigationController.js');
var errorHandler = require('./modules/errorHandler.js');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.all('*', function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(401);
  }
});

app.use('/v1', projectController);
app.use('/v1', investigationController);
app.use(errorHandler);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

module.exports = app;