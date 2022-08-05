import * as tokenIcons from './tokenIcons';

export const contractAddresses = {
  sushi: {
    42: '0x89d5F2E52D36b85e72e25e8fE46d709D445c03Fc', // aelf sushi new one 9.9
    1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2', // aelf sashimi
  },
  sashimiBar: {
    42: '0xfaC2681cB05Ba08De504e7FDBc2186B22d868f2A', // aelf sushi new one 9.18
    1: '0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977', // aelf sashimi
  },
  sashimiRouter: {
    42: '0xe4FE6a45f354E845F954CdDeE6084603CEDB9410',
    1: '0xe4FE6a45f354E845F954CdDeE6084603CEDB9410'
  },
  // before 1024
  // investment: {
  //   42: '0xC380130F2b3Fa820CE3d1092FDDBf0dA732D13C9',
  //   1: '0x4ce106235B6d876c66117fdA1f6025E3Fb87D3ec'
  // },
  investment: {
    42: '0x3F966FA1c0606e19047ed72068D2857677E07EF4',
    1: '0x3F966FA1c0606e19047ed72068D2857677E07EF4'
  },
  masterChef: {
    42: '0x042036D6F0b5C246aA07Dd9688b46cf86Bd179C3', // aelf sushi new one 9.9
    1: '0x1daed74ed1dd7c9dabbe51361ac90a69d851234d', // aelf master
  },
  weth: {
    42: '0xA050886815CFc52a24B9C4aD044ca199990B6690', // aelf sushi
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // sushi use
  },
};

export const sashimiAddress = '0xC28E27870558cF22ADD83540d2126da2e4b464c2';
export const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const wethSashimiLpPAddress = '0x3fa4b0b3053413684d0b658689ede7907bb4d69d';
export const supportedLendingInvestmentPools = [
  {
    lpAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // WETH-SASHIMI
    providerAddress: '0x7Bc801A840a7c2c027f4E5e48Bf618348B0bCE2B', // ETH vault provider
    depositAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'WETH',
    tokenSymbol: 'WETH',
    icon: tokenIcons.eth,
  },
  {
    lpAddress: '0x51214310ac356b26df2a9caf3895398e533c4fa9', // DAI-ETH
    providerAddress: '0xfdeDB338C5E5A26ed5816091DFAF34B5616Cf2F4', // DAI vault provider
    depositAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'DAI',
    tokenSymbol: 'DAI',
    icon: tokenIcons.dai,
  },
  {
    lpAddress: '0x64a9d29305b9847ceee21558d3ce1f8e85ee4496', // USDC-ETH
    providerAddress: '0x7cf0569A5d1602068f2C1425BFE8352fD6d8B942', // USDC vault provider
    depositAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    depositTokenDecimal: 6,
    depositTokenSymbol: 'USDC',
    tokenSymbol: 'USDC',
    icon: tokenIcons.usdc,
  },
  {
    lpAddress: '0x490ccb3c835597ff31e525262235487f9426312b', // USDT-ETH
    providerAddress: '0x33A057E6061e3849954578E3Ae0Ae15e615E72Cf', // USDT vault provider
    depositAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    depositTokenDecimal: 6,
    depositTokenSymbol: 'USDT',
    tokenSymbol: 'USDT',
    icon: tokenIcons.usdt,
  },
  {
    lpAddress: '0x04d7eecd7decfc5cc335e4ba5fb6bb09a581be01', // WBTC-ETH
    providerAddress: '0x194402BC8Adcc11a77873996361efe40E9dcdfCb', // WBTC vault provider
    depositAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    depositTokenDecimal: 8,
    depositTokenSymbol: 'WBTC',
    tokenSymbol: 'WBTC',
    icon: tokenIcons.wbtc,
  },
  {
    lpAddress: '0x18492965eef77d1a101d77a394c32178090e98a6', // YFI-ETH
    providerAddress: '0xd3D3fc25B836a8fD49026787C4406F5791f891bE', // YFI vault provider
    depositAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'YFI',
    tokenSymbol: 'YFI',
    icon: tokenIcons.yfi,
  },
  {
    lpAddress: '0x28e240e04113877bf99354e1e4f43a79e59c535a', // ELF-ETH
    providerAddress: '0x206D84982e032950E3F87d64f86C7c4C7cb60FCC', // ELF vault provider
    depositAddress: '0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e',
    depositTokenDecimal: 18,
    depositTokenSymbol: 'ELF',
    tokenSymbol: 'ELF',
    icon: tokenIcons.elf,
  },
];

export const supportedInvestmentPools = [
  {
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // WETH-SASHIMI UNI LP
    },
    pivotLpAddresses: {
      42: '0x359c138b1666aa2167aafc205a841ff432a23040',
      1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
    },
    depositAddresses: {
      42: '0xe66747a101bff2dba3697199dcce5b743b454759',
      1: '0xe66747a101bff2dba3697199dcce5b743b454759' // GT
    },
    providerAddresses: {
      42: '0xE9886bBa3bA6A3C00144E1E068088eE879f560Cd',
      1: '0xE9886bBa3bA6A3C00144E1E068088eE879f560Cd'
    },
    depositTokenSymbol: 'GT',
    tokenSymbol: 'GOF', // GOLFF // The token you get
    icon: '💼',
    sashimiIndex: 1,
    pivotTokenIndex: 0,
  },
  // DeForce Investment
  {
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
    },
    pivotLpAddresses: {
      42: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      1: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // DAI-ETH
    },
    depositAddresses: {
      42: '0x6b175474e89094c44da98b954eedeac495271d0f', // WETH in kovan, ERC20
      1: '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI
    },
    providerAddresses: {
      42: '0x30D75a1232c0d28aA53c43D47eF7D3441cfeD1E3',
      1: '0x30D75a1232c0d28aA53c43D47eF7D3441cfeD1E3'
    },
    depositTokenSymbol: 'DAI',
    tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
    icon: '👜',
    sashimiIndex: 1,
    pivotTokenIndex: 0,
    hasRegularProfit: true,
  },
  {
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
    },
    pivotLpAddresses: {
      42: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc' // USDC-ETH
    },
    depositAddresses: {
      42: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // WETH in kovan, ERC20
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
    },
    providerAddresses: {
      42: '0x34CF6e94Cb4d3f7f9679584753e4447244f7CBB9',
      1: '0x34CF6e94Cb4d3f7f9679584753e4447244f7CBB9'
    },
    depositTokenSymbol: 'USDC',
    tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
    icon: '👝',
    sashimiIndex: 1,
    pivotTokenIndex: 0,
    hasRegularProfit: true,
  },
  {
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // ETH-SASHIMI
    },
    pivotLpAddresses: {
      42: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
      1: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // ETH-USDT USDT-ETH
    },
    depositAddresses: {
      42: '0xdac17f958d2ee523a2206206994597c13d831ec7', // WETH in kovan, ERC20
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7' // USDT
    },
    providerAddresses: {
      42: '0x8010685EaE3228886D2Ce438c1C2C9066227da96',
      1: '0x8010685EaE3228886D2Ce438c1C2C9066227da96'
    },
    depositTokenSymbol: 'USDT',
    tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
    icon: '🧳',
    sashimiIndex: 1,
    pivotTokenIndex: 1,
    hasRegularProfit: true,
  }
  // {
  //   lpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x4b618087dae7765823bc47ffbf38c8ee8489f5ca', // WETH-SASHIMI
  //   },
  //   pivotLpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
  //   },
  //   depositAddresses: {
  //     42: '0xA050886815CFc52a24B9C4aD044ca199990B6690', // WETH in kovan, ERC20
  //     1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  //   },
  //   providerAddresses: {
  //     42: '0xeC0C65A04b985F1F162F13E7Df667bBF4804B621',
  //     1: '0xeC0C65A04b985F1F162F13E7Df667bBF4804B621'
  //   },
  //   depositTokenSymbol: 'WETH',
  //   tokenSymbol: 'GOF', // GOLFF // The token you get
  //   icon: '👜',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  // },
  // {
  //   lpAddresses: {
  //     42: '0xb819c827a0dc04e403099310317bd75b8a0a43fa',
  //     // 1: '0xaf46c4cf1cb2a669ce2f7bc1e7a53f0da8c7c574', // HT-SASHIMI UNI LP
  //     1: '0x4b618087dae7765823bc47ffbf38c8ee8489f5ca', // WETH-SASHIMI UNI LP
  //     // 1: '0xceea282be8da0f3f4b2bc57bfd89f4b7dd4454b1', // HT-SASHIMI SALP
  //   },
  //   pivotLpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
  //   },
  //   depositAddresses: {
  //     42: '0x0FE180FC7548efbc2dEe32Eb208403639a01aaa5', // WETH in kovan, ERC20
  //     1: '0x6f259637dcd74c767781e37bc6133cd6a68aa161' // Huobi
  //   },
  //   providerAddresses: {
  //     42: '0x9492d7d2CB08EEF7C825a8199a4704056C808518',
  //     1: '0x9492d7d2CB08EEF7C825a8199a4704056C808518'
  //   },
  //   depositTokenSymbol: 'HT',
  //   tokenSymbol: 'GOF', // GOLFF // The token you get
  //   icon: '👝',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  // },
  // {
  //   lpAddresses: {
  //     42: '0xb819c827a0dc04e403099310317bd75b8a0a43fa',
  //     1: '0x4b618087dae7765823bc47ffbf38c8ee8489f5ca', // WETH-SASHIMI UNI LP
  //   },
  //   pivotLpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
  //   },
  //   depositAddresses: {
  //     42: '0x6b175474e89094c44da98b954eedeac495271d0f',
  //     1: '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI
  //   },
  //   // TODO: waiting contract deploy
  //   providerAddresses: {
  //     // 42: '0x9492d7d2CB08EEF7C825a8199a4704056C808518',
  //     // 1: '0x9492d7d2CB08EEF7C825a8199a4704056C808518'
  //     42: '0x65d34f76B6a34BAfE0E03877C3ce68F79B18c394',
  //     1: '0x65d34f76B6a34BAfE0E03877C3ce68F79B18c394'
  //   },
  //   depositTokenSymbol: 'DAI',
  //   tokenSymbol: 'GOF', // GOLFF // The token you get
  //   icon: '🧳',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  // },
];
// These pools get 0 point; [type pid]
const unStakeOnlyPools20210225 = [1, 2, 3, 5, 8, 10, 21, 32, 33, 42, 43, 52, 53, 54];
// export const unStakeOnlyPools = [0, 1, 3, 4, 5, 6, 8, 13, 14, 15, 16, 18, 19, 20, 21, 25];
// const unStakeOnlyPools1215 = [6, 23, 24, 41, 44, 45, 46, 47, 48, 49, 51];
const unStakeOnlyPools1215 = [6, 24, 41, 44, 45, 46, 47, 48, 51]; // rm 23 49 in 20210225
// const unStakeOnlyPools1122 = [10, 12, 17, 22, 29, 30, 31, 34, 35, 36, 37]; remove 10 in 2020.12.15
const unStakeOnlyPools1122 = [12, 17, 22, 29, 30, 31, 34, 35, 36, 37];
// export const unStakeOnlyPools = [0, 10, 12, 17, 21, 23, 24, 22, 29, 30, 31, 34, 35, 36, 37];
// export const unStakeOnlyPools = [0, 1, 3, 4, 5, 6, 8, 13, 14, 15, 16, 18, 19, 20, 21, 25, ...unStakeOnlyPools1122];
export const unStakeOnlyPools = [4, 13, 14, 15, 16, 18, 19, 20, 25, ...unStakeOnlyPools1122, ...unStakeOnlyPools1215, ...unStakeOnlyPools20210225];
// If is xxx-Sashimi Pool; [type pid]
// Support sashimi pair only. Used in FarmCards.tsx
export const notETHPairPools = [10, 12, 13, 14, 15, 16, 22, 23, 24, 30];

export const hiddenPools = [101, 55];

export const doublePools = [26, 27, 28, 29, 101];
export const unStakeOnlyDoublePools = [];

const getWaitingPools = (start, end) => {
  const array = [];
  for (let i = 0; i <= end - start; i++) {
    array.push(start + i);
  }
  return array;
};
export const waitingInfo = {
  waitingPool: getWaitingPools(56, 57),
  startTime: 1614248282008
};

// 0928 UNI LP
const xLPSupportedPools = [
  // xLP supported start
  {
    pid: 26,
    lpAddresses: {
      42: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      1: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0xE835db5C6145f6AC2CD1f697C271bcab022766Ad',
      1: '0xE835db5C6145f6AC2CD1f697C271bcab022766Ad',
    },
    name: 'Double happiness!',
    symbol: '\xa0DAI-ETH UNI-V2 LP', // and blank to make it different with the normal farm symbol
    tokenSymbol: 'WETH',
    icon: '🍗',
  },
  // 0925
  {
    pid: 27,
    lpAddresses: {
      42: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0xD4F7CA1e212c5203074ECD9912dD803426eF4e10',
      1: '0xD4F7CA1e212c5203074ECD9912dD803426eF4e10',
    },
    name: 'Double happiness!',
    symbol: '\xa0USDC-ETH UNI-V2 LP', // and blank to make it different with the normal farm symbol
    tokenSymbol: 'WETH',
    icon: '🍖',
  },
  {
    pid: 28,
    lpAddresses: {
      42: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
      1: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0x9EC7De79572312d00f536b856B9E6fE7d0a37AF1',
      1: '0x9EC7De79572312d00f536b856B9E6fE7d0a37AF1',
    },
    name: 'Double happiness!',
    symbol: '\xa0ETH-USDT UNI-V2 LP', // and blank to make it different with the normal farm symbol
    tokenSymbol: 'WETH',
    icon: '🥩',
  },
  {
    pid: 29,
    lpAddresses: {
      42: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
      1: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0xc8b5B728165F5e59690bA486e4086027f34635Bd',
      1: '0xc8b5B728165F5e59690bA486e4086027f34635Bd',
    },
    name: 'Double happiness!',
    symbol: '\xa0WBTC-ETH UNI-V2 LP', // and blank to make it different with the normal farm symbol
    tokenSymbol: 'WETH',
    icon: '🥓',
  },
];

const newHiddenPool1215 = [
  // Lending, Hidden.
  // Not lp, is ERC20 token named lSASHIMI
  {
    pid: 55,
    lpAddresses: {
      42: '0x5e199C36F9681a32c996E84C464824F6A868acbd',
      1: '0x5e199C36F9681a32c996E84C464824F6A868acbd',
    },
    tokenAddresses: {
      42: '0x5e199C36F9681a32c996E84C464824F6A868acbd',
      1: '0x5e199C36F9681a32c996E84C464824F6A868acbd',
    },
    name: 'Hidden',
    symbol: 'Hidden',
    tokenSymbol: 'Lending',
    icon: '🔥🔥',
  },
];

const newNormalPool20210225 = [
  {
    pid: 56,
    lpAddresses: {
      42: '0xB50C6C684305cEC944d8BD4b7CE9e4a315aA4793',
      1: '0xB50C6C684305cEC944d8BD4b7CE9e4a315aA4793',
    },
    tokenAddresses: {
      42: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x490ccb3c835597ff31e525262235487f9426312b', // ETH-USDT
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 6],
      type: 10, // for normal pool
    },
    name: 'renBTC',
    symbol: 'renBTC-USDT SALP LP',
    tokenSymbol: 'renBTC',
    icon: '🌮',
  },
  {
    pid: 57,
    lpAddresses: {
      42: '0x5c5CAb005510F72eB23c332848B0C7D26E3078Ea',
      1: '0x5c5CAb005510F72eB23c332848B0C7D26E3078Ea',
    },
    tokenAddresses: {
      42: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x490ccb3c835597ff31e525262235487f9426312b', // ETH-USDT
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 6],
      type: 10, // for normal pool
    },
    name: 'WBTC',
    symbol: 'WBTC-USDT SALP LP',
    tokenSymbol: 'WBTC',
    icon: '🌯',
  },
];

const newNormalPool1124 = [
  {
    pid: 41,
    lpAddresses: {
      42: '0x4C3909f3C254583F3E349dB4b7bf954CE5c4b0D0',
      1: '0x4C3909f3C254583F3E349dB4b7bf954CE5c4b0D0',
    },
    tokenAddresses: {
      42: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
      1: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    },
    name: 'AAVE',
    symbol: 'AAVE-ETH SALP LP',
    tokenSymbol: 'AAVE',
    icon: '🍍',
  },
  {
    pid: 42,
    lpAddresses: {
      42: '0x5915F96014a343f6A9BFB6863F3393b81E50a3B4',
      1: '0x5915F96014a343f6A9BFB6863F3393b81E50a3B4',
    },
    tokenAddresses: {
      42: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
      1: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    },
    name: 'BUSD',
    symbol: 'BUSD-ETH SALP LP',
    tokenSymbol: 'BUSD',
    icon: '🥭',
  },
  {
    pid: 43,
    lpAddresses: {
      42: '0x419539e88081dB92e34F26BC7308b9D85DD297E7',
      1: '0x419539e88081dB92e34F26BC7308b9D85DD297E7',
    },
    tokenAddresses: {
      42: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
      1: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    },
    name: 'OMG',
    symbol: 'OMG-ETH SALP LP',
    tokenSymbol: 'OMG',
    icon: '🍑',
  },
  {
    pid: 44,
    lpAddresses: {
      42: '0x19583A9EcE888C5E84FCfc865e076AA7c10a45cb',
      1: '0x19583A9EcE888C5E84FCfc865e076AA7c10a45cb',
    },
    tokenAddresses: {
      42: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
      1: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    },
    name: 'SUSHI',
    symbol: 'SUSHI-ETH SALP LP',
    tokenSymbol: 'SUSHI',
    icon: '🍒',
  },
  {
    pid: 45,
    lpAddresses: {
      42: '0x20978E3eD5716d526732156067968363C473e7c4',
      1: '0x20978E3eD5716d526732156067968363C473e7c4',
    },
    tokenAddresses: {
      42: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      1: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    },
    name: 'CRV',
    symbol: 'CRV-ETH SALP LP',
    tokenSymbol: 'CRV',
    icon: '🍈',
  },
  {
    pid: 46,
    lpAddresses: {
      42: '0x8767CC91765Cb624777005CfFeBde6B2cf6481fb',
      1: '0x8767CC91765Cb624777005CfFeBde6B2cf6481fb',
    },
    tokenAddresses: {
      42: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      1: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    },
    name: 'COMP',
    symbol: 'COMP-ETH SALP LP',
    tokenSymbol: 'COMP',
    icon: '🍓',
  },
  {
    pid: 47,
    lpAddresses: {
      42: '0xF2Bdb6D1a7BC18666940AdBCA8931AA9166A8AB5',
      1: '0xF2Bdb6D1a7BC18666940AdBCA8931AA9166A8AB5',
    },
    tokenAddresses: {
      42: '0x0000000000085d4780B73119b644AE5ecd22b376',
      1: '0x0000000000085d4780B73119b644AE5ecd22b376',
    },
    name: 'TUSD',
    symbol: 'TUSD-ETH SALP LP',
    tokenSymbol: 'TUSD',
    icon: '🍇',
  },
  {
    pid: 48,
    lpAddresses: {
      42: '0x2c6a4f2f02a18782448c5b162ffae0907ac37e36',
      1: '0x2c6a4f2f02a18782448c5b162ffae0907ac37e36',
    },
    tokenAddresses: {
      42: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
      1: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
    },
    name: 'SXP',
    symbol: 'SXP-ETH SALP LP',
    tokenSymbol: 'SXP',
    icon: '🍉',
  },
  {
    pid: 49,
    lpAddresses: {
      42: '0x267df9a4986a1cbf586c4d0d6f3b7ec48799f863',
      1: '0x267df9a4986a1cbf586c4d0d6f3b7ec48799f863',
    },
    tokenAddresses: {
      42: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    // uniV2Pivot && uniV2LPAddress && sashimiPlateInfo,sashimiPlateInfo.type=10
    // eg. you can get apy from pairs like ELF-USDT through ETH-USDT.
    uniV2Pivot: true,
    uniV2LPAddress: '0x490ccb3c835597ff31e525262235487f9426312b', // ETH-USDT
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 6],
      type: 10, // for normal pool
    },

    name: 'ELF',
    symbol: 'ELF-USDT SALP LP',
    tokenSymbol: 'ELF',
    icon: '🍌',
  },
  {
    pid: 50,
    lpAddresses: {
      42: '0xc6e811c8538883cf971f3fb49c40b7b73ab06db7',
      1: '0xc6e811c8538883cf971f3fb49c40b7b73ab06db7',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // ETH-SASHIMI
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'WBTC',
    symbol: 'SASHIMI-WBTC SALP LP',
    tokenSymbol: 'WBTC',
    icon: '🍋',
  },
  {
    pid: 51,
    lpAddresses: {
      42: '0x864c85da885b7c80f95ebd3c0de606494e8ee7e7',
      1: '0x864c85da885b7c80f95ebd3c0de606494e8ee7e7',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // ETH-SASHIMI
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'DAI',
    symbol: 'SASHIMI-DAI SALP LP',
    tokenSymbol: 'DAI',
    icon: '🍊',
  },
  {
    pid: 52,
    lpAddresses: {
      42: '0xdba059c900308f66040c689d2597e5833f883b0c',
      1: '0xdba059c900308f66040c689d2597e5833f883b0c',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // ETH-SASHIMI
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'UNI',
    symbol: 'SASHIMI-UNI SALP LP',
    tokenSymbol: 'UNI',
    icon: '🍐',
  },
  {
    pid: 53,
    lpAddresses: {
      42: '0x60d6ccc51519b2f7c01a882cd18b81a64c5a1fbe',
      1: '0x60d6ccc51519b2f7c01a882cd18b81a64c5a1fbe',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // ETH-SASHIMI
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'SUSHI',
    symbol: 'SASHIMI-SUSHI SALP LP',
    tokenSymbol: 'SUSHI',
    icon: '🍎',
  },
  {
    pid: 54,
    lpAddresses: {
      42: '0x13ef8c51bf82096ba7afa01a3c4c6fc74ad7aefb',
      1: '0x13ef8c51bf82096ba7afa01a3c4c6fc74ad7aefb',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    uniV2Pivot: true,
    uniV2LPAddress: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d', // ETH-SASHIMI
    sashimiPlateInfo: {
      mainTokenIndex: 1, // eg. DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 10, // for normal pool
    },

    name: 'YFI',
    symbol: 'SASHIMI-YFI SALP LP',
    tokenSymbol: 'YFI',
    icon: '🍏',
  },
];

const newNormalPool1021 = [
  {
    pid: 38,
    lpAddresses: {
      42: '0xe6cB949e11bEB2a7b48f4cb5bFD8724501cfdA91',
      1: '0xe6cB949e11bEB2a7b48f4cb5bFD8724501cfdA91',
    },
    tokenAddresses: {
      42: '0xe6cB949e11bEB2a7b48f4cb5bFD8724501cfdA91',
      1: '0xe6cB949e11bEB2a7b48f4cb5bFD8724501cfdA91',
    },
    uniV2LPAddress: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
    name: 'SashimiPlate Party!',
    symbol: 'svDAI',
    tokenSymbol: 'DAI',
    icon: '👨‍👦',
    isSashimiPlate: true,
    sashimiPlateInfo: {
      mainTokenIndex: 0, // DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
      tokensDecimal: [18, 18],
      type: 2,
    },
  },
  {
    pid: 39,
    lpAddresses: {
      42: '0x722669a18852c659110D4a1E44f9647Fc44EdCc2',
      1: '0x722669a18852c659110D4a1E44f9647Fc44EdCc2',
    },
    tokenAddresses: {
      42: '0x722669a18852c659110D4a1E44f9647Fc44EdCc2',
      1: '0x722669a18852c659110D4a1E44f9647Fc44EdCc2',
    },
    uniV2LPAddress: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    name: 'SashimiPlate Party!',
    symbol: 'svUSDT',
    tokenSymbol: 'USDT',
    decimal: 6,
    icon: '👨‍👧',
    isSashimiPlate: true,
    sashimiPlateInfo: {
      mainTokenIndex: 1,
      tokensDecimal: [18, 6],
      type: 2,
    },
  },
  {
    pid: 40,
    lpAddresses: {
      42: '0x4221330F24b26f20457f7c7c925CFc46b1541CA6',
      1: '0x4221330F24b26f20457f7c7c925CFc46b1541CA6',
    },
    tokenAddresses: {
      42: '0x4221330F24b26f20457f7c7c925CFc46b1541CA6',
      1: '0x4221330F24b26f20457f7c7c925CFc46b1541CA6',
    },
    uniV2LPAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
    name: 'SashimiPlate Party!',
    symbol: 'svUSDC',
    tokenSymbol: 'USDC',
    decimal: 6,
    icon: '👩‍👦',
    isSashimiPlate: true,
    sashimiPlateInfo: {
      mainTokenIndex: 0,
      tokensDecimal: [6, 18],
      type: 2,
    },
  },
];

const newNormalPool1014 = [
  {
    pid: 34,
    lpAddresses: {
      42: '0x56BB940D92AE9a45EBDc77e94C28B960CffD6168',
      1: '0x56BB940D92AE9a45EBDc77e94C28B960CffD6168',
    },
    tokenAddresses: {
      42: '0x56BB940D92AE9a45EBDc77e94C28B960CffD6168',
      1: '0x56BB940D92AE9a45EBDc77e94C28B960CffD6168',
    },
    uniV2LPAddress: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
    name: 'SashimiPlate Party!',
    symbol: 'DAI-ETH svUNI-V2',
    tokenSymbol: 'DAI',
    icon: '👨‍👩‍👧',
    isSashimiPlate: true,
  },
  {
    pid: 35,
    lpAddresses: {
      42: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
      1: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
    },
    tokenAddresses: {
      42: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
      1: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
    },
    uniV2LPAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
    name: 'SashimiPlate Party!',
    symbol: 'USDC-ETH svUNI-V2',
    tokenSymbol: 'USDC',
    icon: '👨‍👨‍👦',
    isSashimiPlate: true,
  },
  {
    pid: 36,
    lpAddresses: {
      42: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
      1: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
    },
    tokenAddresses: {
      42: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
      1: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
    },
    uniV2LPAddress: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    name: 'SashimiPlate Party!',
    symbol: 'ETH-USDT svUNI-V2',
    tokenSymbol: 'USDT',
    icon: '👨‍👨‍👧',
    isSashimiPlate: true,
  },
  {
    pid: 37,
    lpAddresses: {
      42: '0x81885d776D2963941ec7434F30D61B851E9697FA',
      1: '0x81885d776D2963941ec7434F30D61B851E9697FA',
    },
    tokenAddresses: {
      42: '0x81885d776D2963941ec7434F30D61B851E9697FA',
      1: '0x81885d776D2963941ec7434F30D61B851E9697FA',
    },
    uniV2LPAddress: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
    name: 'SashimiPlate Party!',
    symbol: 'WBTC-ETH svUNI-V2',
    tokenSymbol: 'WBTC',
    icon: '👩‍👩‍👦',
    isSashimiPlate: true,
  },
];

const newNormalPool0939 = [
  {
    pid: 2,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x51214310ac356b26df2a9caf3895398e533c4fa9',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    name: 'Donald DAI',
    symbol: 'DAI-ETH SALP LP',
    tokenSymbol: 'DAI',
    icon: '🦆',
  },
];

const newNormalPools = [
  {
    pid: 30,
    lpAddresses: {
      42: '0x96559937e9c4475160CA040b16cDA93E3EfBD75A',
      1: '0x96559937e9c4475160CA040b16cDA93E3EfBD75A',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'GAT love SASHIMI!',
    symbol: 'GAT-SASHIMI SALP LP',
    tokenSymbol: 'GAT',
    icon: '🍭',
  },
  {
    pid: 31,
    lpAddresses: {
      42: '0xd16d65266A65F6b149dE2849a1a36fe54693aD48',
      1: '0xd16d65266A65F6b149dE2849a1a36fe54693aD48',
    },
    tokenAddresses: {
      42: '0x687174f8c49ceb7729d925c3a961507ea4ac7b28',
      1: '0x687174f8c49ceb7729d925c3a961507ea4ac7b28',
    },
    name: 'Global Awards Token!',
    symbol: 'GAT-ETH SALP LP',
    tokenSymbol: 'GAT',
    icon: '🍯',
  },
  {
    pid: 32,
    lpAddresses: {
      42: '0xC57D7265f0e5239afe37c4167acF027747efD752',
      1: '0xC57D7265f0e5239afe37c4167acF027747efD752',
    },
    tokenAddresses: {
      42: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
      1: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
    },
    name: 'Huobi Token!',
    symbol: 'HT-ETH SALP LP',
    tokenSymbol: 'HT',
    icon: '🥜',
  },
  {
    pid: 33,
    lpAddresses: {
      42: '0xE24b430952bdB793B0E6753D14C4FEC9B8A41813',
      1: '0xE24b430952bdB793B0E6753D14C4FEC9B8A41813',
    },
    tokenAddresses: {
      42: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    name: 'Uniswap!',
    symbol: 'UNI-ETH SALP LP',
    tokenSymbol: 'UNISWAP',
    icon: '🦄',
  }
];

// 0928 Normal Farm -> SASHIMI LP
export const supportedPools = [
  ...xLPSupportedPools,
  // xLP supported end
  {
    pid: 9,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x3fa4b0b3053413684d0b658689ede7907bb4d69d',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'Sashimi Party!',
    symbol: 'SASHIMI-ETH SALP LP',
    tokenSymbol: 'SASHIMI',
    icon: '🍣',
  },
  ...newNormalPool20210225,
  ...newHiddenPool1215,
  ...newNormalPool1124,
  ...newNormalPool1021,
  ...newNormalPool1014,
  ...newNormalPool0939,
  ...newNormalPools,
  // 0917
  {
    pid: 22,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xCEea282be8Da0F3F4b2Bc57bFd89F4b7Dd4454b1',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'HT love Sashimi!',
    symbol: 'HT-SASHIMI SALP LP',
    tokenSymbol: 'Huobi Token',
    icon: '🥂',
  },
  {
    pid: 23,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x5dB60350383433F53147101e3E6cE1D5193c5671',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'USDT love Sashimi!',
    symbol: 'USDT-SASHIMI SALP LP',
    tokenSymbol: 'USDT',
    icon: '🍻',
  },
  {
    pid: 24,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x81e23D17f07D4D95Dcb9FD070b44332D2f34A874',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'USDC love Sashimi!',
    symbol: 'USDC-SASHIMI SALP LP',
    tokenSymbol: 'USDC',
    icon: '🍷',
  },

  // old
  {
    pid: 10,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xf7ba0272e5bdd4911c1baedb362700652959edaf',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'elf love Sashimi!🧝🍱',
    symbol: 'SASHIMI-ELF SALP LP',
    tokenSymbol: 'ELF',
    icon: '🍱',
  },
  {
    pid: 25,
    lpAddresses: {
      42: '0xd9f91070371987eee3e500e90de5333e0c43d031',
      1: '0xbD61299162735Bc01C56eA295776BfF4A03E4a46',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'MX!',
    symbol: 'MXC-ETH SALP LP',
    tokenSymbol: 'MXC',
    icon: '🌱'
  },
  // SASHIMI new
  {
    pid: 12,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x2b773b3db41971c069f79c257ab60bdc8bd1ae5f',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'GT love Sashimi!',
    symbol: 'GT-SASHIMI SALP LP',
    tokenSymbol: 'Gate Token',
    icon: '🍙',
  },
  {
    pid: 13,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xcf2bf14f541b98a36128f1021faadf22f475dd3e',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'LRC love Sashimi!',
    symbol: 'LRC-SASHIMI SALP LP',
    tokenSymbol: 'LRC',
    icon: '🍘',
  },
  {
    pid: 14,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xcc6a812a1deb467763d4cb42d7100d7ecadf752d',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'KNC love Sashimi!',
    symbol: 'KNC-SASHIMI SALP LP',
    tokenSymbol: 'KNC',
    icon: '🍥',
  },
  {
    pid: 15,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x9e8d793671bbdf376703eabff4251f3085fa1ef1',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'REN love Sashimi!',
    symbol: 'REN-SASHIMI SALP LP',
    tokenSymbol: 'REN',
    icon: '🥠',
  },
  {
    pid: 16,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x010f098d4b7e925c9490a901b52665676ced5580',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'YFII love Sashimi!',
    symbol: 'YFII-SASHIMI SALP LP',
    tokenSymbol: 'YFII',
    icon: '🦪',
  },
  // SASHIMI End

  // New ETH
  {
    pid: 17,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xb9f8077fe932e96a8572652feee35609c2809850',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xe66747a101bff2dba3697199dcce5b743b454759',
    },
    name: 'Gate Token',
    symbol: 'GT-ETH SALP LP',
    tokenSymbol: 'GT',
    icon: '🍝',
  },
  {
    pid: 18,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x2881d04e1211aed648d3fd94a76e902a29280027',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    },
    name: 'LRC',
    symbol: 'LRC-ETH SALP LP',
    tokenSymbol: 'LRC',
    icon: '🍜',
  },
  {
    pid: 19,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xBDE0CDAB0a66378a400D2f5E3fdE0de29A11ED56',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    },
    name: 'KNC',
    symbol: 'KNC-ETH SALP LP',
    tokenSymbol: 'KNC',
    icon: '🍲',
  },
  {
    pid: 20,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xf066f1dd4d7c0392eb7633b2c777644e09f0d3fb',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x408e41876cccdc0f92210600ef50372656052a38',
    },
    name: 'REN',
    symbol: 'REN-ETH SALP LP',
    tokenSymbol: 'REN',
    icon: '🍛',
  },
  {
    pid: 21,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x55493cbe3aea30e6dcdffc70a736d82ed026d9e0',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    },
    name: 'YFII',
    symbol: 'YFII-ETH SALP LP',
    tokenSymbol: 'YFII',
    icon: '🍳',
  },

  // ETH Start
  {
    pid: 7,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x28E240E04113877Bf99354E1E4f43a79E59c535A',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e',
    },
    name: 'elf garden 🧝🧝‍♂️🧝‍♀',
    symbol: 'ELF-ETH SALP LP',
    tokenSymbol: 'ELF',
    icon: '🧝',
  },
  {
    pid: 8,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x04d7eecd7decfc5cc335e4ba5fb6bb09a581be01',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    },
    name: 'BTC Satoshi',
    symbol: 'WBTC-ETH SALP LP',
    tokenSymbol: 'WBTC',
    icon: '₿',
  },

  // Others
  {
    pid: 0,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x490ccb3c835597ff31e525262235487f9426312b',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'Tether Turtle',
    symbol: 'ETH-USDT SALP LP',
    tokenSymbol: 'USDT',
    icon: '🐢',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x64a9D29305b9847cEEE21558d3Ce1f8E85Ee4496',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    name: 'Circle Snail',
    symbol: 'USDC-ETH SALP LP',
    tokenSymbol: 'USDC',
    icon: '🐌',
  },
  {
    pid: 3,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x18492965eef77d1a101d77a394c32178090e98a6',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    },
    name: 'YFI Whale',
    symbol: 'YFI-ETH SALP LP',
    tokenSymbol: 'YFI',
    icon: '🐋',
  },
  {
    pid: 4,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x6ab539Bffd571AEE39D6EAeD50BA79D3627E2055',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    },
    name: 'Aave Boar',
    symbol: 'LEND-ETH SALP LP',
    tokenSymbol: 'LEND',
    icon: '🐗',
  },
  {
    pid: 5,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0xde1621bc3e8be5927e8a8be068cea62f74f876ce',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    name: 'Toadie Marine',
    symbol: 'LINK-ETH SALP LP',
    tokenSymbol: 'LINK',
    icon: '🐸',
  },
  {
    pid: 6,
    lpAddresses: {
      42: '0xb21f5d46e1756cfeb34496636d38f97dc8552415',
      1: '0x4e8Efbb0627d6816FE93A94430ed4b1e831FE4a1',
    },
    tokenAddresses: {
      42: '0xf2c73AF42FbAC096FE8F591899C5fc8bCB13884B',
      1: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    },
    name: 'Synthetic Snake',
    symbol: 'SNX-ETH SALP LP',
    tokenSymbol: 'SNX',
    icon: '🐍',
  },
  // Burn
  {
    pid: 11,
    lpAddresses: {
      42: '0x0000000000000000000000000000000000000000',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // 0x00 actual
    },
    tokenAddresses: {
      42: '0x0000000000000000000000000000000000000000',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2', // 0x00 actual
    },
    name: 'Reduce Mint',
    symbol: 'Nothing',
    tokenSymbol: 'SASHIMI',
    icon: '🔥',
  },
  // UNI, Hidden
  {
    pid: 101,
    lpAddresses: {
      42: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
      1: '0xd3d2e2692501a5c9ca623199d38826e513033a17', // 0x00 actual
    },
    tokenAddresses: {
      42: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // 0x00 actual
    },
    name: 'Hidden',
    symbol: 'Hidden',
    tokenSymbol: 'UNI',
    icon: '🔥',
  },
];

// Vault
// TODO: replace
// NODE_ENV=development
// VUE_APP_USDT_ADDR = {"vaultAddr":"0xf4cd0917C2403fE10305B0F1FADdc35B637c3bd5", "stableCoinAddr":"0x448344fDF7295DBf0fC5DA825CA6355662a0e5AE", "wei":"mwei"}
// VUE_APP_DAI_ADDR =  {"vaultAddr":"0x49DDf6c6bE262DbEb1Cb99FccB144B2B806F082B", "stableCoinAddr":"0xFba5b8769a7033ab71718063eE57Bd7c764233db", "wei":"ether"}
// VUE_APP_USDC_ADDR = {"vaultAddr":"0x4890EfA1E90e3CaDB0280eE2768A7B5324249C05", "stableCoinAddr":"0x43418765AE9b55Ab366c91333166C05973Bf4de1", "wei":"mwei"}
// VUE_APP_WBTC_ADDR = {"vaultAddr":"0xC25b2e8503a19b0379925bAc416912f2c1d263D6", "stableCoinAddr":"0x01105d4f5740F8550DB6B3Dfdd5eD99d20B76C52", "wei":"ether"}
// VUE_APP_CHAIN_ID = 42
// VUE_APP_CONTROLLER = 0xce2217024E4f88150457E5E9B673DD9db7e7a756 // can get strategies of a vault.
export const vaultController = '0x3884eab512bB0475100997271EC83163DAa944AE';
export const vaults = [
  {
    tokenName: 'DAI-ETH',
    lpTokenName: 'DAI-ETH',
    vaultAddr: '0x56BB940D92AE9a45EBDc77e94C28B960CffD6168',
    stableCoinAddr: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11', // LP token
    wei: 'ether',
  },
  {
    tokenName: 'USDC-ETH',
    lpTokenName: 'USDC-ETH',
    vaultAddr: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
    stableCoinAddr: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc', // LP token
    wei: 'ether',
  },
  {
    tokenName: 'ETH-USDT',
    lpTokenName: 'ETH-USDT',
    vaultAddr: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
    stableCoinAddr: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852', // LP token
    wei: 'ether',
  },
  {
    tokenName: 'WBTC-ETH',
    lpTokenName: 'WBTC-ETH',
    vaultAddr: '0x81885d776D2963941ec7434F30D61B851E9697FA',
    stableCoinAddr: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940', // LP token
    wei: 'ether',
  },
  {
    tokenName: 'DAI',
    lpTokenName: 'DAI',
    vaultAddr: '0xe6cB949e11bEB2a7b48f4cb5bFD8724501cfdA91',
    stableCoinAddr: '0x6b175474e89094c44da98b954eedeac495271d0f', // stable token
    wei: 'ether',
    isStable: true,
    apyTemp: '7.19',
  },
  {
    tokenName: 'USDT',
    lpTokenName: 'USDT',
    vaultAddr: '0x722669a18852c659110D4a1E44f9647Fc44EdCc2',
    stableCoinAddr: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // stable token
    wei: 'mwei',
    isStable: true,
    apyTemp: '6.88',
  },
  {
    tokenName: 'USDC',
    lpTokenName: 'USDC',
    vaultAddr: '0x4221330F24b26f20457f7c7c925CFc46b1541CA6',
    stableCoinAddr: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // stable token
    wei: 'mwei',
    isStable: true,
    apyTemp: '4.77',
  }
];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
