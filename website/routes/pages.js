"use strict";

exports.index = function (req, res) {
  if (req.user && req.user.isDeveloper) {
    res.redirect('/dashboard/');
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

exports.safari = function(req, res) {
  res.render('safari');
}
