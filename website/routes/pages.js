"use strict";

exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/portal');
  } else {
    res.render('index');
  }
};

exports.about = function (req, res) {
  res.render('about', {
    menu: 'about'
  });
};