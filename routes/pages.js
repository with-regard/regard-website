exports.index = function (req, res) {
  res.render('index', {
    message: req.flash('message')
  });
};

exports.contact = function (req, res) {
  res.render('contact', {
    menu: 'contact'
  });
}