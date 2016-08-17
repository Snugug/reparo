'use strict';

const defaults = require('./lib/labels/default');
const text = require('./lib/labels/text');
const image = require('./lib/guide/image');

const labels = text(defaults);

image('punchcard', 'punchcard-cms', labels).then(() => {
  console.log('done');
}).catch(e => {
  console.error(e);
});
