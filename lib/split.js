'use strict';

const _ = require('lodash');

const split = (body) => {
  const items = _.cloneDeep(body);
  const mine = {
    repos: items.repos,
    labels: {},
  };
  let i = 0;

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

  return mine;
};

module.exports = split;
