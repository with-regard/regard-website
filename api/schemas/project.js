var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: String,
  investigation_ids: Array
});

module.exports = mongoose.model('Project', projectSchema);