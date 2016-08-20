'use strict';

const yaml = require('js-yaml');
const gh = require('../github');

const pr = (labels, user, repo, token) => {
  const github = gh(token);
  let base = 'master';

  return github.repos.get({
    user,
    repo,
  }).then(repository => {
    base = repository.default_branch;

    return github.gitdata.getReference({
      user,
      repo,
      ref: `heads/${base}`,
    });
  }).then(hash => {
    const sha = hash.object.sha;

    return github.gitdata.createReference({
      user,
      repo,
      ref: 'refs/heads/labels-update',
      sha,
    });
  }).then(() => {
    // Create Label
    return github.repos.createFile({
      user,
      repo,
      path: '.github/labels.yml',
      message: ':memo: Update project labels',
      content: new Buffer(yaml.safeDump(labels, {
        lineWidth: -1,
      })).toString('base64'),
      branch: 'labels-update',
    });
  }).then(() => {
    // Issue PR
    return github.pullRequests.create({
      user,
      repo,
      title: 'Update Labels',
      body: 'Label configuration update from [Reparo](http://reparo.herokuapp.com/)',
      head: 'labels-update',
      base,
    });
  });
};

module.exports = pr;
