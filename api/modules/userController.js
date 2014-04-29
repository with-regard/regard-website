"use strict";

var express = require('express');
var User = require('../schemas/userSchema.js');

var app = express();

app.get('/users', function (req, res, next) {
  res.json({
    "users": [req.user]
  });
});

app.put('/users/:id', function (req, res, next) {
  User.findById(req.params.id).exec().then(function (user) {
    user.projects = req.body.user.projects;
    user.save();

    res.json({
      "user": user
    });
  }, next);
});

module.exports = app;