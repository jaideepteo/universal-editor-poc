import decorate from './cards.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

jest.mock('../../scripts/aem.js', () => ({
    createOptimizedPicture: jest.fn(),
}));

jest.mock('../../scripts/scripts.js', () => ({
    moveInstrumentation: jest.fn(),
}));

describe('Cards Block', () => {
    beforeEach(() => {
        document.body.innerHTML = '';

        jest.clearAllMocks();

        createOptimizedPicture.mockImplementation((src, alt) => {
            const picture = document.createElement('picture');

            const img = document.createElement('img');
            img.src = src;
            img.alt = alt;

            picture.appendChild(img);

            return picture;
        });
    });

    test('should create ul and li structure', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <picture>
              <img src="/image.jpg" alt="Card Image">
            </picture>
          </div>
          <div>
            <p>Card Description</p>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        const ul = block.querySelector('ul');
        const li = block.querySelector('li');

        expect(ul).toBeTruthy();
        expect(li).toBeTruthy();
    });

    test('should assign cards-card-image class', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <picture>
              <img src="/image.jpg" alt="Image">
            </picture>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        const imageDiv = block.querySelector('.cards-card-image');

        expect(imageDiv).toBeTruthy();
    });

    test('should assign cards-card-body class', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <p>Card Body Content</p>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        const bodyDiv = block.querySelector('.cards-card-body');

        expect(bodyDiv).toBeTruthy();
    });

    test('should call createOptimizedPicture with correct parameters', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <picture>
              <img src="https://example.com/image.jpg" alt="Test Image">
            </picture>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        expect(createOptimizedPicture).toHaveBeenCalledWith(
            'https://example.com/image.jpg',
            'Test Image',
            false,
            [{ width: '750' }],
        );
    });

    test('should replace original picture with optimized picture', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <picture class="original-picture">
              <img src="/image.jpg" alt="Image">
            </picture>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        const optimizedPicture = block.querySelector('picture');
        const optimizedImg = optimizedPicture.querySelector('img');

        expect(optimizedPicture).toBeTruthy();
        expect(optimizedImg.src).toContain('/image.jpg');
    });

    test('should call moveInstrumentation for row and image', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <picture>
              <img src="/image.jpg" alt="Image">
            </picture>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        expect(moveInstrumentation).toHaveBeenCalled();
        expect(moveInstrumentation).toHaveBeenCalledTimes(2);
    });

    test('should replace block children with ul', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <p>Content</p>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        expect(block.children.length).toBe(1);
        expect(block.firstElementChild.tagName).toBe('UL');
    });

    test('should handle multiple card rows', () => {
        document.body.innerHTML = `
      <div class="cards">
        <div class="row">
          <div>
            <p>Card 1</p>
          </div>
        </div>

        <div class="row">
          <div>
            <p>Card 2</p>
          </div>
        </div>
      </div>
    `;

        const block = document.querySelector('.cards');

        decorate(block);

        const items = block.querySelectorAll('li');

        expect(items.length).toBe(2);
    });

    test('should handle empty block gracefully', () => {
        document.body.innerHTML = `
      <div class="cards"></div>
    `;

        const block = document.querySelector('.cards');

        expect(() => decorate(block)).not.toThrow();

        const ul = block.querySelector('ul');

        expect(ul).toBeTruthy();
    });
});