import { startCase } from 'lodash';
import { getPageUrl } from '../../shared/utils';
import styles from './About.css';

/**
 * @param {string} routeName
 * @returns {string}
 */
export default function renderAboutPage({ routeName }) {
  return `
    <p class="${styles.green}">
      This is <strong>${startCase(routeName)}</strong> page.
    </p>
    <a href="${getPageUrl()}">Return to home</a>
  `;
}
