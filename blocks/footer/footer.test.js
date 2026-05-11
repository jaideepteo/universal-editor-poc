import decorate from './footer.js';
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

jest.mock('../../scripts/aem.js', () => ({
  getMetadata: jest.fn(),
}));

jest.mock('../fragment/fragment.js', () => ({
  loadFragment: jest.fn(),
}));

describe('Footer Block', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    jest.clearAllMocks();
  });

  test('should load footer fragment using metadata path', async () => {
    getMetadata.mockReturnValue('/custom-footer');

    const fragment = document.createElement('div');
    fragment.innerHTML = `
      <div class="footer-content">
        Footer Content
      </div>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(getMetadata).toHaveBeenCalledWith('footer');

    expect(loadFragment).toHaveBeenCalledWith('/custom-footer');
  });

  test('should use default footer path when metadata is absent', async () => {
    getMetadata.mockReturnValue(null);

    const fragment = document.createElement('div');

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(loadFragment).toHaveBeenCalledWith('/footer');
  });

  test('should clear existing block content', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');
    fragment.innerHTML = `
      <div>New Footer</div>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer">
        Old Content
      </div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(block.textContent).not.toContain('Old Content');
  });

  test('should append footer wrapper div into block', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');
    fragment.innerHTML = `
      <div class="footer-item">Footer Item</div>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(block.children.length).toBe(1);

    const wrapper = block.firstElementChild;

    expect(wrapper.tagName).toBe('DIV');
  });

  test('should move fragment children into footer wrapper', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');

    fragment.innerHTML = `
      <div class="footer-link">Link 1</div>
      <div class="footer-link">Link 2</div>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    const footerLinks = block.querySelectorAll('.footer-link');

    expect(footerLinks.length).toBe(2);
  });

  test('should handle empty fragment gracefully', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await expect(decorate(block)).resolves.not.toThrow();

    expect(block.children.length).toBe(1);
  });

  test('should preserve fragment child structure', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');

    fragment.innerHTML = `
      <section class="footer-section">
        <h2>Footer Heading</h2>
        <p>Footer Description</p>
      </section>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    const section = block.querySelector('.footer-section');

    expect(section).toBeTruthy();

    expect(section.querySelector('h2').textContent)
      .toBe('Footer Heading');

    expect(section.querySelector('p').textContent)
      .toBe('Footer Description');
  });

  test('should call loadFragment only once', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(loadFragment).toHaveBeenCalledTimes(1);
  });

  test('should append footer content into block', async () => {
    getMetadata.mockReturnValue('/footer');

    const fragment = document.createElement('div');

    fragment.innerHTML = `
      <div class="footer-content">
        Footer Loaded Successfully
      </div>
    `;

    loadFragment.mockResolvedValue(fragment);

    document.body.innerHTML = `
      <div class="footer"></div>
    `;

    const block = document.querySelector('.footer');

    await decorate(block);

    expect(block.querySelector('.footer-content'))
      .toBeTruthy();

    expect(block.textContent)
      .toContain('Footer Loaded Successfully');
  });
});