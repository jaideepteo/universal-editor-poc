//import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('logo executed');

  const cols = [...block.children];

  const [logoimageEl, linkEl] = cols;

  const link = linkEl.querySelector('div a')?.getAttribute('href') || '#';

  // Build the link wrapper
  const newHtml = document.createElement('a');
  newHtml.className = 'logo-link';

  if (link) {
    newHtml.href = link;
    //moveInstrumentation(linkEl, newHtml);
  }

  // Extract logo image and alt text
  const logoCell = logoimageEl?.firstElementChild;

  if (logoCell?.querySelector('picture')) {
    const picture = logoCell.querySelector('picture');
    const img = picture.querySelector('img');

    const altText = img?.getAttribute('alt') || 'logo';
    img.setAttribute('alt', altText);

    //moveInstrumentation(logoimageEl, picture);

    newHtml.appendChild(picture);
  }

  block.appendChild(newHtml);

  //cols.forEach((col) => col.remove());
}