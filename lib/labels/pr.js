'use strict';

const yaml = require('js-yaml');
const pr = require('../github/pr');

const labelPR = (labels, user, repo, token) => {
  const content = {};

  Object.keys(labels).forEach(label => {
    const lbl = labels[label];
    delete lbl.text;

    content[label] = lbl;
  });

  // Create Branch
  return pr.branch('labels-update', user, repo, token).then(() => {
    // Create File in Branch
    return pr.file({
      path: '.github/labels.yml',
      message: ':memo: Update project labels',
      content: new Buffer(yaml.safeDump(labels, {
        lineWidth: -1,
      })),
      branch: 'labels-update',
    }, user, repo, token);
  }).then(() => {
    // Create PR from Branch
    return pr({
      title: 'Update Labels',
      body: 'Label configuration update from [Reparo](http://reparo.herokuapp.com/)',
      head: 'labels-update',
    }, user, repo, token);
  });
};

module.exports = labelPR;
