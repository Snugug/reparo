'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const config = require('config');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');

const oauth = require('./lib/oauth')();

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

//////////////////////////////
// Configuration
//////////////////////////////
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure(['views', 'templates'], {
  'autoescape': true,
  'express': app,
});
app.set('view engine', 'html');

// Session
if (config.cookies.secure) {
  app.set('trust proxy', 1);
}
app.use(session({
  secret: 'babka',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: config.cookies.secure,
  },
}));

app.use((req, res, next) => {
  let auth = false;
  let host = `${config.github.api.protocol}://`;

  if (req.session.token) {
    auth = true;
  }

  // Host
  if (config.github.api.host === 'api.github.com') {
    host += 'github.com';
  }
  else {
    host += config.github.api.host;
  }


  req.session.authenticated = auth;
  res.locals.authenticated = auth;

  res.locals.host = host;
  next();
});

//////////////////////////////
// Routing
//////////////////////////////
app.get('/', (req, res) => {
  res.render('index.html');
});

// OAuth
app.get('/login', (req, res) => {
  return oauth.login(req, res);
});

app.get('/callback', (req, res) => {
  return oauth.callback(req, res);
});

oauth.on('error', function (err, token, res, tokenRes, req) {
  req.flash('error message', err);
  res.redirect('/');
});

oauth.on('token', function (token, res, tokenRes, req) {
  req.flash('token', token);
  res.redirect('/');
});

//////////////////////////////
// Start the server
//
// Ignored from code coverage as it's not possible to actually write a test for
// Starts the actual when this file is called directly
//////////////////////////////
/* istanbul ignore if  */
if (!module.parent) {
  app.listen(config.server.port, () => {
    console.log(`Server starting on ${config.server.host}:${config.server.port}`);
  });
}

module.exports = app;
