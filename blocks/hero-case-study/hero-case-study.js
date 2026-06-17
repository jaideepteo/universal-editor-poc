import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [fragmentRow, imageRow, altRow, tagRow, descRow] = [...block.children];

  // 1. Heading content from the Content Fragment (title + subtitle).
  // The aem-content-fragment reference is resolved by AEM server-side, so the
  // CF's rendered markup already arrives inline in this row.
  const heading = document.createElement('div');
  heading.className = 'hero-case-study-heading';
  if (fragmentRow) {
    moveInstrumentation(fragmentRow, heading);
    heading.append(...fragmentRow.childNodes);

    // Title must render as an <h1>. If the CF serializes it as a different
    // element (e.g. a leading <p>), promote that first line to an <h1>.
    const first = heading.querySelector('p, h1, h2, h3, h4, h5, h6');
    if (first && first.tagName !== 'H1') {
      const h1 = document.createElement('h1');
      h1.append(...first.childNodes);
      first.replaceWith(h1);
    }
  }

  // 2. Case-study card from the dialog
  const card = document.createElement('div');
  card.className = 'hero-case-study-card';

  const picture = imageRow?.querySelector('picture');
  if (picture) {
    const media = document.createElement('div');
    media.className = 'hero-case-study-media';

    // aem-tag stores a tag ID (e.g. "mysite:content-type/case-study");
    // derive a readable label from its last segment.
    const rawTag = tagRow?.textContent.trim();
    if (rawTag) {
      const last = rawTag.split(/[:/]/).pop().replace(/[-_]/g, ' ').trim();
      const label = last.replace(/\b\w/g, (c) => c.toUpperCase());
      const tag = document.createElement('span');
      tag.className = 'hero-case-study-tag';
      tag.textContent = label;
      media.append(tag);
    }

    const img = picture.querySelector('img');
    const alt = altRow?.textContent.trim() || img?.alt || '';
    const optimized = createOptimizedPicture(img.src, alt, false, [{ width: '1000' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    picture.replaceWith(optimized);
    media.append(optimized);
    card.append(media);
  }

  if (descRow && descRow.textContent.trim()) {
    const desc = document.createElement('div');
    desc.className = 'hero-case-study-description';
    moveInstrumentation(descRow, desc);
    desc.append(...descRow.childNodes);
    card.append(desc);
  }

  block.textContent = '';
  block.append(heading, card);
}
