export const routes = {
  home: '/',
  newHome: '/home',
  CoinPage: 'coins/:id',
  newCoinPage: '/coinview',
};

export function generateParamUrl(url, param) {
  const firstIndex = 0;
  return `${url.split(':')[firstIndex]}${param}`;
}
