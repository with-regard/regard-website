exports.sendToMailchimp = function (req, res) {
  if(req.body.forbots){
    console.log('Probably a bot ' +  req.body.email);
    res.redirect('/');
  }
  
  var email = req.body.email;
  // Send to mailchimp api
  
  res.render('index', {signedUp: true}); // use flash here instead
}