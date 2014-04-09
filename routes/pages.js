exports.index = function (req, res) {
  if (req.loggedIn) {
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
};

exports.login = function (req, res) {
  res.redirect('/auth/github');
};