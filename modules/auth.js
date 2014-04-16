'use strict';

var express = require('express'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    users = require('./users.js');

var app = express();

passport.serializeUser(function (user, done) {
  // store id
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  // look up by id
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: "/auth/github"
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
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

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

module.exports = app;
