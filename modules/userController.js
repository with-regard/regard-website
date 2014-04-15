var User = require('/schemas/userSchema.js').User;

exports.createNewUserFromGithub = function (user) {
  var user = new User({
    githubId: user.id,
    email: user.email
  });

  user.save(function (err) {
    if (err) return console.error(err);
  });
}

exports.fetchUserByGithubId = function (id, callback) {
  User.find({
    githubId: id
  }, callback);
}