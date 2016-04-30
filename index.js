'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const config = require('config');
const nunjucks = require('nunjucks');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

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
app.use(cookieParser());
app.use(cookieSession({
  'secret': 'babka'
}));

// Flash
app.use(flash());
app.use((req, res, next) => {
  const token = req.flash('token');
  let auth = false;

  if (token.length >= 1) {
    auth = true;
    req.flash('token', token)
  }

  res.locals.auth = auth;
  next();
});

//////////////////////////////
// Routing
//////////////////////////////
app.get('/', (req, res) => {
  res.render('index.html', {
    authenticated: res.locals.auth
  });
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
