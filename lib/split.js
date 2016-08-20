'use strict';

const _ = require('lodash');

const split = (body) => {
  return new Promise((res, rej) => {
    const items = _.cloneDeep(body);
    const mine = {
      repos: items.repos,
      labels: {},
    };
    let i = 0;

    if (typeof mine.repos === 'undefined') {
      rej(new Error('No Repos Selected'));
    }

    if (!Array.isArray(mine.repos)) {
      mine.repos = [mine.repos];
    }

    delete items.repos;
    delete items.submit;

    for (i = 0; i < Object.keys(items).length / 4; i++) {
      const title = items[`${i}--title`];
      const description = items[`${i}--description`];
      const color = items[`${i}--color`];
      let labels = items[`${i}--labels`];

      if (!Array.isArray(labels)) {
        labels = [labels];
      }

      mine.labels[title] = {
        description,
        color,
        labels,
      };
    }

    mine.repos = mine.repos.map(repository => {
      const boom = repository.split('/');
      const user = boom[0];

      boom.shift();

      const repo = boom.join('/');

      return {
        user,
        repo,
      };
    });

    res(mine);
  })
};

const unique = labels => {
  let items = [];

  Object.keys(labels).forEach(label => {
    const all = labels[label].labels;
    items = items.concat(all);
  });

  items = items.sort().filter((item, pos, arr) => {
    return !pos || item !== arr[pos - 1];
  });

  return items;
}

module.exports = split;
module.exports.unique = unique;
