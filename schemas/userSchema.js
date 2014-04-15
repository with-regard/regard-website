var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: Number,
  email: String
});

exports.User = mongoose.model('User', userSchema);