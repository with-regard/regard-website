'use strict';

var controller = require('./userController.js');

exports.findOrCreateUser = function (accessToken, refreshToken, profile) {
  // Try to find a matching user first
  return controller.fetchUserByGithubId({
    githubId: profile.id
  }).then(function (user) {
    if (user) {
      return user;
    } else {
      // else create a new profile for them
      controller.createNewUserFromGithub(profile, function (err, user) {
        return user;
      });
    }
  });
};

exports.fetchUserById = function (id) {
  return controller.fetchUserById(id);
};