'use strict'

//////////////////////////////
// Requires
//////////////////////////////
const GitHub = require('github');
const config = require('config');

const host = process.env.GHE || 'api.github.com';
const path = host !== 'api.github.com' ? '/api/v3' : '';

//////////////////////////////
// Export
//////////////////////////////
const gh = new GitHub(config.github.api);

module.exports = gh;
