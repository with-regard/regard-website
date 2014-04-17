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
      return controller.createNewUserFromGithub(profile);
    }
  });
};

exports.fetchUserById = function (id) {
  return controller.fetchUserById(id);
};