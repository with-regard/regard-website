"use strict";

var express = require('express');
var Investigation = require('../schemas/investigation.js');
var Project = require('../schemas/project.js');

var app = express();

app.get('/investigations/:id', function (req, res, next) {
  Investigation.findById(req.params.id).exec().then(function (investigation) {
    if (!investigation) {
      res.send(404);
    }
    res.json({
      "investigation": investigation
    });
  }, next);
});

app.put('/investigations/:id', function (req, res, next) {
  Investigation.findById(req.params.id).exec().then(function (investigation) {
    investigation.name = req.body.project.name;
    investigation.save();

    res.json({
      "investigation": investigation
    });
  }, next);
});

app.post('/investigations', function (req, res, next) {
  var investigation = new Investigation({
    name: req.body.investigation.name
  });
  
  Investigation.create(investigation).then(function () {
    Project.findByIdAndUpdate("5357fb84e15ed4ec0cf3d4f5", {
      $push: {
        investigation_ids: investigation._id
      }
    }, {
      upsert: true
    }).exec().then(function (project) {
      res.json({
        "project": project,
        "investigation": investigation
      });
    }, next);
  });
});

app.delete('/investigations/:id', function (req, res, next) {
  Investigation.findById(req.params.id).exec().then(function (investigation) {
    investigation.remove().exec().then(function () {
      Project.findByIdAndUpdate("5357fb84e15ed4ec0cf3d4f5", {
        $pull: {
          project_ids: investigation._id
        }
      }).exec().then(function () {
        res.send(200);
      }, next);
    }, next)
  }, next);
});

module.exports = app;