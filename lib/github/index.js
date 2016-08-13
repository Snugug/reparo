'use strict';

// Requires
const GitHub = require('github');
const config = require('config');
const Promise = require('bluebird');

config.github.api.pathPrefix = config.github.api.host === 'api.github.com' ? '' : '/api/v3';

config.github.Promise = Promise;

const gh = new GitHub(config.github.api);

module.exports = gh;
