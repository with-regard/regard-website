"use strict";

var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var app = express();
var secret = process.env.COOKIE_SECRET || 'secret';

app.use(cookieParser(secret));
app.use(cookieSession({
  keys: [secret],
}));

// Routes
app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendfile('index.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});

app.get('/user', function(req, res){
  res.json(req.user);
});

app.use(express.static(__dirname + '/js'));

module.exports = app;