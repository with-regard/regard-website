'use strict';

var User = require('./userSchema.js');

function createNewUserFromGithub(profile) {
  // passport normalizes the response.
  var raw = profile._json;

  var user = new User({
    githubId: raw.id,
    login: raw.login,
    name: raw.name,
    avatar_url: raw.avatar_url,
    email: raw.email,

    isDeveloper: true,
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
    return user || createNewUserFromGithub(profile);
  });
};

exports.fetchUserById = function (id) {
  return User.findById(id).exec();
};
