import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');

  let counter = 0;
  while (fragment.firstElementChild) {
    fragment.firstElementChild.className = `section${counter}`;
    counter += 1;
    footer.append(fragment.firstElementChild);
  }

  footer.className = 'footer-section-wrapper';

  block.append(footer);
}
