export default function decorate(block) {
 // 1. Find the author-entered text and accessibility label elements
  const textEl = block.querySelector('[data-aue-prop="text"]');
  const labelEl = block.querySelector('[data-aue-prop="label"]');
  
  // 2. Find the link anchor nested inside the button container
  const linkAnchor = block.querySelector('.button-container a');
  
  // 3. Extract the target value (_blank or _self) from the next paragraph element
  let targetValue = '_self';
  if (linkAnchor && linkAnchor.closest('p')) {
    const targetSibling = linkAnchor.closest('p').nextElementSibling;
    if (targetSibling) {
      targetValue = targetSibling.textContent.trim();
    }
  }

  // 4. Get the raw text values or set fallback defaults
  const buttonText = textEl ? textEl.textContent.trim() : 'Click Here';
  const buttonHref = linkAnchor ? linkAnchor.getAttribute('href') : '#';
  const accessibilityLabel = labelEl ? labelEl.textContent.trim() : '';

 // 5. Create the clean, semantic anchor element for the final output
  const anchor = document.createElement('a');
  anchor.className = 'new-button__link';
  anchor.href = buttonHref;

  // 6. Apply the browser window target securely
  if (targetValue === '_blank' || targetValue === 'new tab') {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer'; // Protects performance and security
  } else {
    anchor.target = '_self';
  }

  // 7. Wrap the text in a span for isolated text editing in Universal Editor
  const textSpan = document.createElement('span');
  textSpan.textContent = buttonText;
  anchor.append(textSpan);

  // 8. Add descriptive aria-labels for screen reader accessibility
  const isNewTab = anchor.target === '_blank';
  const suffix = isNewTab ? ' (opens in a new tab)' : '';

  if (accessibilityLabel) {
    anchor.setAttribute('aria-label', `${accessibilityLabel}${suffix}`);
  } else if (isNewTab) {
    anchor.setAttribute('aria-label', `${buttonText}${suffix}`);
  }

  // 9. Flatten the DOM by replacing messy authoring tables with our clean link
  block.replaceChildren(anchor);
}