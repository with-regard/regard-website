"use strict";

var express = require('express');
var api = require('./modules/projectController.js');
var errorHandler = require('./modules/errorHandler.js');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Configuration
app.use('/v1', api);
app.use(errorHandler);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

module.exports = app;