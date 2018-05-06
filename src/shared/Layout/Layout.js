import 'normalize.css';
import styles from './Layout.css';

/**
 * @param {string} [children]
 * @returns {string}
 */
export default function renderLayout(children = '') {
  return `
    <div class="${styles.layout}">
      <div class="${styles.layout__container}">
        ${children}      
      </div>
    </div>
  `;
}
