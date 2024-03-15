export default function decorate(block) {
  const cardsContainer = block.querySelector('.cards-small > div');
  cardsContainer.classList.add('row');

  const columns = document.querySelectorAll('.cards-small > div > div');
  columns.forEach((col, i) => {
    col.classList.add(`col-${i + 1}`);
  });

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  const col2 = block.querySelector('.col-2');
  const contentPadding = document.createElement('div');
  contentPadding.classList.add('content-padding');
  const buttonContainers = col2.querySelectorAll('.button-container');

  while (col2.firstChild) {
    contentPadding.appendChild(col2.firstChild);
  }

  buttonContainers.forEach((btn, index) => {
    const link = btn.querySelector('a');
    if (link) {
      const span = document.createElement('span');
      span.textContent = link.textContent;
      link.textContent = '';
      link.appendChild(span);

      // Assign class based on the index
      if (index === 0) { // First .button-container
        link.classList.add('btn-inverse');
      } else if (index === 1) { // Second .button-container
        link.classList.add('btn-primary');
      }
    }
    btnContainer.appendChild(btn);
  });

  contentPadding.appendChild(btnContainer);
  col2.appendChild(contentPadding);
}
