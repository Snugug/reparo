(function () {
  'use strict';
  const $ = document.querySelectorAll.bind(document);

  const colorMeMine = (e) => {
    const target = e.target;
    const color = target.value;
    const labels = target.closest('.labels--set').querySelectorAll('.labels--individual');

    console.log(labels);

    Array.prototype.forEach.call(labels, (label) => {
      label.style.backgroundColor = color;
    });
  };

  document.addEventListener('DOMContentLoaded', (e) => {
    const colors = $('.labels--color');

    Array.prototype.forEach.call(colors, (item) => {
      item.addEventListener('change', colorMeMine);
    });
  });
}());
