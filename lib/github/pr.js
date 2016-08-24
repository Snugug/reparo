'use strict';

const gh = require('./');

const branch = (name, user, repo, token) => {
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
      ref: `refs/heads/${name}`,
      sha,
    });
  });
};

const buildPR = (opts, user, repo, github) => {
  return github.pullRequests.create({
    user,
    repo,
    title: opts.title,
    body: opts.body,
    head: opts.head,
    base: opts.base,
  });
};

const pr = (opts, user, repo, token) => {
  const github = gh(token);
  const options = opts;

  if ({}.hasOwnProperty.call(opts, 'base')) {
    return github.repos.get({
      user,
      repo,
    }).then(repository => {
      options.base = repository.default_branch;

      return buildPR(options, user, repo, github);
    });
  }

  return buildPR(options, user, repo, github);
};

const file = (opts, user, repo, token) => {
  const github = gh(token);

  return github.repos.createFile({
    user,
    repo,
    path: opts.path,
    message: opts.message,
    content: opts.content.toString('base64'),
    branch: opts.branch,
  });
};


module.exports = pr;
module.exports.branch = branch;
module.exports.file = file;
