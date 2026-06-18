import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  // Configure grid columns based on author selection
  const desktopCols = block.dataset.desktopColumns || '4';
  block.classList.add(`partner-logo-grid--cols-${desktopCols}`);

  const ul = document.createElement('ul');
  ul.classList.add('partner-logo-grid__list');

  // Convert raw block rows into structured grid items
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('partner-logo-grid__item');

    // Maintain AEM Universal Editor Instrumentation metadata
    moveInstrumentation(row, li);

    const picture = row.querySelector('picture');
    const img = row.querySelector('img');
    const existingLink = row.querySelector('a');

    const targetText = row.textContent.toLowerCase();
    const isBlank = targetText.includes('_blank');

    const href = existingLink?.getAttribute('href')?.replace(/(\s|%20)+/g, '');

    // Prevent broken layouts if an image is missing but row text exists
    if (!img) {
      if (row.textContent.trim()) {
        ul.append(li);
      }
      return;
    }

    // Performance enhancement: Ensure lazy loading
    img.loading = 'lazy';
    img.classList.add('partner-logo-grid__image');

    const logoWrapper = picture || img;

    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.classList.add('partner-logo-grid__link');

      // Accessibility best practice: Provide clear context for screen-readers without title clutter
      const accessibleName = img.alt ? `Visit ${img.alt} website` : 'Visit partner website';
      a.setAttribute('aria-label', accessibleName);

      if (isBlank) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      a.append(logoWrapper);
      li.append(a);
    } else {
      li.append(logoWrapper);
    }
    ul.append(li);
  });

  // Replace original layout markup with the optimized grid structure
  block.textContent = '';
  block.append(ul);
}
