"use strict";

var express = require('express');
var compress = require('compression')();
var requireSSLinProduction = require('./modules/requireSSLinProduction.js');
var bodyParser = require('body-parser')();
var errorHandler = require('errorhandler');

var regardUserStore = require('./modules/regard-user-store.js');
var auth = require('regard-authentication');
var userData = require('./modules/userData.js');
var website = require('./website/server.js');

var app = express();

app.use(compress);
app.use(requireSSLinProduction);
app.use(bodyParser);

app.use(auth(regardUserStore));
app.use(userData);

app.get('/dashboard*', function (req, res, next) {
  res.sendfile('index.html', { root: __dirname + '/dist' });
});

app.use(website);

app.use(express.static(__dirname + '/dist'));
//app.use(pages.notFound);

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.listen(process.env.port);
console.log("Regard website started on " + process.env.port);
