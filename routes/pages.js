"use strict";

exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/portal');
  } else {
    res.render('index');
  }
};

exports.contact = function (req, res) {
  res.render('contact', {
    menu: 'contact'
  });
};