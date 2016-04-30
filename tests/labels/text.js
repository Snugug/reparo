import test from 'ava';
import color from 'color';
import labels from '../../lib/labels/default';
import text from '../../lib/labels/text';

test('Label Colors', t => {
  let resolved = text(labels);

  Object.keys(resolved).forEach(label => {
    let lbl = resolved[label];

    if (color('white').contrast(color(lbl.color)) >= 4.5) {
      t.is(lbl.text, 'white', 'White text is accessible on the background color');
    }
    else {
      t.is(lbl.text, 'black', 'Black text is accessible on the background color');
    }
  });
});
