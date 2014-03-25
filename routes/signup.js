var request = require('request');

exports.sendToMailchimp = function (req, res) {
  if(req.body.forbots){
    console.log('Probably a bot ' +  req.body.email);
    res.redirect('/');
<<<<<<< HEAD
  } 

  var signupData = {
    email : {
        email : req.body.email
    },
    apikey : process.env.MAILING_LIST_KEY,
    id : process.env.MAILING_LIST_ID,
    double_optin : false,
    send_welcome : true,
    email_type : 'html'
  };

  request.post(process.env.LIST_SUBSCRIBE_URL, {form: signupData }, function (error, response, body) {      
            console.log(body);
  });
 
  res.render('index', {signedUp: true}); // use flash here instead
=======
  }
  
  var email = req.body.email;
  // Send to mailchimp api
  
  req.flash('message', 'Thanks for signing up!');
  res.redirect('/');
>>>>>>> be7a8435820609c952d537655ba4dc31f4462f95
}