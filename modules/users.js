var controller = require('./userController.js');

exports.findOrCreateUser = function (session, accessToken, accessTokenExtra, githubUser) {
  var userPromise = this.Promise();
  
  // Try to find a matching user first
  controller.fetchUserByGithubId({
    githubId: githubUser.id
  }, function (err, user) {
    if (err) return userPromise.fail(err);
    if (user) return userPromise.fulfill(user);

    // else create a new user
    controller.createNewUserFromGithub(githubUser, function (err, user) {
      if (err) return userPromise.fail(err);
      return userPromise.fulfill(user);
    });
  });
  return userPromise;
}

exports.fetchUserById = function (id, callback) {
  controller.fetchUserById(id, function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
}