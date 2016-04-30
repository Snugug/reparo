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

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello World</title><style>body{background:#c0ffee;}</style></head><body><h1>Hello World</h1></body></html>');
});

if (!module.parent) {
  app.listen(config.server.port, () => {
    console.log(`Server starting on ${config.server.host}:${config.server.port}`);
  });
}

module.exports = app;
