'use strict';

var User = require('../schemas/userSchema.js').User;

function createNewUserFromGithub(profile) {
  // passport normalizes the response.
  var raw = profile._json;

  var user = new User({
    githubId: raw.id,
    name: raw.name,
    avatar_url: raw.avatar_url
  });

  user.save();
}

function fetchUserByGithubId(data) {
  return User.findOne({
    githubId: data.githubId
  }).exec();
}

exports.findOrCreateUser = function (profile) {
  return fetchUserByGithubId({
    githubId: profile.id
  }).then(function (user) {
    if (user) {
      return user;
    } else {
      return createNewUserFromGithub(profile);
    }
  });
};

exports.fetchUserById = function (id) {
  return User.findById(id).exec();
};