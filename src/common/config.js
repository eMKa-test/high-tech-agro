// eslint-disable-next-line no-restricted-globals
const DOMAIN = location.origin;

const CONFIG = Object.freeze({
  DOMAIN,
  API_BASE_URL: `${DOMAIN}/api`,
});

export default CONFIG;
