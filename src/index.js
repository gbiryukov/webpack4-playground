import { compose } from 'lodash/fp';
import renderLayout from './shared/Layout/Layout';

(() => {
  const ROUTES = {
    'default': () => import('./pages/Home/Home'),
    'about-our-app': () => import('./pages/About/About'),
  };

  async function renderCurrentPage() {
    const routeName = location.hash.slice(1);
    const getPageModule = ROUTES[routeName] || ROUTES.default;
    const pageModule = await getPageModule();
    const renderRoute = compose(
      renderLayout,
      pageModule.default,
    );
    document.body.innerHTML = renderRoute({ routeName });
  }

  window.addEventListener('hashchange', renderCurrentPage, false);

  renderCurrentPage();
})();
