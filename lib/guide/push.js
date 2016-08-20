'use strict';

const git = require('nodegit');
const path = require('path');
const fs = require('fs-extra');
const config = require('config');

const image = require('./image');
const wiki = require('./wiki');

const signature = git.Signature.now('Reparo', 'labels@reparo.herokuapp.com');

const push = (labels, user, repo, token) => {
  const host = config.github.api.host === 'api.github.com' ? 'github.com' : config.github.api.host;
  const url = `https://${token}:x-oauth-basic@${host}/${user}/${repo}.wiki.git`;
  const save = path.join(process.cwd(), 'wiki', user, repo);
  let clone;

  return git.Clone(url, save).then(repository => { // eslint-disable-line new-cap
    clone = repository;

    fs.removeSync(path.join(save, 'labels.png'));
    fs.removeSync(path.join(save, 'Label-Style-Guide.md'));

    return clone;
  }).then(() => {
    // Build Image
    return image(labels, user, repo);
  }).then(() => {
    // Build Wiki
    return wiki(labels, user, repo);
  }).then(() => {
    // Commit
    return clone.createCommitOnHead([
      'Label-Style-Guide.md',
      'labels.png',
    ], signature, signature, ':memo: Update Label Style Guide');
  }).then(() => {
    return git.Remote.lookup(clone, 'origin');
  }).then(remote => {
    // Push
    return remote.push(['refs/heads/master:refs/heads/master']);
  }).then(() => {
    fs.removeSync(save);
  });
};

module.exports = push;
