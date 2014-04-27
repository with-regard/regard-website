'use strict';

var express = require('express');
var bodyParser = require('body-parser')();
var pages = require('./routes/pages.js');
var signup = require('./routes/signup.js');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser);

app.get('/', pages.index);
app.get('/contact', pages.contact);
app.post('/signup', signup.sendToMailchimp);
app.get('/signup', function (req, res) {
  res.redirect('/');
});

app.use(express.static(__dirname + '/dist'));

module.exports = app;