export default function decorate(block) {
  const rows = [...block.children];
  const buttonText = rows[0]?.textContent?.trim() || 'Click Here';
  const linkAnchor = rows[1]?.querySelector('a');
  const targetText = rows[1]?.querySelectorAll('p')[1]?.textContent?.trim() || '_self';

  if (!linkAnchor) return;
  const href = linkAnchor.getAttribute('href') || '#';
  const ariaLabel = rows[2]?.textContent?.trim() || buttonText;
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.textContent = buttonText;
  anchor.className = 'button';
  if (targetText) {
    anchor.target = targetText;
  }
  if (targetText === '_blank') {
    anchor.rel = 'noopener noreferrer';
  }
  if (ariaLabel) {
    anchor.setAttribute('aria-label', ariaLabel);
  }
  block.textContent = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'button_container';
  wrapper.append(anchor);
  block.append(wrapper);
}