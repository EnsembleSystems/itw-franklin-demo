import { getMetadata, decorateIcons } from '../../scripts/aem.js';

/**
 * handles click events on navigation items to toggle visibility of their associated dropdown lists.
 * hides all other nav lists before showing the clicked item's list, ensuring only one dropdown is
 * expanded at a time.
 */
function navOnClick() {
  // find all ul elements with the class .nav-list within the .heading container
  const navLists = document.querySelectorAll('.dropdown-container ul');
  const overlay = document.querySelector('.overlay');
  const menuItems = document.querySelectorAll('.menu-items h3');
  let isAnyListShown = false; // flag to track if any list is shown

  menuItems.forEach((item) => {
    item.classList.remove('active');
  });

  // hide all ul lists except the one corresponding to the clicked h3
  navLists.forEach((list) => {
    if (list.classList.contains(this.id)) {
      // Toggle the .nav-list-shown class
      list.classList.toggle('nav-list-shown');
      list.classList.toggle('nav-list-hidden');

      if (list.classList.contains('nav-list-shown')) {
        isAnyListShown = true;
        document
          .querySelector(`.menu-items h3#${this.id}`)
          .classList.add('active');
      }
    } else {
      list.classList.remove('nav-list-shown');
      list.classList.add('nav-list-hidden');
    }
    if (isAnyListShown) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  });
}

function toggleSearch() {
  const searchbar = document.querySelector('#searchbar');
  searchbar.classList.toggle('collapsed');
}

function createSearchBar() {
  const searchBarHTML = `
    <div id="searchbar" class="collapsed">
      <div class="search-box">
        <div class="panel-outer">
          <div class="panel-inner">
            <form action="/search" method="get">
              <input type="text" placeholder="search" id="input">
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  const nav0 = document.querySelector('.nav0');
  if (nav0) {
    nav0.insertAdjacentHTML('beforeend', searchBarHTML);
    nav0.onclick = toggleSearch;

    const searchBar = document.querySelector('#searchbar');
    searchBar.onclick = (e) => {
      e.stopPropagation();
    };
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

  const overlay = document.createElement('div');
  overlay.className = 'overlay';

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
    nav.append(overlay);
    block.append(navWrapper);
    createSearchBar();

    const headingContainer = document.querySelector('.heading');
    if (headingContainer) {
      const childDivs = headingContainer.querySelectorAll(':scope > div');
      childDivs.forEach((div, r) => {
        // find the h3 and ul elements within the current div
        const h3 = div.querySelector('h3');
        const ul = div.querySelector('ul');

        if (h3 && ul) {
          // add the h3 id as a class to the ul element
          ul.classList.add(h3.id);
          // Tten hide the ul by adding nav-list-hidden
          ul.classList.add('nav-list-hidden');
        }

        // Add classes to the div as before
        div.classList.add('menu-row');
        div.classList.add(`row-${r}`);
      });

      // create a new empty div
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('menu-items');
      headingContainer.prepend(emptyDiv);

      const dropdownContainer = document.createElement('div');
      const navTwo = document.querySelector('.nav2');
      dropdownContainer.classList.add('dropdown-container');
      navTwo.appendChild(dropdownContainer);
      const ulElements = headingContainer.querySelectorAll('ul');
      ulElements.forEach((ul) => {
        dropdownContainer.appendChild(ul.cloneNode(true));
        ul.remove();
      });

      // move each h3 to the empty div
      const h3Elements = headingContainer.querySelectorAll('h3');
      h3Elements.forEach((h3) => {
        emptyDiv.appendChild(h3.cloneNode(true)); // clone the h3 and append to the empty div
        h3.remove(); // remove the original h3 from its current position
      });

      const menuRows = document.querySelectorAll('.menu-row');
      menuRows.forEach((row) => {
        row.remove();
      });

      // re-attach onclick event to the moved h3 elements in the new div
      const movedToggleElements = emptyDiv.querySelectorAll('h3');
      movedToggleElements.forEach((elem) => {
        elem.onclick = navOnClick;
      });
    }
  }
}
