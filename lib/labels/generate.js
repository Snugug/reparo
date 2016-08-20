'use strict';

const Promise = require('bluebird');
const gh = require('../github');
const utils = require('../github/utils');
const split = require('../split');


const generate = (labels, user, repo, token) => {
  const github = gh(token);

  const unique = split.unique(labels);

  // Get all current labels
  return utils.all(token, 'issues', 'getLabels', {
    user,
    repo,
  }).then(current => {
    const lower = unique.map(label => {
      return label.toLowerCase();
    });

    // Suss out the duplicate issues
    return current.map(label => {
      return label.name.toLowerCase();
    }).filter(label => {
      if (lower.indexOf(label) < 0) {
        return true;
      }

      return false;
    });
  }).then(bye => {
    // Remove duplicate issues
    return Promise.map(bye, label => {
      return github.issues.deleteLabel({
        user,
        repo,
        name: label,
      });
    });
  }).then(result => {
    const items = Object.keys(labels).map(label => {
      return {
        color: labels[label].color,
        labels: labels[label].labels,
      };
    });

    // Create labels
    return Promise.map(items, item => {
      const color = item.color.replace('#', '');
      return Promise.map(item.labels, label => {
        return github.issues.createLabel({
          user,
          repo,
          name: label,
          color,
        }).catch(e => {
          const code = JSON.parse(e.message).errors[0].code;

          // Update labels instead if they exist
          if (code === 'already_exists') {
            return github.issues.updateLabel({
              user,
              repo,
              name: label,
              color,
            });
          }
        });
      });
    });
  });
};

module.exports = generate;
