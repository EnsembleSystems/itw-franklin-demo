import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.className = 'nav';

  let counter = 0;
  while (fragment.firstElementChild) {
    fragment.firstElementChild.className = `nav${counter}`;
    counter += 1;
    nav.append(fragment.firstElementChild);
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}

/*
  Notes:
  - Search bar and another icon when pressed are missing.

  - Currently having difficulty setting the background of
  the drop down menu to fill the entire width of the page
  without causing further visual bugs to the nav list headers.

  - Issue with the main section not recognizing header's space.
  Use of 'A' characters are used to temporarily fill in space
  for the picture used for testing.
*/
