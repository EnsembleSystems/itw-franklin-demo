import { getMetadata } from '../../scripts/aem.js';

// eslint-disable-next-line import/prefer-default-export
export async function loadLazy(main) {
  const title = getMetadata('blog-title');
  const subtitle = getMetadata('subtitle');
  const quote = getMetadata('quote');

  const blog = main.children[0];

  // Create header format
  const image = main.querySelector('picture');
  const imageDiv = document.createElement('div');
  imageDiv.append(image);

  const titleDiv = document.createElement('div');
  titleDiv.classList = 'title';
  titleDiv.textContent = title;
  const subtitleDiv = document.createElement('div');
  subtitleDiv.classList = 'subtitle';
  subtitleDiv.textContent = subtitle;
  const titleContainer = document.createElement('div');
  titleContainer.classList = 'title-container';
  titleContainer.append(subtitleDiv, titleDiv);

  const blogHeading = document.createElement('div');
  blogHeading.classList = 'blog-heading';
  blogHeading.append(imageDiv, titleContainer);

  main.append(blogHeading);

  // Create blog post format
  const quoteDiv = document.createElement('div');
  quoteDiv.classList = 'quote';
  quoteDiv.textContent = quote;

  const blogContainer = document.createElement('div');
  blogContainer.classList = 'blog-container';
  blogContainer.append(quoteDiv, blog);

  main.append(blogContainer);

  // Add "View All Stories" button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList = 'button-container';
  const button = document.createElement('a');
  button.classList = 'btn-inverse';
  button.href = 'https://www.itw.com/blog/';
  const buttonText = document.createElement('span');
  buttonText.textContent = 'VIEW ALL STORIES';
  button.append(buttonText);
  buttonDiv.append(button);

  main.append(buttonDiv);
}
