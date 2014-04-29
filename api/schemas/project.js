var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: String,
  investigations: Array
});

module.exports = mongoose.model('Project', projectSchema);