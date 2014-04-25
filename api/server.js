"use strict";

var express = require('express');
var compress = require('compression')();
var bodyParser = require('body-parser')();
var api = require('./modules/api.js');
var errorHandler = require('./modules/errorHandler.js');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Allow CORs
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Configuration
app.use(compress);
app.use(bodyParser);
app.use('/v1', api);
app.use(errorHandler);

// Routes
app.get('/', function (req, res) {
  res.send('Regard website api running');
});

module.exports = app;