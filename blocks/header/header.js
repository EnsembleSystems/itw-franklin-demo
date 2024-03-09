import { getMetadata, decorateIcons } from '../../scripts/aem.js';

function navOnClick() {
  const list = this.parentNode.getElementsByTagName('ul');
  const fullNavLists = this.parentNode.parentNode.parentNode.getElementsByTagName('ul');

  for (let i = 0; i < fullNavLists.length; i += 1) {
    fullNavLists[i].className = 'nav-list nav-list-hidden';
  }

  if (list.length > 0) {
    list[0].className = 'nav-list nav-list-shown';
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();
    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML = html;

    [...nav.children].forEach((row, r) => {
      row.className = `nav${r}`;
    });

    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    decorateIcons(nav);
    navWrapper.append(nav);
    block.append(navWrapper);

    const headingContainer = document.querySelector('.heading');
    if (headingContainer) {
      const childDivs = headingContainer.querySelectorAll(':scope > div');
      childDivs.forEach((div, r) => {
        div.classList.add('menu-row');
        div.classList.add(`row-${r}`);
        const ulElements = div.querySelectorAll('ul');
        ulElements.forEach((ul) => {
          ul.className = 'nav-list nav-list-hidden';
        });

        const toggleElements = div.querySelectorAll('h3');
        toggleElements.forEach((elem) => {
          elem.onclick = navOnClick;
        });
      });
    }
  }
}
