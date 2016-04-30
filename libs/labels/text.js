'use strict';

const color = require('color');

module.exports = labels => {
  Object.keys(labels).forEach(label => {
    let lbl = labels[label];
    let clr = color(lbl.color);
    let contrast = color('white').contrast(clr);

    if (contrast >= 4.5) {
      labels[label].text = 'white';
    }
    else {
      labels[label].text = 'black';
    }
  });

  return labels;
};
