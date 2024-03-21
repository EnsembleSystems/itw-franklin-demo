/**
 * loads and decorates the Discover Card
 * @param {Element} block The Discover Card block element
 */
export default async function decorate(block) {
  const grid = document.createElement('div');
  grid.classList = 'discover-cards-grid';
  [...block.children].forEach((row, i) => {
    if (i === 1) {
      row.classList = 'main-card';
      const child = row.children[0];
      child.classList = 'main-card-content';
      child.children[0].classList = 'image';
      child.children[1].classList = 'title';

      const link = document.createElement('a');
      link.href = `/posts/${child.children[1].textContent.replaceAll(' ', '-').toLowerCase()}`;
      link.append(child.children[0], child.children[1]);
      child.append(link);

      grid.append(row);
    } else if (i === 0) {
      row.classList = 'heading-card';
    } else {
      row.classList = 'card-column';
      [...row.children].forEach((item) => {
        if (item.children.length === 0) {
          item.classList = 'quote-card';
          item.innerHTML = `<p class="quote">${item.innerHTML}</p>`;
        } else if (item.children.length === 1) {
          item.classList = 'button-card';
          item.children[0].classList = 'btn-primary';
          item.children[0].innerHTML = `<span>${item.children[0].textContent}</span>`;
        } else if (item.children.length === 2) {
          item.classList = 'card';
          item.children[0].classList = 'image';
          item.children[1].classList = 'title';

          const link = document.createElement('a');
          link.href = `/Posts/${item.children[1].textContent.replaceAll(' ', '-').toLowerCase()}`;
          link.append(item.children[0], item.children[1]);
          item.append(link);
        }
        row.append(item);
      });
      grid.append(row);
    }
  });
  block.append(grid);
}
