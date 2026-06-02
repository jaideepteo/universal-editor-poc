import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
      const ogTitle = getMetadata('og:title');
      const ogDesc = getMetadata('og:description'); 
      console.log(ogDesc);
}
