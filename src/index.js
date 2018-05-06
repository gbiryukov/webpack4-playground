import { compose } from 'lodash/fp';
import renderLayout from './shared/Layout/Layout';
import renderHomePage from './pages/Home/Home';
import renderAboutPage from './pages/About/About';

(() => {
  const ROUTES = {
    'default': renderHomePage,
    'about-our-app': renderAboutPage,
  };

  function renderCurrentPage() {
    const routeName = location.hash.slice(1);
    const renderRoute = compose(
      renderLayout,
      ROUTES[routeName] || ROUTES.default
    );
    document.body.innerHTML = renderRoute({ routeName });
  }

  window.addEventListener('hashchange', renderCurrentPage, false);

  renderCurrentPage();
})();
