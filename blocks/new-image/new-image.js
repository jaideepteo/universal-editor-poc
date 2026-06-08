export default function decorate(block) {
  const [imageRow, linkRow] = [...block.children];
  const picture = imageRow?.querySelector('picture');

  // Fetch the boolean property directly from the Universal Editor dataset attribute
  // Data attributes are stored as strings, so we explicitly check if it matches 'true'
  const disableLazy = block.dataset.togglecheckbox === 'true';

  if (!picture) return;

  // 1. Apply BEM class to the standard <img> tag inside the <picture>
  const img = picture.querySelector('img');
  if (img) {
    img.classList.add('new-image__img');
    if (disableLazy) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
  }

  // Define the base structure container
  const container = document.createElement('div');
  container.className = 'new-image__container';

  const linkAnchor = linkRow?.querySelector('a');

  // Logic if no link exists: output only the image container
  if (!linkAnchor) {
    container.append(picture);
    block.replaceChildren(container);
    return;
  }

  // 2. Extract link parameters and manage target window logic
  const href = linkAnchor.getAttribute('href') || '#';
  const targetText = linkRow?.querySelectorAll('p')?.[1]?.textContent?.trim() || '_self';

  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.className = 'new-image__link';
  anchor.target = targetText;

  if (targetText === '_blank') {
    anchor.rel = 'noopener noreferrer';
  }

  // Construct the final wrapped link DOM structure
  anchor.append(picture);
  container.append(anchor);
  block.replaceChildren(container);
}
