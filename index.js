'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');
const config = require('config');

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();

//////////////////////////////
// Routing
//////////////////////////////
app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello World</title><style>body{background:#c0ffee;}</style></head><body><h1>Hello World</h1></body></html>');
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
