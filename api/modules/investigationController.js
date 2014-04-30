"use strict";

var express = require('express');
var Investigation = require('../schemas/investigation.js');
var Project = require('../schemas/project.js');

var app = express();

app.get('/investigations/:id', function (req, res, next) {
  // Check user can access this investigation

  Investigation.findById(req.params.id).exec().then(function (investigation) {
    if (!investigation) {
      res.send(404);
    }
    res.json({
      "investigation": investigation
    });
  }, next);
});

app.get('/investigations', function(req, res, next){
  if(!req.query.ids){
    res.send(400, 'You must specify a list of ids');
  }
  
  Investigation.find({
      '_id': {
        $in: req.query.ids
      }
    }).exec().then(function(investigations) {
    res.json({
      investigations: investigations
    })
  })
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
    res.json({
      "investigation": investigation
    });
  }, next);
});

app.delete('/investigations/:id', function (req, res, next) {
  Investigation.findById(req.params.id).exec().then(function () {
    res.send(200);
  }, next);
});

module.exports = app;