import decorate from './logo.js';

describe('Custom Logo Block', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should create anchor element with logo-link class', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div>
          <picture>
            <img src="/logo.png" alt="Company Logo">
          </picture>
        </div>

        <div>
          <div>
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    const anchor = block.querySelector('a.logo-link');

    expect(anchor).toBeTruthy();
  });

  test('should set href from link element', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div>
          <picture>
            <img src="/logo.png" alt="Logo">
          </picture>
        </div>

        <div>
          <div>
            <a href="/dashboard">Dashboard</a>
          </div>
        </div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    const anchor = block.querySelector('.logo-link');

    expect(anchor.href).toContain('/dashboard');
  });

  test('should default href to # when link is missing', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div>
          <picture>
            <img src="/logo.png" alt="Logo">
          </picture>
        </div>

        <div></div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    const anchor = block.querySelector('.logo-link');

    expect(anchor.getAttribute('href')).toBe('#');
  });

  test('should append picture inside anchor', () => {
  document.body.innerHTML = `
    <div class="logo-block">
      <div>
        <div>
          <picture class="logo-picture">
            <img src="/logo.png" alt="Logo">
          </picture>
        </div>
      </div>

      <div>
        <div>
          <a href="/home">Home</a>
        </div>
      </div>
    </div>
  `;

  const block = document.querySelector('.logo-block');

  decorate(block);

  const picture = block.querySelector('.logo-link picture');

  expect(picture).toBeTruthy();
  expect(picture.classList.contains('logo-picture')).toBe(true);
});

 test('should preserve existing alt text', () => {
  document.body.innerHTML = `
    <div class="logo-block">
      <div>
        <div>
          <picture>
            <img src="/logo.png" alt="My Company Logo">
          </picture>
        </div>
      </div>

      <div>
        <div>
          <a href="/home">Home</a>
        </div>
      </div>
    </div>
  `;

  const block = document.querySelector('.logo-block');

  decorate(block);

  const img = block.querySelector('.logo-link img');

  expect(img).toBeTruthy();
  expect(img.getAttribute('alt')).toBe('My Company Logo');
});

  test('should set default alt text when alt is missing', () => {
  document.body.innerHTML = `
    <div class="logo-block">
      <div>
        <div>
          <picture>
            <img src="/logo.png">
          </picture>
        </div>
      </div>

      <div>
        <div>
          <a href="/home">Home</a>
        </div>
      </div>
    </div>
  `;

  const block = document.querySelector('.logo-block');

  decorate(block);

  const img = block.querySelector('.logo-link img');

  expect(img).toBeTruthy();
  expect(img.getAttribute('alt')).toBe('logo');
});

  test('should remove original columns after decoration', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div class="logo-col">
          <picture>
            <img src="/logo.png" alt="Logo">
          </picture>
        </div>

        <div class="link-col">
          <div>
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    expect(block.querySelector('.logo-col')).toBeFalsy();
    expect(block.querySelector('.link-col')).toBeFalsy();
  });

  test('should append only one logo-link anchor', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div>
          <picture>
            <img src="/logo.png" alt="Logo">
          </picture>
        </div>

        <div>
          <div>
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    const anchors = block.querySelectorAll('.logo-link');

    expect(anchors.length).toBe(1);
  });

  
  test('should move picture into newly created anchor', () => {
    document.body.innerHTML = `
      <div class="logo-block">
        <div>
          <div>
            <picture>
              <img src="/logo.png" alt="Logo">
            </picture>
          </div>
        </div>

        <div>
          <div>
            <a href="/products">Products</a>
          </div>
        </div>
      </div>
    `;

    const block = document.querySelector('.logo-block');

    decorate(block);

    const anchor = block.querySelector('.logo-link');
    const picture = anchor.querySelector('picture');

    expect(picture).toBeTruthy();
  });
});