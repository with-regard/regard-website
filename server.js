"use strict";

var express = require('express');
var compress = require('compression')();
var requireSSLinProduction = require('./modules/requireSSLinProduction.js');
var bodyParser = require('body-parser')();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var errorHandler = require('errorhandler');

var auth = require('./api/modules/auth.js');
var api = require('./api/server.js');
var portal = require('./portal/server.js');
var website = require('./website/server.js');

var app = express();
app.use(compress);
app.use(requireSSLinProduction);
app.use(bodyParser);

var secret = process.env.COOKIE_SECRET;

app.use(cookieParser(secret));
app.use(cookieSession({
  keys: [secret],
}));

app.use(auth);
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