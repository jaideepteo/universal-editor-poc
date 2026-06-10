import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const img = cells[0]?.querySelector('img');
    const alt = cells[1]?.textContent.trim();
    const href = cells[2]?.textContent.trim();
    const target = cells[3]?.textContent.trim();

    if (!img) {
      ul.append(li);
      return;
    }

    img.loading = 'lazy';
    if (alt) img.alt = alt;

    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.title = alt || img.alt || '';
      if (target === '_blank') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.append(img);
      li.append(a);
    } else {
      li.append(img);
    }
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
