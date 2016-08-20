'use strict';

// Requires
const GitHub = require('github');
const config = require('config');
const Promise = require('bluebird');

config.github.api.pathPrefix = config.github.api.host === 'api.github.com' ? '' : '/api/v3';

config.github.Promise = Promise;


module.exports = token => {
  const github = new GitHub(config.github.api);

  if (token) {
    github.authenticate({
      type: 'oauth',
      token,
    });
  }

  return github;
}
