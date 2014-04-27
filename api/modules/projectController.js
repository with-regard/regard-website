"use strict";

var express = require('express');
var Project = require('../schemas/project.js');
var User = require('../schemas/userSchema.js');

var app = express();

app.get('/projects/:id', function (req, res, next) {
  // Check if this user can access this project
  User.findById(req.user._id).where('project_ids').in([req.params.id]).exec().then(function (allowed) {
    if (!allowed) {
      res.send(401);
    } else {
      Project.findById(req.params.id).exec().then(function (project) {
        if (!project) {
          res.send(404);
        }
        res.json({
          "project": project
        });
      }, next);
    }
  }, next);
});

app.get('/projects', function (req, res, next) {
  User.findById(req.user._id).exec().then(function (user) {
    Project.find({
      '_id': {
        $in: user.project_ids
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
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        project_ids: project._id
      }
    }, {
      safe: true,
      upsert: true
    }).exec().then(function () {
      res.json({
        "project": project
      });
    }, next);
  });
});

app.delete('/projects/:id', function (req, res, next) {
  Project.findById(req.params.id).exec().then(function (project) {
    project.remove().exec().then(function () {
      User.findByIdAndUpdate(req.user._id, {
        $pull: {
          project_ids: project._id
        }
      }).exec().then(function () {
        res.send(200);
      }, next);
    }, next)
  }, next);
});

module.exports = app;