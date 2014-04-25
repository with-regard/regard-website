"use strict";

var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res){
  res.sendfile('index.html', {root: __dirname })
});

app.use(express.static(__dirname + '/portal/js'));

module.exports = app;