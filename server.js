var express = require('express'),
  pages = require('./routes/pages.js'),
  signup = require('./routes/signup.js'),
  multipart = require('connect-multiparty'),
  flash = require('connect-flash'),
  everyauth = require('everyauth');

var users = {};

function addUser(user) {
  var user = users[user.id] = {
    id: user.id
  };
  users[user.id] = user;
  return user;
}

everyauth.debug = true;
everyauth.github
  .appId(process.env.GITHUB_APP_ID)
  .appSecret(process.env.GITHUB_APP_SECRET)
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('user:email')
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, user) {
    return users[user.id] || (users[user.id] = addUser(user));
  });

everyauth.everymodule
  .findUserById(function (id, callback) {
    callback(null, users[id]);
  });

var app = express();

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(multipart());
  app.use(express.cookieParser(process.env.COOKIE_SECRET || 'secret'));
  app.use(express.session({
    secret: process.env.COOKIE_SECRET
  }));
  app.use(everyauth.middleware());
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
app.get('/login', pages.login);

app.post('/signup', signup.sendToMailchimp);

// Go

app.listen(process.env.port || 3000);
console.log("Express server started");