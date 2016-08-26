'use strict';

const utils = require('./utils');

const byName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }

  return 0;
};

module.exports = (token) => {
  return utils.all(token, 'repos', 'getAll').then(results => {
    const orgCount = {};
    const repos = results.filter(repo => {
      if (repo.permissions.push) {
        return true;
      }

      return false;
    }).map(repo => {
      return {
        owner: repo.owner,
        name: repo.name,
        description: repo.description,
      };
    }).sort(byName);

    const orgs = repos.map(repo => {
      if (!{}.hasOwnProperty.call(orgCount, repo.owner.login)) {
        orgCount[repo.owner.login] = 1;
      }
      else {
        orgCount[repo.owner.login] += 1;
      }

      return {
        name: repo.owner.login,
        avatar: repo.owner.avatar_url,
      };
    }).sort(byName).filter((item, pos, arr) => {
      return !pos || item.name !== arr[pos - 1].name;
    }).map(org => {
      const organization = org;
      organization.total = orgCount[org.name];

      return organization;
    });

    return {
      orgs,
      repos,
    };
  }).catch(e => {
    console.error(e); // eslint-disable-line no-console
  });
};
