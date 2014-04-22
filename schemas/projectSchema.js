var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Project', projectSchema);