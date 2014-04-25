"use strict";

var express = require('express');
var Project = require('../schemas/project.js');

var app = express();

app.get('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    if(!project){
      res.send(404);
    }
    
    res.json({
      "project": project
    });
  }, next);
});

app.get('/projects', function (req, res, next) {
  // filter by user

  Project.find().exec().then(function (projects) {
    res.json({
      "projects": projects
    });
  }, next);
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

  // add project_id to user
});

app.delete('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    project.remove().exec().then(function () {
      res.send('');
    }, next)
  }, next);

  // remove project_id from user
});

module.exports = app;