"use strict";

var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res){
  console.dir(req.user);
  res.sendfile('index.html', {root: __dirname })
});

app.use(express.static(__dirname + '/js'));

module.exports = app;