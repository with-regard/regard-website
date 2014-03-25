exports.sendToMailchimp = function (req, res) {
  if(req.body.forbots){
    console.log('Probably a bot ' +  req.body.email);
    res.redirect('/');
  }
  
  var email = req.body.email;
  // Send to mailchimp api
  
  req.flash('message', 'Thanks for signing up!');
  res.redirect('/');
}