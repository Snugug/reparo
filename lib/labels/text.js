'use strict';

const color = require('color');
const _ = require('lodash');

module.exports = labels => {
  Object.keys(labels).forEach(label => {
    const lbl = labels[label];
    const clr = color(lbl.color);
    const contrast = color('white').contrast(clr);

    if (contrast >= 4.5) {
      _.set(labels, `${label}.text`, 'white');
    }
    else {
      _.set(labels, `${label}.text`, 'black');
    }
  });

  return labels;
};
