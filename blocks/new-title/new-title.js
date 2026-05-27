export default function decorate(block) {
  const rows = [...block.children];
  
  // Extract heading from row 1
  const titleRow = rows[0];
  const titleHeading = titleRow?.querySelector('h1, h2, h3, h4, h5, h6');
  
  // Extract link components from row 2
  const ctaRow = rows[1];
  const ctaCell = ctaRow?.querySelector(':scope > div');
  const buttonContainer = ctaCell?.querySelector('p.button-container');
  const ctaLink = buttonContainer?.querySelector('a');

  // Find the window target config string (_blank or _self)
  const targetP = ctaCell
    ? [...ctaCell.querySelectorAll('p')].find((p) => !p.classList.contains('button-container'))
    : null;
  const target = targetP?.textContent?.trim();

  // Configure link attributes safely at the top
  if (ctaLink && target && (target === '_blank' || target === '_self')) {
    ctaLink.setAttribute('target', target);
    if (target === '_blank') {
      ctaLink.setAttribute('rel', 'noopener noreferrer'); // Security fix
    }
  }

  // Clear unstyled authoring markup cells
  block.textContent = '';

  // Process and merge the link inside the semantic heading tag cleanly
  if (titleHeading) {
    titleHeading.className = 'title__heading';
    
    if (ctaLink) {
      ctaLink.className = 'title__link';
      ctaLink.textContent = titleHeading.textContent; // Set heading text to link
      
      // Inject the accessible hidden span to alert screen readers
      if (target === '_blank') {
        const srSpan = document.createElement('span');
        srSpan.className = 'title__screen-reader-only';
        srSpan.textContent = ' (opens in a new tab)';
        ctaLink.appendChild(srSpan);
      }
      
      titleHeading.textContent = '';
      titleHeading.appendChild(ctaLink);
    }
  }

  // Create BEM Element Wrapper Container
  const container = document.createElement('div');
  container.className = 'title__container';

  if (titleHeading) {
    container.append(titleHeading);
    // Replace default author markup cells with the optimized semantic structure
    block.appendChild(container);
  }
}
