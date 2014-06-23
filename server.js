"use strict";

var express = require('express');
var compress = require('compression')();
var requireSSLinProduction = require('./modules/requireSSLinProduction.js');
var bodyParser = require('body-parser')();
var errorHandler = require('errorhandler');

var regardUserStore = require('./modules/regard-user-store.js');
var auth = require('regard-authentication');
var userData = require('./modules/userData.js');
var dashboard = require('./dashboard/server.js');
var website = require('./website/server.js');

var app = express();

app.use(compress);
app.use(requireSSLinProduction);
app.use(bodyParser);

app.use(auth(regardUserStore));
app.use(userData);
app.use(dashboard);
app.use(website);

if (app.get('env') === 'development') {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
} else {
  app.use(errorHandler());
}

app.listen(process.env.port);
console.log("Express server started on " + process.env.port);
