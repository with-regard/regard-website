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

exports.blog = function (req, res) {
  res.render('blog', {
    menu: 'blog'
  });
};

exports.notFound = function(req, res) {
  res.status(404);
  res.render('404');
};