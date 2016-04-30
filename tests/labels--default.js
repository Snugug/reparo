import test from 'ava';
import labels from '../lib/labels/default';

test('Default Labels', t => {
  let all = [];

  Object.keys(labels).forEach(label => {
    let object = labels[label];

    // Keys
    t.true(object.hasOwnProperty('color'), 'Has a `color` key');
    t.true(object.hasOwnProperty('description'), 'Has a `description` key');
    t.true(object.hasOwnProperty('labels'), 'Has a `labels` key');

    // Valid content
    t.regex(object.color, /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i, 'Color is a valid HEX color');
    t.true(Array.isArray(object.labels), 'Labels are an array');

    object.labels.forEach(lbl => {
      t.true(all.indexOf(lbl.toLowerCase()) === -1, `Duplicate label '${lbl}' in '${label}'`);
      all.push(lbl.toLowerCase());
    });
  });
});
