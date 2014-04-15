var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('Connected to database');
});