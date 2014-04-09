var express = require('express'),
  pages = require('./routes/pages.js'),
  signup = require('./routes/signup.js'),
  multipart = require('connect-multiparty'),
  flash = require('connect-flash'),
  auth = require('./modules/auth.js');

var app = express();

// Configuration

app.configure(function () {
  var secret = process.env.COOKIE_SECRET || 'secret';

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(multipart());
  app.use(express.cookieParser(secret));
  app.use(express.session({
    secret: secret
  }));
  app.use(auth.middleware());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(__dirname + '/dist'));
  app.use(function (req, res, next) {
    res.locals.user = auth.user;
    next();
  })
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
app.get('/login', pages.login);

app.post('/signup', signup.sendToMailchimp);

// Go

app.listen(process.env.port || 3000);
console.log("Express server started");