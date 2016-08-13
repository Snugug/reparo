'use strict';

const utils = require('./utils');

const getOrgs = token => {
  return utils.all(token, 'orgs');
};


module.exports = getOrgs;
