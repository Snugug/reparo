/* eslint-env browser */
'use strict';

(function app() {
  const $ = document.querySelectorAll.bind(document);
  const FE = Array.prototype.forEach;

  const getLabels = target => {
    return target.closest('.labels--set').querySelectorAll('.labels--individual');
  };

  const colorMeMine = e => {
    const target = e.target;
    const color = target.value;
    const labels = getLabels(target);

    console.log(labels);

    Array.prototype.forEach.call(labels, (label) => {
      label.style.backgroundColor = color; // eslint-disable-line no-param-reassign
    });
  };

  const buhByeLabel = e => {
    e.preventDefault();

    const target = e.target;
    const parent = target.closest('.labels--individual');
    const grandparent = parent.parentNode;
    const sibling = parent.previousElementSibling;

    grandparent.removeChild(parent);
    sibling.querySelector('.labels--text').focus();
  };

  const buhByeGroup = e => {
    e.preventDefault();

    const target = e.target;
    const parent = target.closest('.labels');
    const grandparent = parent.parentNode;
    console.log(parent);

    grandparent.removeChild(parent);
  };

  const iCanAdd = e => {
    e.preventDefault();

    const target = e.target;
    const labels = getLabels(target);
    const clone = labels[0].cloneNode(true);
    const parent = labels[0].closest('.labels--group');

    const close = document.createElement('input');
    close.type = 'submit';
    close.name = 'submit';
    close.value = '×';
    close.setAttribute('aria-label', 'Delete');
    close.classList.add('labels--delete-label');
    close.addEventListener('click', buhByeLabel);

    clone.appendChild(close);
    clone.querySelector('.labels--text').value = '';

    parent.insertBefore(clone, target);
    clone.querySelector('.labels--text').focus();
  };

  const cleanAndSwap = (elem, id, yes) => {
    const prev = elem.name;
    const now = prev.replace('0', id);
    const label = elem.parentNode.querySelector(`[for="${prev}`);
    const clean = typeof yes === 'undefined';

    // Clean out value?
    if (clean) {
      if (elem.type === 'color') {
        elem.value = '#000000'; // eslint-disable-line no-param-reassign
      }
      else {
        elem.value = ''; // eslint-disable-line no-param-reassign
      }
    }

    // Set name
    elem.name = now; // eslint-disable-line no-param-reassign

    // Set ID
    if (elem.id) {
      elem.id = now; // eslint-disable-line no-param-reassign
    }

    // Set label
    if (label) {
      label.htmlFor = now;
    }
  };

  const moar = e => {
    e.preventDefault();

    const target = e.target;
    const allThings = $('.labels');
    const length = allThings.length;
    const group = allThings[0].cloneNode(true);
    const nomoar = document.createElement('input');
    nomoar.type = 'submit';
    nomoar.name = `${length}--delete-group`;
    nomoar.value = 'Delete Label Group';
    nomoar.classList.add('labels--delete-group');
    nomoar.addEventListener('click', buhByeGroup);

    const labels = group.querySelectorAll('.labels--individual');
    const first = labels[0];
    const add = group.querySelector('.labels--add');
    const color = group.querySelector('.labels--color');

    color.addEventListener('change', colorMeMine);
    add.addEventListener('click', iCanAdd);

    // Remove Labels
    FE.call(labels, label => {
      label.remove();
    });

    // Update label
    first.style.backgroundColor = '#000000';
    first.style.color = '#ffffff';

    add.parentNode.insertBefore(first, add);

    group.appendChild(nomoar);

    target.parentNode.insertBefore(group, target);

    // Clear out stuff
    cleanAndSwap(group.querySelector('.labels--title'), length);
    cleanAndSwap(group.querySelector('.labels--description'), length);
    cleanAndSwap(group.querySelector('.labels--text'), length);
    cleanAndSwap(color, length);
    cleanAndSwap(add, length, false);

    // Set Focus
    group.querySelector('.labels--title').focus();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const colors = $('.labels--color');
    const adds = $('.labels--add');
    const exes = $('.labels--delete-label');
    const badgroup = $('.labels--delete-group');
    const gimme = $('.add-labels')[0];

    FE.call(colors, item => {
      item.addEventListener('change', colorMeMine);
    });

    FE.call(adds, item => {
      item.addEventListener('click', iCanAdd);
    });

    FE.call(exes, item => {
      item.addEventListener('click', buhByeLabel);
    });

    FE.call(badgroup, item => {
      item.addEventListener('click', buhByeGroup);
    });

    gimme.addEventListener('click', moar);
  });
}());
