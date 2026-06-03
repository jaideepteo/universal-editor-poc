export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const picture = imageRow?.querySelector('picture');
  const linkRow = rows[1];
  const linkAnchor = linkRow?.querySelector('a');
  const paragraphs = linkRow?.querySelectorAll('p') || [];
  const targetText = paragraphs[1]?.textContent?.trim() || '_self';

  // If no picture, stop
  if (!picture) return;

  // If no link, keep only image
  if (!linkAnchor) {
    block.textContent = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'image-container';
    wrapper.append(picture);
    block.append(wrapper);
    return;
  }

  const href = linkAnchor.getAttribute('href') || '#';
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.className = 'image-link';

  if (targetText) {
    anchor.target = targetText;
  }

  if (targetText === '_blank') {
    anchor.rel = 'noopener noreferrer';
  }

  anchor.append(picture);
  block.textContent = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'image-container';
  wrapper.append(anchor);
  block.append(wrapper);
}