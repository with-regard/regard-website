var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  githubId: Number,
  name: String,
  avatar_url: String
});

exports.User = mongoose.model('User', userSchema);