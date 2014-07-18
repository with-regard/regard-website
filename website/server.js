'use strict';

var express = require('express');
var pages = require('./routes/pages.js');
var signup = require('./routes/signup.js');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', pages.index);
app.get('/about', pages.about);
app.get('/blog', pages.blog);
app.post('/signup', signup.sendToMailchimp);
app.get('/signup', function (req, res) {
  res.redirect('/');
});
app.get('/not-supported', pages.safari);

module.exports = app;
