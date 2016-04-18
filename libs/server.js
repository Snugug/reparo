'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const express = require('express');

//////////////////////////////
// App Variables
//////////////////////////////
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello World</title><style>body{background:#c0ffee;}</style></head><body><h1>Hello World</h1></body></html>');
});


module.exports = {
  app,
  port
};
