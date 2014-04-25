"use strict";

var express = require('express');
var bodyParser = require('body-parser')();
var compress = require('compression')();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var errorHandler = require('errorhandler');

var pages = require('./routes/pages.js');
var signup = require('./routes/signup.js');
var api = require('./api/server.js');
var portal = require('./portal/server.js');
var auth = require('./modules/auth.js');

var app = express();

// Configuration
var secret = process.env.COOKIE_SECRET || 'secret';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser);
app.use(compress);
app.use(cookieParser(secret));
app.use(cookieSession({
  keys: [secret],
}));

app.use(auth);
app.use('/api', api);
app.use('/portal', portal);

if (app.get('env') === 'development') {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
} else {
  app.use(errorHandler());
}

// Routes
app.get('/', pages.index);
app.get('/contact', pages.contact);
app.post('/signup', signup.sendToMailchimp);
app.get('/signup', function (req, res) {
  res.redirect('/');
});

app.use(express.static(__dirname + '/dist'));

// Go
app.listen(process.env.port || 3000);
console.log("Express server started");