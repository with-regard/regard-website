var express = require('express');
var app = express();

app.use('/dashboard', express.static(__dirname + '/dist'));

app.get('/dashboard/*', function (req, res, next) {
  res.sendfile('index.html', { root: __dirname + '/dist' });
});

module.exports = app;
