export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

export const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
export const GlobalCoins = () => `https://api.coingecko.com/api/v3/global`;

const test = {
  btc: 46557437.500488594,
  eth: 701675364.707205,
  ltc: 17261912557.096645,
  bch: 6350987969.481585,
  bnb: 4913709706.38313,
  eos: 925758670573.7244,
  xrp: 2368770810295.3706,
  xlm: 10163180027865.137,
  link: 137555445289.3695,
  dot: 103499159828.47408,
  yfi: 98005750.99652426,
  usd: 1806966775300.3098,
  aed: 6637041367714.498,
  ars: 196654257711989.97,
  aud: 2491807183139.1265,
  bdt: 155394081361889.06,
  bhd: 681277069357.9259,
  bmd: 1806966775300.3098,
  brl: 9116508774745.12,
  cad: 2304141034756.761,
  chf: 1689689210682.9944,
  clp: 1454264930429439.8,
  cny: 11501704918141.51,
  czk: 41027236649163.52,
  dkk: 12262618627220.504,
  eur: 1648183183854.3433,
  gbp: 1383392079568.611,
  hkd: 14147346410729.066,
  huf: 618393308298693.2,
  idr: 25852364002560290,
  ils: 5905725774414.986,
  inr: 138283103445455.03,
  jpy: 213094086011542.5,
  krw: 2240170749996444.8,
  kwd: 549655802478.2769,
  lkr: 460360401322895.06,
  mmk: 3210039957522468.5,
  mxn: 37719889344361.37,
  myr: 7598295290137.812,
  ngn: 750559789456487.5,
  nok: 16272093591000.781,
  nzd: 2656289947794.3853,
  php: 94593805396616.8,
  pkr: 323822742854941.5,
  pln: 7804000387837.983,
  rub: 200302086345361.56,
  sar: 6778732860432.907,
  sek: 17398672324596.625,
  sgd: 2464621368004.7324,
  thb: 60347269394704.35,
  try: 26697901579660.1,
  twd: 51435670652278.234,
  uah: 53076739807938.234,
  vef: 180931583210.82007,
  vnd: 41377768588947460,
  zar: 27239030305925.758,
  xdr: 1300492057851.3875,
  xag: 71175499726.02362,
  xau: 919475043.6115601,
  bits: 46557437500488.59,
  sats: 4655743750048859,
};
const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
console.log({ dada: sumValues(test) / 0.2239297485701956 });
