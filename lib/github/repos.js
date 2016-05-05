'use strict';

const gh = require('../github');
const Promise = require('bluebird');

module.exports = (token) => {
  gh.authenticate({
    type: 'oauth',
    token: token
  });

  const repos = Promise.promisifyAll(gh.repos);

  const getAllRepos = (page, allRepos) => {
    let repoList = allRepos;

    return repos.getAllAsync({
      page: page,
      per_page: 100
    }).then(results => {
      repoList = repoList.concat(results.map(repo => {
        return repo.full_name;
      }));

      if (results.length < 100) {
        return repoList;
      }
      else {
        return getAllRepos(page + 1, repoList);
      }
    });
  };

  return getAllRepos(1, []).then(results => {
    const orgsAndRepos = {};

    orgsAndRepos.orgs = results.map(repo => {
      return repo.split('/')[0];
    }).sort().filter((item, pos, arr) => {
      return !pos || item != arr[pos - 1];
    });

    orgsAndRepos.repos = results.map(repo => {
      const split = repo.split('/');
      return {
        org: split[0],
        repo: split[1],
      };
    });

    return orgsAndRepos;
  });
};
