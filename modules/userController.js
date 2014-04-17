'use strict';

var User = require('../schemas/userSchema.js').User;

exports.createNewUserFromGithub = function (profile) {
  // passport normalizes the response.
  var raw = profile._json;
  
  var user = new User({
    githubId: raw.id,
    name: raw.name,
    avatar_url: raw.avatar_url
  });

  user.save();
};

exports.fetchUserByGithubId = function (data) {
  return User.findOne({
    githubId: data.githubId
  }).exec();
};

exports.fetchUserById = function (id) {
  return User.findById(id).exec();
};
