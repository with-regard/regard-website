"use strict";

var express = require('express');
var bodyParser = require('body-parser')();
var compress = require('compression')();
var pages = require('./routes/pages.js');
var signup = require('./routes/signup.js');

var app = express();

// Configuration
var secret = process.env.COOKIE_SECRET || 'secret';

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser);
app.use(compress);

if (app.get('env') === 'development') {
  app.use(require('errorhandler')({
    dumpExceptions: true,
    showStack: true
  }));
} else {
  app.use(require('errorhandler')());
}

// Routes
app.get('/', pages.index);
app.get('/contact', pages.contact);
app.post('/signup', signup.sendToMailchimp);
app.get('/signup', function(req, res){
  res.redirect('/');
});

app.use(express.static(__dirname + '/dist'));

// Go
app.listen(process.env.port || 3000);
console.log("Express server started");