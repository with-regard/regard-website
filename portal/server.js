"use strict";

var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res){
  if(req.isAuthenticated()){
    console.dir(req.user);
    res.sendfile('index.html', {root: __dirname });
  } else {
    res.redirect('/login');
  }
});

app.use(express.static(__dirname + '/js'));

module.exports = app;