'use strict';

var express = require('express');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var users = require('./userController.js');

var app = express();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  users.fetchUserById(id).then(function (user) {
    done(null, user);
  });
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: "/auth/github"
  },
  function (accessToken, refreshToken, profile, done) {
    users.findOrCreateUser(profile).then(function (user) {
      done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/login', function (req, res) {
  res.redirect('/auth/github');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

module.exports = app;