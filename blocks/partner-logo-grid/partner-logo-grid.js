import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const picture = row.querySelector('picture');
    const img = row.querySelector('img');
    const existingLink = row.querySelector('a');
    const target = [...row.querySelectorAll('p')]
      .map((p) => p.textContent.trim())
      .find((t) => t === '_blank' || t === '_self');

    // Strip whitespace (raw or %20-encoded) injected into hrefs containing commas.
    const href = existingLink?.getAttribute('href')?.replace(/(\s|%20)+/g, '');

    if (!img) {
      ul.append(li);
      return;
    }

    img.loading = 'lazy';
    const logo = picture || img;

    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.title = img.alt || '';
      if (target === '_blank') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.append(logo);
      li.append(a);
    } else {
      li.append(logo);
    }
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
