'use strict';

const gh = require('../github');

const wiki = (labels, user, repo, token) => {
  const github = gh(token);

  return github.repo.edit({
    user,
    repo,
    has_wiki: true,
  }).then(() => {

  });
};
