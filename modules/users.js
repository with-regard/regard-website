var users = {};

exports.findOrCreateUser = function (session, accessToken, accessTokenExtra, user) {
  return users[user.id] || (users[user.id] = user);
}

exports.findUserById = function (id, callback) {
  callback(null, users[id]);
}