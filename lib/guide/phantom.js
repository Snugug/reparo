'use strict';

const phantom = require('phantom');

const generate = (website, output) => {
  let site = null;
  let ph = null;

  return phantom.create().then(instance => {
    ph = instance;
    return instance.createPage();
  }).then(page => {
    site = page;
    return page.property('content', website);
  }).then(() => {
    return site.render(output);
  }).then(result => {
    site.close();
    ph.exit();
    return result;
  });
}

module.exports = generate;
