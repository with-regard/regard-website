"use strict";

var request = require('request');

exports.sendToMailchimp = function (req, res) {
  if (req.body.forbots) {
    console.log('Probably a bot ' + req.body.email);
    res.redirect('/');
  }

  var signupData = {
    email: {
      email: req.body.email
    },
    apikey: process.env.MAILING_LIST_KEY,
    id: process.env.MAILING_LIST_ID,
    double_optin: false,
    send_welcome: true
  };

  request.post(process.env.LIST_SUBSCRIBE_URL, {
    form: signupData
  }, function (error, response, body) {
    console.log(body);
  });

  req.flash('message', 'Thanks for signing up!');
  res.redirect('/');
};