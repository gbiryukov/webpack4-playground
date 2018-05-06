import { upperCase } from 'lodash';

/**
 * @returns {string}
 */
export default function renderHomePage() {
  return `
    <p>
      Hi, this is <strong>${upperCase('Home')}</strong> page.
    </p>
    <a href="#about-our-app">Go to about</a>
  `;
}
