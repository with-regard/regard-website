var User = require('../schemas/userSchema.js').User;

exports.createNewUserFromGithub = function (githubUser, callback) {
  var user = new User({
    githubId: githubUser.id,
    name: githubUser.name,
    avatar_url: githubUser.avatar_url
  });

  user.save(function (err) {
    if (err) return console.error(err);
  });
  
  callback(null, user);
}

exports.fetchUserByGithubId = function (data, callback) {
  User.findOne({
    githubId: data.githubId
  }, callback);
}

exports.fetchUserById = function(id, callback) {
  User.findById(id, callback);
}