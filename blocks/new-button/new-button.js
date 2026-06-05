export default function decorate(block) {
  // 1. Find the author-entered text and accessibility label and other values
  const textEl = block.children[0]?.querySelector('p');
  const linkAnchor = block.children[1]?.querySelector('.button-container a');
  const targetEl = block.children[1]?.querySelector('p:not(.button-container)');
  const labelEl = block.children[2]?.querySelector('p');
  const targetValue = targetEl?.textContent.trim() || '_self';


  // 2. Get the raw text values or set fallback defaults
  const buttonText = textEl ? textEl.textContent.trim() : 'Button';
  const buttonHref = linkAnchor?.getAttribute('href') || '#';
  const accessibilityLabel = labelEl ? labelEl.textContent.trim() : '';

  // 3. Create the clean, semantic anchor element for the final output
  const anchor = document.createElement('a');
  anchor.className = 'new-button__link';
  anchor.href = buttonHref;

  // 4. Apply the browser window target securely
  if (targetValue === '_blank') {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer'; // Protects performance and security
  } else {
    anchor.target = '_self';
  }

  // 5. Wrap the text in a span for isolated text editing in Universal Editor
  const textSpan = document.createElement('span');
  textSpan.textContent = buttonText;
  anchor.append(textSpan);

  // 6. Add descriptive aria-labels for screen reader accessibility
  const isNewTab = anchor.target === '_blank';
  const suffix = isNewTab ? ' (opens in a new tab)' : '';

  if (accessibilityLabel) {
    anchor.setAttribute('aria-label', `${accessibilityLabel}${suffix}`);
  } else if (isNewTab) {
    anchor.setAttribute('aria-label', `${buttonText}${suffix}`);
  }

  // 7. Flatten the DOM by replacing messy authoring tables with our clean link
  block.replaceChildren(anchor);
}
