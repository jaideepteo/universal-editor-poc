async function getPageTitle(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const html = await resp.text();
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].split('|')[0].trim() : null;
  } catch {
    return null;
  }
}

function buildBreadcrumbItem(label, url, position, isActive) {
  const li = document.createElement('li');
  li.setAttribute('itemprop', 'itemListElement');
  li.setAttribute('itemscope', '');
  li.setAttribute('itemtype', 'http://schema.org/ListItem');

  if (isActive) {
    li.setAttribute('aria-current', 'page');
    const span = document.createElement('span');
    span.setAttribute('itemprop', 'name');
    span.textContent = label;
    li.append(span);
  } else {
    const a = document.createElement('a');
    a.setAttribute('itemprop', 'item');
    a.href = url;
    const span = document.createElement('span');
    span.setAttribute('itemprop', 'name');
    span.textContent = label;
    a.append(span);
    li.append(a);
  }

  const meta = document.createElement('meta');
  meta.setAttribute('itemprop', 'position');
  meta.setAttribute('content', String(position));
  li.append(meta);

  return li;
}

export default async function decorate(block) {
  const pathSegments = window.location.pathname.split('/').filter(Boolean)
    .filter((seg) => seg !== 'index');

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'http://schema.org/BreadcrumbList');

  ol.append(buildBreadcrumbItem('Home', '/', 1, false));

  const titlePromises = pathSegments.slice(0, -1).map((_, i) => {
    const path = `/${pathSegments.slice(0, i + 1).join('/')}`;
    return getPageTitle(path).then((title) => ({ path, title, segment: pathSegments[i] }));
  });

  const parents = await Promise.all(titlePromises);

  parents.forEach((parent, i) => {
    const label = parent.title || parent.segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    ol.append(buildBreadcrumbItem(label, parent.path, i + 2, false));
  });

  const currentTitle = document.title.split('|')[0].trim()
    || pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  ol.append(buildBreadcrumbItem(currentTitle, '', pathSegments.length + 1, true));

  nav.append(ol);
  block.textContent = '';
  block.append(nav);
}
