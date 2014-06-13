"use strict";

exports.index = function (req, res) {
    res.render('index');
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