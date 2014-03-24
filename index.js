var express = require('express'),
    routes = require('./routes');

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/dist'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/contact', routes.contact);

// Go

app.listen(process.env.port || 3000);
console.log("Express server started");