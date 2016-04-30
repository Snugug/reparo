'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const config = require('config');
const nunjucks = require('nunjucks');

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
// Routing
//////////////////////////////
app.get('/', (req, res) => {
  res.render('index.html', {
    authenticated: res.locals.auth
  });
});
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
