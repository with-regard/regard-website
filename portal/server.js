"use strict";

var express = require('express');
var app = express();

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