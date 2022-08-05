import * as tokenIcons from './tokenIcons';

export const contractAddresses = {
  sushi: {
    42: '0x4986843fde2b0dae6bdc54c8e16567614ea8786f',
    1: '0x4986843fde2b0dae6bdc54c8e16567614ea8786f', // aelf sashimi
  },
  sashimiBar: {
    42: '0x345Ce8Cf8b161aC7782B2316723140573E08901d',
    1: '0x345Ce8Cf8b161aC7782B2316723140573E08901d', // staging
  },
  sashimiRouter: {
    42: '0x31DB862DF7be09718a860c46ab17CA57966e69ed',
    1: '0x31DB862DF7be09718a860c46ab17CA57966e69ed'
  },
  investment: {
    42: '0x68E8BA00A4A580a4852DDF03028259141Bc80b93',
    1: '0x68E8BA00A4A580a4852DDF03028259141Bc80b93' // staging
  },
  masterChef: {
    42: '0x9e41322574f00232f4f092b8d29db11c46fe7496',
    1: '0x9e41322574f00232f4f092b8d29db11c46fe7496', // staging
  },
  weth: {
    42: '0xA050886815CFc52a24B9C4aD044ca199990B6690',
    1: '0xA050886815CFc52a24B9C4aD044ca199990B6690',
  },
};

export const sashimiAddress = '0x4986843fde2b0dae6bdc54c8e16567614ea8786f';
export const wethAddress = '0xA050886815CFc52a24B9C4aD044ca199990B6690';
export const wethSashimiLpPAddress = '0xc1c56af45d463a798d4ff5590c2d7d1b2ec8fbea';
export const supportedLendingInvestmentPools = [
  {
    lpAddress: '0xc1c56af45d463a798d4ff5590c2d7d1b2ec8fbea', // WETH-SASHIMI
    providerAddress: '0xfda70451c3716365E037993703854a5f3763Caae', // ETH vault provider
    depositAddress: '0xA050886815CFc52a24B9C4aD044ca199990B6690',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'WETH',
    tokenSymbol: 'WETH',
    icon: tokenIcons.eth,
  },
  {
    lpAddress: '0xc1c56af45d463a798d4ff5590c2d7d1b2ec8fbea', // WETH-SASHIMI
    providerAddress: '0xB267E85F798796f21f246BdEe06D458dDf863Ee0', // SASHIMI vault provider
    depositAddress: '0x4986843fde2b0dae6bdc54c8e16567614ea8786f',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'SASHIMI',
    tokenSymbol: 'SASHIMI',
    icon: tokenIcons.elf,
  },
  {
    lpAddress: '0xb3aeed31edbf9a646d76342a60c5f206761828a7', // WETH-ELF
    providerAddress: '0xe638E752acE06044213c45aef907ab3d30872742', // ELF vault provider
    depositAddress: '0xB5685232b185cAdF7C5F58217722Ac40BC4ec45e',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'ELF',
    tokenSymbol: 'ELF',
    icon: tokenIcons.elf,
  },
];

export const supportedInvestmentPools = [
  {
    lpAddresses: {
      42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
      1: '0x4b618087dae7765823bc47ffbf38c8ee8489f5ca', // WETH-SASHIMI
    },
    pivotLpAddresses: {
      42: '0x80a57ed061ee5f9816998ba9beaa46c314f98ec3',
      1: '0x80a57ed061ee5f9816998ba9beaa46c314f98ec3' // GOF-ETH
    },
    depositAddresses: {
      42: '0xA050886815CFc52a24B9C4aD044ca199990B6690', // WETH in kovan, ERC20
      1: '0xA050886815CFc52a24B9C4aD044ca199990B6690'
    },
    providerAddresses: {
      42: '0xB2E80611cDf7A9C42C867cDa659577de006E4FcC',
      1: '0xB2E80611cDf7A9C42C867cDa659577de006E4FcC'
    },
    depositTokenSymbol: 'WETH',
    tokenSymbol: 'GOF', // GOLFF // The token you get
    icon: '👜',
    sashimiIndex: 1,
    pivotTokenIndex: 0,
  }
];
// These pools get 0 point; [type pid]
export const unStakeOnlyPools = [];
// If is xxx-Sashimi Pool; [type pid]
// Support sashimi pair only. Used in FarmCards.tsx
export const notETHPairPools = [];

export const hiddenPools = [101, 102];

export const doublePools = [0, 1];
export const unStakeOnlyDoublePools = [];

export const waitingInfo = {
  waitingPool: [30, 31, 32, 33],
  startTime: 1601393400000
};

const xLPSupportedPools = [
  // xLP supported start
  // {
  //   pid: 0,
  //   lpAddresses: {
  //     42: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
  //     1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
  //   },
  //   tokenAddresses: {
  //     42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //     1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  //   },
  //   lpBarAddresses: {
  //     42: '0xA696eE9d188938Baa655052bB8727fA8702E59EE',
  //     1: '0xA696eE9d188938Baa655052bB8727fA8702E59EE',
  //   },
  //   name: 'Double Sashimi Party 1!',
  //   symbol: 'USDC-ETH UNI-V2 LP 1',
  //   tokenSymbol: 'WETH',
  //   icon: '🍣',
  // },
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     42: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
  //     1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
  //   },
  //   tokenAddresses: {
  //     42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //     1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  //   },
  //   lpBarAddresses: {
  //     42: '0x6e1B4632d83E5443F853Fe647AE671a6Ea8b35B6',
  //     1: '0x6e1B4632d83E5443F853Fe647AE671a6Ea8b35B6',
  //   },
  //   name: 'Double Sashimi Party 2!',
  //   symbol: 'USDC-ETH UNI-V2 LP 2',
  //   tokenSymbol: 'WETH',
  //   icon: '🍣',
  // },
];

const sashimiPlatePools = [
  {
    pid: 5,
    lpAddresses: {
      42: '0xc428db12ee200222488b6f94cafc373013fb1fb2', // extra: sashimiPlateContract use it
      1: '0xc428db12ee200222488b6f94cafc373013fb1fb2',
    },
    tokenAddresses: {
      42: '0xc428db12ee200222488b6f94cafc373013fb1fb2',
      1: '0xc428db12ee200222488b6f94cafc373013fb1fb2',
    },
    uniV2LPAddress: '0xc4ddd76bfbdcecbee50907074d00a5eafa1c2efa',
    name: 'SashimiPlate',
    symbol: 'DAI-ETH svUNI-V2',
    tokenSymbol: 'DAI',
    icon: '👨‍👩‍👧',
    isSashimiPlate: true,
  },
  {
    pid: 6,
    lpAddresses: {
      42: '0x39448f758f597127d5f72a4b7c6f5595810ff23d',
      1: '0x39448f758f597127d5f72a4b7c6f5595810ff23d',
    },
    tokenAddresses: {
      42: '0x39448f758f597127d5f72a4b7c6f5595810ff23d',
      1: '0x39448f758f597127d5f72a4b7c6f5595810ff23d',
    },
    uniV2LPAddress: '0xc4ddd76bfbdcecbee50907074d00a5eafa1c2efa',
    name: 'SashimiPlate',
    symbol: 'svDAI',
    tokenSymbol: 'DAI',
    icon: '👨‍👩‍',
    isSashimiPlate: true,
    sashimiPlateInfo: {
      mainTokenIndex: 0, // DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 2,
    },
  },
];

export const supportedPools = [
  ...sashimiPlatePools,
  ...xLPSupportedPools,
  {
    pid: 0,
    lpAddresses: {
      42: '0x1AE169F57e863e3a1a71250E6CeFf89F19fC8BF6',
      1: '0x1AE169F57e863e3a1a71250E6CeFf89F19fC8BF6',
    },
    tokenAddresses: {
      42: '0x89d5f2e52d36b85e72e25e8fe46d709d445c03fc',
      1: '0x89d5f2e52d36b85e72e25e8fe46d709d445c03fc',
    },
    name: 'FAKESASHIMI-ETH Party!',
    symbol: 'FAKESASHIMI-ETH SALP',
    tokenSymbol: 'FAKESASHIMI',
    icon: '🍣',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0x862AFAA0772B52427De9312ebEbb9f2cBe6D90d4',
      1: '0x862AFAA0772B52427De9312ebEbb9f2cBe6D90d4',
    },
    // Can not get eth value now;
    tokenAddresses: {
      42: '0x4bedb4cff3b8ea0474f534838e767c11d6b311f2',
      1: '0x4bedb4cff3b8ea0474f534838e767c11d6b311f2',
    },
    name: 'DAI-USDT Party!',
    symbol: 'DAI-USDT UNI-V2 LP',
    tokenSymbol: 'DAI',
    icon: '🍣',
  },
  {
    pid: 2,
    lpAddresses: {
      42: '0x28be2e8F93E5d3c12fcA9d0d81305922761d32F3',
      1: '0x28be2e8F93E5d3c12fcA9d0d81305922761d32F3',
    },
    // Can not get eth value now;
    tokenAddresses: {
      42: '0x4615fF2bf25B5b40E08Bf50C7eBb8Bd6C97Eb14F',
      1: '0x4615fF2bf25B5b40E08Bf50C7eBb8Bd6C97Eb14F',
    },
    name: 'ABC-ELF Party!',
    symbol: 'ABC-ELF UNI-V2 LP',
    tokenSymbol: 'ABC',
    icon: '🍣',
  },
  {
    pid: 3,
    lpAddresses: {
      42: '0x763c15ab515405731C536b2844514b75ab363417',
      1: '0x763c15ab515405731C536b2844514b75ab363417',
    },
    // Can not get eth value now;
    tokenAddresses: {
      42: '0x4bedb4cff3b8ea0474f534838e767c11d6b311f2',
      1: '0x4bedb4cff3b8ea0474f534838e767c11d6b311f2',
    },
    name: 'FAKESASHIMI-ABC Party!',
    symbol: 'FAKESASHIMI-ABC UNI-V2 LP',
    tokenSymbol: 'FAKESASHIMI',
    icon: '🍣',
  },
  {
    pid: 4,
    lpAddresses: {
      42: '0xe9A69D505E7752aBf3bd39078746D1c7fB5dBade',
      1: '0xe9A69D505E7752aBf3bd39078746D1c7fB5dBade',
    },
    // Can not get eth value now;
    tokenAddresses: {
      42: '0x59E8461b541Ef2C40383525Ff51eD646A51Ad455',
      1: '0x59E8461b541Ef2C40383525Ff51eD646A51Ad455',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x88Bc3df0Cffc2eE15f764e0709aB119F9146c776', // USDT-ETH
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 6],
      type: 10, // for normal pool
    },
    // Can not get apy directly
    name: 'ELF-USDT Party!',
    symbol: 'ELF-USDT UNI-V2 LP',
    tokenSymbol: 'ELF',
    icon: '🍣',
  },
  // nothing
  {
    pid: 100,
    lpAddresses: {
      42: '0xc1c56af45d463a798d4ff5590c2d7d1b2ec8fbea',
      1: '0xc1c56af45d463a798d4ff5590c2d7d1b2ec8fbea',
    },
    // Can not get eth value now;
    tokenAddresses: {
      42: '0x4986843fde2b0dae6bdc54c8e16567614ea8786f',
      1: '0x4986843fde2b0dae6bdc54c8e16567614ea8786f',
    },
    name: 'SASHIMI Party!',
    symbol: 'SASHIMI-ETH SALP',
    tokenSymbol: 'SASHIMI',
    icon: '🍣',
  }
];

// Vault
// NODE_ENV=development
// VUE_APP_USDT_ADDR = {"vaultAddr":"0xf4cd0917C2403fE10305B0F1FADdc35B637c3bd5", "stableCoinAddr":"0x448344fDF7295DBf0fC5DA825CA6355662a0e5AE", "wei":"mwei"}
// VUE_APP_DAI_ADDR =  {"vaultAddr":"0x49DDf6c6bE262DbEb1Cb99FccB144B2B806F082B", "stableCoinAddr":"0xFba5b8769a7033ab71718063eE57Bd7c764233db", "wei":"ether"}
// VUE_APP_USDC_ADDR = {"vaultAddr":"0x4890EfA1E90e3CaDB0280eE2768A7B5324249C05", "stableCoinAddr":"0x43418765AE9b55Ab366c91333166C05973Bf4de1", "wei":"mwei"}
// VUE_APP_WBTC_ADDR = {"vaultAddr":"0xC25b2e8503a19b0379925bAc416912f2c1d263D6", "stableCoinAddr":"0x01105d4f5740F8550DB6B3Dfdd5eD99d20B76C52", "wei":"ether"}
// VUE_APP_CHAIN_ID = 42
// VUE_APP_CONTROLLER = 0xce2217024E4f88150457E5E9B673DD9db7e7a756 // can get strategies of a vault.
export const vaultController = '0xD552d25aB6A1720f9b7952aB8598De6B80089225';
export const vaults = [
  // {
  //   // tokenName: 'USDT',
  //   tokenName: 'USDT-ETH',
  //   lpTokenName: 'USDT-ETH',
  //   vaultAddr: '0xf4cd0917C2403fE10305B0F1FADdc35B637c3bd5',
  //   stableCoinAddr: '0x448344fDF7295DBf0fC5DA825CA6355662a0e5AE',
  //   wei: 'mwei'
  // },
  {
    // tokenName: 'DAI',
    tokenName: 'DAI-ETH',
    lpTokenName: 'DAI-ETH',
    // vaultAddr: '0x49DDf6c6bE262DbEb1Cb99FccB144B2B806F082B',
    // stableCoinAddr: '0xFba5b8769a7033ab71718063eE57Bd7c764233db',
    vaultAddr: '0xc428db12ee200222488b6f94cafc373013fb1fb2',
    stableCoinAddr: '0xc4ddd76bfbdcecbee50907074d00a5eafa1c2efa', // LP token
    uniAddressOrSymbolA: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI Address
    uniAddressOrSymbolB: 'eth',
    wei: 'ether',
    startTime: (new Date(Date.UTC(2020, 9, 12 ,8, 30, 0))).getTime(), // use to get APY.
  },
  // {
  //   // tokenName: 'USDC',
  //   tokenName: 'USDC-ETH',
  //   lpTokenName: 'USDC-ETH',
  //   vaultAddr: '0x4890EfA1E90e3CaDB0280eE2768A7B5324249C05',
  //   stableCoinAddr: '0x43418765AE9b55Ab366c91333166C05973Bf4de1',
  //   wei: 'mwei'
  // },
  // {
  //   // tokenName: 'WBTC',
  //   tokenName: 'WBTC-ETH',
  //   lpTokenName: 'WBTC-ETH',
  //   vaultAddr: '0xC25b2e8503a19b0379925bAc416912f2c1d263D6',
  //   stableCoinAddr: '0x01105d4f5740F8550DB6B3Dfdd5eD99d20B76C52',
  //   wei: 'ether'
  // }
];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
