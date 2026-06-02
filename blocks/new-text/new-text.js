export default function decorate(block) {
  // Find the rich-text element that holds the author's content
  const richTextContainer = block.querySelector('[data-aue-type="richtext"]');
  // If the content element is missing, stop the code here to avoid errors
  if (!richTextContainer) {
    return;
  }

  // Add a clean CSS class name to style the text content easily
  richTextContainer.classList.add('new-text__content');

  // Find wrapper div that EDS generated automatically
  const parentRow = block.querySelector(':scope > div');

  if (parentRow) {
    // Replace the raw inner content of the block with just our targeted content div
    block.replaceChildren(richTextContainer);
  }
}
