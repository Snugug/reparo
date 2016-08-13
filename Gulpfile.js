'use strict';

const gulp = require('gulp');
const config = require('config');
const runner = require('punchcard-runner');

runner(gulp, {
  server: {
    port: config.server.port,
    host: config.server.host,
  },
});
