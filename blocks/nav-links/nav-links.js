function navOnClick() {
  const list = this.parentNode.getElementsByTagName('ul');
  const fullNavLists = this.parentNode.parentNode.parentNode.getElementsByTagName('ul');

  // forEach loop does not work with fullNavLists.
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < fullNavLists.length; i++) {
    fullNavLists[i].className = 'nav-list nav-list-hidden';
  }

  list[0].className = 'nav-list nav-list-shown';
}

export default function decorate(block) {
  [...block.children].forEach((row, r) => {
    row.className = `nav-links-row nav-links-row-${r}`;

    [...row.children].forEach((col, c) => {
      const list = col.getElementsByTagName('ul');

      if (list) {
        list[0].setAttribute('class', 'nav-list nav-list-hidden');
      }
      col.className = `nav-links-col nav-links-col-${c}`;
      col.firstElementChild.addEventListener('click', navOnClick);
    });
  });
}
