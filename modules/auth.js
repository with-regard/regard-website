var everyauth = require('everyauth');
var users = {};
var nextUserId = 0;

everyauth.github
  .appId(process.env.GITHUB_APP_ID)
  .appSecret(process.env.GITHUB_APP_SECRET)
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('user:email')
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, user) {
    return users[user.id] || (users[user.id] = user);
  })
  .redirectPath('/');

everyauth.everymodule
  .findUserById(function (id, callback) {
    callback(null, users[id]);
  });

exports.middleware = function () {
  return everyauth.middleware();
};
