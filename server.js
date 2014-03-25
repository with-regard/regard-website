var express = require('express'),
  pages = require('./routes/pages.js'),
  signup = require('./routes/signup.js'),
  multipart = require('connect-multiparty'),
  flash = require('connect-flash'),
  formParser = multipart();

var app = express();

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.cookieParser(process.env.COOKIE_SECRET || 'secret'));
  app.use(express.session({
    key: 'sid',
    cookie: {
      maxAge: 60000
    }
  }));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(__dirname + '/dist'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Routes

app.get('/', pages.index);
app.get('/contact', pages.contact);
app.post('/signup', formParser, signup.sendToMailchimp);

// Go

app.listen(process.env.port || 3000);
console.log("Express server started");