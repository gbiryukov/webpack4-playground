import { upperCase } from 'lodash';
import { getPageUrl } from '../../shared/utils';

/**
 * @returns {string}
 */
export default function renderHomePage() {
  return `
    <p>
      Hi, this is <strong>${upperCase('Home')}</strong> page.
    </p>
    <a href="${getPageUrl('about-our-app')}">Go to about</a>
  `;
}
