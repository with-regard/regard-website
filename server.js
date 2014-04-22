"use strict";

var express = require('express'),
  pages = require('./routes/pages.js'),
  signup = require('./routes/signup.js'),
  flash = require('connect-flash'),
  auth = require('./modules/auth.js'),
  api = require('./modules/api.js'),
  mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Configuration
var secret = process.env.COOKIE_SECRET || 'secret';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.compress());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser(secret));
app.use(express.session({
  secret: secret,
  cookie: {
    httpOnly: true
  }
}));

app.use(auth);
app.use(flash());

if (app.get('env') === 'development') {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
} else {
  app.use(express.errorHandler());
}

// Routes

app.get('/', pages.index);
app.get('/contact', pages.contact);
app.get('/login', pages.login);

app.post('/signup', signup.sendToMailchimp);


app.use(express.static(__dirname + '/dist'));

// Go

app.listen(process.env.port || 3000);
console.log("Express server started");