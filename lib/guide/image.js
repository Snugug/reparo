'use strict';

const Promise = require('bluebird');
const path = require('path');
const nunjucksAsync = require('nunjucks');

const phantom = require('./phantom');
const nunjucks = Promise.promisifyAll(nunjucksAsync);

const generate = (labels, user, repo) => {
  const file = path.join(process.cwd(), 'wiki', user, repo, 'labels.png');
  const template = path.join(process.cwd(), 'templates', 'components', 'guide.html');

  return nunjucks.renderAsync(template, { labels }).then(page => {
    return phantom(page, file);
  });
};


module.exports = generate;
