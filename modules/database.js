'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));