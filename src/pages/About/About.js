import { startCase } from 'lodash';
import { getPageUrl } from '../../shared/utils';

/**
 * @param {string} routeName
 * @returns {string}
 */
export default function renderAboutPage({ routeName }) {
  return `
    <p>
      This is <strong>${startCase(routeName)}</strong> page.
    </p>
    <a href="${getPageUrl()}">Return to home</a>
  `;
}
