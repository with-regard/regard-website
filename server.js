"use strict";

var express = require('express');
var compress = require('compression')();
var requireSSLinProduction = require('./modules/requireSSLinProduction.js');
var bodyParser = require('body-parser')();
var errorHandler = require('errorhandler');

var regardUserStore = require('./modules/regard-user-store.js');
var auth = require('regard-authentication');
var api = require('./api/server.js');
var portal = require('./portal/server.js');
var website = require('./website/server.js');

var app = express();

app.use(compress);
app.use(requireSSLinProduction);
app.use(bodyParser);

app.use(auth(regardUserStore));
app.use('/api', api);
app.use('/portal', portal);
app.use('/', website);

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