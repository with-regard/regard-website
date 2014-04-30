var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: Number,
  name: String,
  avatar_url: String,
  projects: Array
});

module.exports = mongoose.model('User', userSchema);