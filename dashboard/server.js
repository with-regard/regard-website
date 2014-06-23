var express = require('express');
var app = express();
var dist = __dirname + '/dist';

// Routes
app.get('/dashboard', function (req, res, next) {
  res.sendfile('index.html', { root: dist });
});

app.use(express.static(dist));

module.exports = app;
