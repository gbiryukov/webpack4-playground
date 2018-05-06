const isProd = process.env.NODE_ENV === 'production';

/**
 * @param {*<T>} value
 * @returns {*<T>|null}
 */
function ifProd(value) {
  return isProd ? value : null;
}

module.exports = {
  isProd,
  ifProd,
};
