'use strict'

//////////////////////////////
// Requires
//////////////////////////////
const GitHub = require('github');

const host = process.env.GHE || 'api.github.com';
const path = host !== 'api.github.com' ? '/api/v3' : '';

//////////////////////////////
// Export
//////////////////////////////
const gh = new GitHub({
  version: '3.0.0',
  protocol: 'https',
  host: host,
  pathPrefix: path,
  timeout: 5000
});

module.exports = gh;
