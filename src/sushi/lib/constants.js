import * as testKovan from './constants/test-kovan';
import * as online from './constants/online';
import * as onlineTest from './constants/online-test';

const CHAIN_ENV = process.env.REACT_APP_CHAIN_ENV || 'main';

const output = {
  main: online,
  kovan: testKovan,
  'online-test': onlineTest
};

const WEI_UNIT_DECIMAL = {
  mwei: 6,
  ether: 18,
  wbtc: 8,
};

const TOKENS_DECIMAL = {
  USDT: 6,
  USDC: 6,
  SVUSDT: 6,
  SVUSDC: 6
};

export const {
  contractAddresses,
  sashimiAddress,
  wethAddress,
  wethSashimiLpPAddress,
  supportedInvestmentPools,
  supportedLendingInvestmentPools,
  unStakeOnlyPools,
  notETHPairPools,
  hiddenPools,
  doublePools,
  unStakeOnlyDoublePools,
  supportedPools,
  waitingInfo,
  vaultController,
  vaults,
  vaultStableTokenPriceAPI,
  tokenPriceAPI = 'https://min-api.cryptocompare.com/data/price', // ?fsym=ETH&tsyms=USD
  tokensDecimal = TOKENS_DECIMAL,
  weiUnitDecimal = WEI_UNIT_DECIMAL,
  timeADay = 86400000,
} = {
  ...output[CHAIN_ENV],
};
