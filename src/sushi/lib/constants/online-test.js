export const contractAddresses = {
  sushi: {
    42: '0x0FE5dA8828f7F2dFa5cdf181461E0f2039d765f5',
    1: '0x0FE5dA8828f7F2dFa5cdf181461E0f2039d765f5', // aelf sashimi
  },
  sashimiBar: {
    42: '0xfaC2681cB05Ba08De504e7FDBc2186B22d868f2A',
    1: '0xDbAc04dE5ec2C3F9f404C2CA6aC56ab0C731E640', // staging
  },
  sashimiRouter: {
    42: '0xe4FE6a45f354E845F954CdDeE6084603CEDB9410',
    1: '0xe4FE6a45f354E845F954CdDeE6084603CEDB9410'
  },
  // investment: {
  //   42: '0x46641A3aA421beA0207Ead6d807c847a2f599943',
  //   1: '0x8E6F2ADC3Df8F885CF2e06da6aeb4c80411d7C53' // staging
  // },
  investment: {
    42: '0xc05114cEF1F2AeA879A6Cf8E0a6eB3B3F5d7f98f',
    1: '0xc05114cEF1F2AeA879A6Cf8E0a6eB3B3F5d7f98f' // staging
  },
  masterChef: {
    42: '0xFC0F93aA4E79c0c5719ce8c74Cf33872F33a5c6E',
    1: '0xFC0F93aA4E79c0c5719ce8c74Cf33872F33a5c6E', // staging
  },
  weth: {
    42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
}

export const supportedInvestmentPools = [
  // {
  //   // CANDY - SASHIMI? pair
  //   lpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // TODO: replace ETH-SASHIMI -> GOLFF-SASHIMI
  //   },
  //   pivotLpAddresses: {
  //     42: '0x7c2580099eF4c34B788d3f3A192817f35dd68f8A',
  //     1: '0x9776a214272ab452f8c88c7576dcd0c6ffbfee14' // GOF-ETH
  //   },
  //   depositAddresses: {
  //     42: '0xA050886815CFc52a24B9C4aD044ca199990B6690', // WETH in kovan, ERC20
  //     1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  //   },
  //   providerAddresses: {
  //     42: '0xB2E80611cDf7A9C42C867cDa659577de006E4FcC',
  //     1: '0xB2E80611cDf7A9C42C867cDa659577de006E4FcC'
  //   },
  //   depositTokenSymbol: 'WETH',
  //   tokenSymbol: 'GOF', // Which token will I get, when I do the harvest？
  //   icon: '👜',
  //   sashimiIndex: 1,
  //   pivotTokenIndex: 0,
  // },
  {
    // CANDY - SASHIMI? pair
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA', // TODO: replace ETH-SASHIMI -> GOLFF-SASHIMI
    },
    pivotLpAddresses: {
      42: '0x359c138b1666aa2167aafc205a841ff432a23040',
      1: '0x359c138b1666aa2167aafc205a841ff432a23040' // GT-ETH
    },
    depositAddresses: {
      42: '0xe66747a101bff2dba3697199dcce5b743b454759', // WETH in kovan, ERC20
      1: '0xe66747a101bff2dba3697199dcce5b743b454759' // GT
    },
    providerAddresses: {
      42: '0x8f3b506aa2341fe9d76f773d02ec2b1ed156f8fc',
      1: '0x8f3b506aa2341fe9d76f773d02ec2b1ed156f8fc'
    },
    depositTokenSymbol: 'GT',
    tokenSymbol: 'GOF', // Which token will I get, when I do the harvest？
    icon: '👜',
    sashimiIndex: 1,
    pivotTokenIndex: 0,
  },
  // DeForce Investment
  {
    // CANDY - SASHIMI? pair
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
      42: '0x043cC38464f558563689A1329972614D4Cd2E211',
      1: '0x043cC38464f558563689A1329972614D4Cd2E211'
    },
    depositTokenSymbol: 'USDC',
    tokenSymbol: 'DF', // Which token will I get, when I do the harvest？
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
  {
    pid: 0,
    lpAddresses: {
      42: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0xA696eE9d188938Baa655052bB8727fA8702E59EE',
      1: '0xA696eE9d188938Baa655052bB8727fA8702E59EE',
    },
    name: 'Double Sashimi Party 1!',
    symbol: 'USDC-ETH UNI-V2 LP 1',
    tokenSymbol: 'WETH',
    icon: '🍣',
  },
  {
    pid: 1,
    lpAddresses: {
      42: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
    },
    tokenAddresses: {
      42: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    },
    lpBarAddresses: {
      42: '0x6e1B4632d83E5443F853Fe647AE671a6Ea8b35B6',
      1: '0x6e1B4632d83E5443F853Fe647AE671a6Ea8b35B6',
    },
    name: 'Double Sashimi Party 2!',
    symbol: 'USDC-ETH UNI-V2 LP 2',
    tokenSymbol: 'WETH',
    icon: '🍣',
  },
];

export const supportedPools = [
  ...xLPSupportedPools,
  {
    pid: 2,
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    name: 'USDC-ETH Party!',
    symbol: 'USDC-ETH UNI-V2 LP',
    tokenSymbol: 'WETH',
    icon: '🍣',
  },
  // Get Sashimi Price only.
  {
    pid: 102,
    lpAddresses: {
      42: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
      1: '0x4b618087DaE7765823BC47fFbF38C8Ee8489F5CA',
    },
    tokenAddresses: {
      42: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
      1: '0xC28E27870558cF22ADD83540d2126da2e4b464c2',
    },
    name: 'Sashimi Party!',
    symbol: 'SASHIMI-ETH UNI-V2 LP',
    tokenSymbol: 'SASHIMI',
    icon: '🍣',
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
    startTime: (new Date(Date.UTC(2020, 9, 13 ,10, 0, 0))).getTime(), // use to get APY.
  },
  {
    tokenName: 'USDC-ETH',
    lpTokenName: 'USDC-ETH',
    vaultAddr: '0xc5D00a4E730fC2e1C77764A74E5F1308A460de7F',
    stableCoinAddr: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc', // LP token
    wei: 'ether',
    startTime: (new Date(Date.UTC(2020, 9, 13 ,13, 0, 0))).getTime(), // use to get APY.
  },
  {
    tokenName: 'ETH-USDT',
    lpTokenName: 'ETH-USDT',
    vaultAddr: '0x8E95bc97B0C1B88Aa8708206C85c06299F778648',
    stableCoinAddr: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852', // LP token
    wei: 'ether',
    startTime: (new Date(Date.UTC(2020, 9, 13 ,13, 0, 0))).getTime(), // use to get APY.
  },
  {
    tokenName: 'WBTC-ETH',
    lpTokenName: 'WBTC-ETH',
    vaultAddr: '0x81885d776D2963941ec7434F30D61B851E9697FA',
    stableCoinAddr: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940', // LP token
    wei: 'ether',
    startTime: (new Date(Date.UTC(2020, 9, 13 ,13, 0, 0))).getTime(), // use to get APY.
  },
];

export const vaultStableTokenPriceAPI = 'http://39.98.34.153:8081/api/price';
