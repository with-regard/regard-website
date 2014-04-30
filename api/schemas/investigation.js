var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var investigationSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Investigation', investigationSchema);