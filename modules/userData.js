var express = require('express');
var User = require('./userSchema.js');
var Promise = require('promise');

var router = express.Router();

function createUser(userId) {
  var user = new User({
    userId: userId,
    isUser: true,
    projects: ["538ca8326f34f7a0075ddbbe"]
  });

  return new Promise(function (fulfill, reject){
    user.save(function (err, res){
      if (err) reject(err);
      else fulfill(res);
    });
  });
}

router.get('/userdata/:organization/:product/:user', function (req, res, next) {
  createUser(req.params.user).then(function (user) {
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      
      console.log(req.user);
      res.redirect('/portal')
    });
  });
});

module.exports = router;