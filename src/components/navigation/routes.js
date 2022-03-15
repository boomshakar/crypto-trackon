export const routes = {
  newHome: '/',
  home: '/home',
  coinPage: '/coins/:id',
  newCoinPage: '/coin',
};

export function generateParamUrl(url, param) {
  const firstIndex = 0;
  return `${url.split(':')[firstIndex]}${param}`;
}
