import { startCase } from 'lodash';

/**
 * @param {string} routeName
 * @returns {string}
 */
export default function renderAboutPage({ routeName }) {
  return `
    <p>
      This is <strong>${startCase(routeName)}</strong> page.
    </p>
    <a href="#">Return to home</a>
  `;
}
