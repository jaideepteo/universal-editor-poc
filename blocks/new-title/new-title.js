export default function decorate(block) {
  const rows = [...block.children];
  const titleRow = rows[0];
  const titleHeading = titleRow?.querySelector('h1, h2, h3, h4, h5, h6');
  const ctaRow = rows[1];
  const ctaCell = ctaRow?.querySelector(':scope > div');
  const buttonContainer = ctaCell?.querySelector('p.button-container');
  const ctaLink = buttonContainer?.querySelector('a');

  const targetP = ctaCell
    ? [...ctaCell.querySelectorAll('p')].find((p) => !p.classList.contains('button-container'))
    : null;
  const target = targetP?.textContent?.trim();
  if (ctaLink && target && (target === '_blank' || target === '_self')) {
    ctaLink.setAttribute('target', target);
    if (target === '_blank') {
      ctaLink.setAttribute('rel', 'noopener noreferrer');
    }
  }
  if (targetP) targetP.remove();
  if (buttonContainer && !ctaLink) buttonContainer.remove();
  const wrapper = document.createElement('div');
  wrapper.className = 'block-content';
  if (titleHeading) wrapper.append(titleHeading);
  if (buttonContainer) wrapper.append(buttonContainer);
  block.replaceChildren(wrapper);
  
}