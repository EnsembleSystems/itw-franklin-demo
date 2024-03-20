export default function decorate(block) {
  const billboard = document.querySelector('div.billboard.block');
  const billBoardContainer = block.querySelector('.billboard > div');
  billBoardContainer.classList.add('billboard-container');

  const mainContentContainer = document.createElement('div');
  mainContentContainer.classList.add('main-content-container');
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  const billboardLines = document.createElement('div');
  billboardLines.classList.add('billboard-lines');
  const img = document.createElement('img');
  img.src = 'https://main--itw-franklin-demo--ensemblesystems.hlx.page/icons/4-trail-lines.svg';
  billboardLines.appendChild(img);
  billboard.appendChild(billboardLines);
  billboard.appendChild(mainContentContainer);
  billboard.appendChild(accordionContainer);

  const heading = block.querySelector('body > main > div > div > div > div:nth-child(2)');
  heading.classList.add('heading-container');

  const accordionOne = block.querySelector('body > main > div > div > div > div:nth-child(3)');
  accordionOne.classList.add('accordion');
  accordionOne.classList.add('1');

  const accordionTwo = block.querySelector('body > main > div > div > div > div:nth-child(4)');
  accordionTwo.classList.add('accordion');
  accordionTwo.classList.add('2');

  const accordionThree = block.querySelector('body > main > div > div > div > div:nth-child(5)');
  accordionThree.classList.add('accordion');
  accordionThree.classList.add('3');

  accordionContainer.appendChild(accordionOne);
  accordionContainer.appendChild(accordionTwo);
  accordionContainer.appendChild(accordionThree);
  mainContentContainer.appendChild(heading);
  mainContentContainer.appendChild(accordionContainer);

  const accordions = block.querySelectorAll('.accordion');

  accordions.forEach((accordion) => {
    const button = document.createElement('button');
    button.classList.add('accordion-btn');
    button.textContent = '+';
    accordion.insertBefore(button, accordion.firstChild);

    const divs = accordion.querySelectorAll('div');
    if (divs.length > 0) {
      divs[0].classList.add('primary');
    }
    if (divs.length > 1) {
      divs[1].classList.add('secondary', 'collapsed');
    }
  });

  const accordionBtns = block.querySelectorAll('.accordion-btn');
  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.accordion');
      const divs = accordion.querySelectorAll('div.secondary');
      accordion.classList.toggle('active');
      if (accordion.classList.contains('active')) {
        if (divs.length > 0) {
          divs[0].classList.remove('collapsed');
          divs[0].classList.add('active');
        }
        btn.textContent = '-';
      } else {
        if (divs.length > 0) {
          divs[0].classList.remove('active');
          divs[0].classList.add('collapsed');
        }
        btn.textContent = '+';
      }
    });
  });

  const accordionWrapper = document.createElement('div');
  accordionWrapper.classList.add('accordion-wrapper');
  accordionWrapper.appendChild(accordionContainer);
  mainContentContainer.appendChild(accordionWrapper);
}
