"use strict";

var express = require('express');
var Project = require('../schemas/project.js');
var User = require('../schemas/userSchema.js');

var app = express();

app.get('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    if (!project) {
      res.send(404);
    }
    res.json({
      "project": project
    });
  }, next);
});

app.get('/projects', function (req, res, next) {
  User.findById(req.user._id).exec().then(function (user) {
    Project.find({
      '_id': {
        $in: user.projects
      }
    }).exec().then(function (projects) {
      res.json({
        "projects": projects
      });
    }, next);
  })
});

app.put('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    project.name = req.body.project.name;
    project.save();

    res.json({
      "project": project
    });
  }, next);
});

app.post('/projects', function (req, res, next) {
  var project = new Project({
    name: req.body.project.name
  });

  Project.create(project).then(function () {
    res.json({
      "project": project
    });
  }, next);
});

app.delete('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function () {
    res.send(200);
  }, next);
});

module.exports = app;