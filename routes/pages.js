var everyauth = require('everyauth');

exports.index = function (req, res) {
  if (everyauth.loggedIn) {
    res.render('dashboard');
  } else {
    res.render('index', {
      message: req.flash('message')
    });
  }
};

exports.contact = function (req, res) {
  res.render('contact', {
    menu: 'contact'
  });
}

exports.dashboard = function (req, res) {
  if (everyauth.loggedIn) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  }
}

exports.login = function (req, res) {
  if (everyauth.loggedIn) {
    res.render('dashboard');
  } else {
    res.redirect('/auth/github');
  }
}