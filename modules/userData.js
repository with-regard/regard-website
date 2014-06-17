var express = require('express');
var User = require('./userSchema.js');
var Promise = require('promise');

var router = express.Router();

function createUser(userId) {
  var user = new User({
    userId: userId,
    isUser: true,
    projects: ["53997a47b12b52200c7e3b88"]
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
