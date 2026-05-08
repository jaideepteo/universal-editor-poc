export default function decorate(block) {
  const cols = [...block.children];
  const [logoimageEl, linkEl] = cols;
  const link = linkEl.querySelector('div a')?.getAttribute('href') || '#';
  const newHtml = document.createElement('a');
  newHtml.className = 'logo-link';
  if (link) {
    newHtml.href = link;
  }
  const logoCell = logoimageEl?.firstElementChild;
  if (logoCell?.querySelector('picture')) {
    const picture = logoCell.querySelector('picture');
    const img = picture.querySelector('img');
    const altText = img?.getAttribute('alt') || 'logo';
    img.setAttribute('alt', altText);
    newHtml.appendChild(picture);
  }
  block.appendChild(newHtml);
  cols.forEach((col) => col.remove());
}
