var everyauth = require('everyauth');
var users = require('./users.js');

everyauth.github
  .appId(process.env.GITHUB_APP_ID)
  .appSecret(process.env.GITHUB_APP_SECRET)
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('user:email')
  .findOrCreateUser(users.findOrCreateUser)
  .redirectPath('/');

everyauth.everymodule.findUserById(users.findUserById);

exports.middleware = everyauth.middleware;