import { ethers } from 'ethers'
import { Contract } from 'web3-eth-contract'
import ERC20Abi from './lib/abi/erc20.json'

import BigNumber from 'bignumber.js'
import { supportedPools, tokensDecimal } from './lib/constants'
import UNIV2PairAbi from './lib/abi/uni_v2_lp';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}

export const getSashimiRouterAddress = (sushi) => {
  return sushi && sushi.sashimiRouterAddress
}

export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getSashimiBarContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sashimiBar
}

export const getInvestmentContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.investment
}

export const getSashimiRouterContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.sashimiRouter
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          lpBarAddress,
          lpBarContract,
          isSashimiPlate,
          sashimiPlateInfo,
          sashimiPlateContract,
          uniV2LPContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpBarAddress,
          lpBarContract,
          isSashimiPlate,
          sashimiPlateInfo,
          sashimiPlateContract,
          uniV2LPContract,
          earnToken: 'sashimi',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : []
}

export const getInvestments = (sushi) => {
  return sushi
    ? sushi.contracts.investmentPools.map(
      ({
         name,
         symbol,
         icon,
         tokenAddress,
         tokenSymbol,
         tokenContract,
         lpAddress,
         lpContract,
         pivotLpAddress,
         pivotLpContract,
         depositAddress,
         depositTokenSymbol,
         sashimiIndex,
         pivotTokenIndex,
         providerAddress,
         hasRegularProfit,
       }) => ({
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        pivotLpAddress,
        pivotLpContract,
        lpContract,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        depositAddress,
        depositTokenSymbol,
        sashimiIndex,
        pivotTokenIndex,
        providerAddress,
        hasRegularProfit,
        // earnToken: 'sushi',
        earnToken: 'sashimi',
        earnTokenAddress: sushi.contracts.sushi.options.address,
        icon,
      }),
    )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  try {
    const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
    const totalAllocPoint = await masterChefContract.methods
      .totalAllocPoint()
      .call()
    return {
      poolWeight: new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint)),
      allocPoint: new BigNumber(allocPoint),
      totalAllocPoint: new BigNumber(totalAllocPoint)
    }
  } catch {
    return {
      poolWeight: new BigNumber(0),
      allocPoint: new BigNumber(0),
      totalAllocPoint: new BigNumber(0)
    }
  }
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingSashimi(pid, account).call();
}

// TODO: 1. If we use xxxSwap not fork from uniswap, we need new methods to get value.
// TODO: refactor, use strategy instead of if/else
export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
  lpBarContract, // not required
  routerContract,  // not required
  isSashimiPlate, // not required
  sashimiPlateInfo, // not required
  sashimiPlateContract, // not required
  uniV2LPContract, // not required
) => {
  if (sashimiPlateInfo && sashimiPlateInfo.type === 10) {
    return await getTotalLPWethValueNormalPool(masterChefContract, wethContract, lpContract, tokenContract, pid, routerContract, sashimiPlateInfo, uniV2LPContract);
  }
  // Get balance of the token address
  let tokenAmountWholeLP;
  let lpContractWeth;
  let portionLp;

  let sashimiPlateStablePirceInEthValue = 0;
  let sashimiPlateTotalStableEthValue = 0;
  // TODO: different function to get tokenAmountWholeLP/lpContractWeth/portionLp
  if (isSashimiPlate) {
    // svUNI-V2/svStable(like svDAI svUSDT) amount
    tokenAmountWholeLP = await sashimiPlateContract.methods
      .totalSupply()
      .call();
    lpContractWeth = await wethContract.methods
      .balanceOf(uniV2LPContract.options.address)
      .call();
    if (sashimiPlateInfo && sashimiPlateInfo.type === 2) {
      const {mainTokenIndex, tokensDecimal} = sashimiPlateInfo;
      const ethIndex = 1 - mainTokenIndex;
      const reserves = await uniV2LPContract.methods.getReserves().call();
      const ethBalance = new BigNumber(reserves[ethIndex]).div(10 ** tokensDecimal[ethIndex]);
      const stableBalance = new BigNumber(reserves[mainTokenIndex]).div(10 ** tokensDecimal[mainTokenIndex]);
      sashimiPlateStablePirceInEthValue = ethBalance.div(stableBalance);
    }
  } else if (routerContract) {
    tokenAmountWholeLP = await routerContract.methods
      .getTokenInPair(
        lpContract.options.address,
        tokenContract.options.address
        ).call()
    // Get total weth value for the lpContract = w1
    lpContractWeth = await routerContract.methods
      .getTokenInPair(
        lpContract.options.address,
        wethContract.options.address
      ).call()
  } else {
    tokenAmountWholeLP = await tokenContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()
  }

  // Get the share of lpContract that masterChefContract owns
  if (isSashimiPlate) {
    // svUNI-V2/svStable(like svUSDT) of masterChefContract
    const balance = await sashimiPlateContract.methods
      .balanceOf(masterChefContract.options.address)
      .call();
    // svUNI-V2/svStable totalSupply
    const totalSupply = await sashimiPlateContract.methods
      .totalSupply()
      .call();
    const portionSV = new BigNumber(balance).div(new BigNumber(totalSupply));

    const totalSupplyUNIV2LP = await uniV2LPContract.methods.totalSupply().call();
    // UNI-V2 LP amount of the pool
    const totalLpOfSashimiPlate = await sashimiPlateContract.methods.balance().call();
    portionLp = new BigNumber(totalLpOfSashimiPlate).times(portionSV).div(totalSupplyUNIV2LP);
    if (sashimiPlateInfo && sashimiPlateInfo.type === 2) {
      const {mainTokenIndex, tokensDecimal} = sashimiPlateInfo;
      const stableBalance = await sashimiPlateContract.methods.balance().call();
      const stableBalanceOfMasterChef = new BigNumber(stableBalance).div(10 ** tokensDecimal[mainTokenIndex]).times(portionSV);
      sashimiPlateTotalStableEthValue = stableBalanceOfMasterChef.times(sashimiPlateStablePirceInEthValue);
    }
  } else {
    // When use LPBar insteadof LP, xLP:LP = 1:1;
    const balance = await (lpBarContract || lpContract).methods
      .balanceOf(masterChefContract.options.address)
      .call()
    // Convert that into the portion of total lpContract = p1
    const totalSupply = await lpContract.methods.totalSupply().call()
    // Return p1 * w1 * 2
    portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  }

  const tokenDecimals = await tokenContract.methods.decimals().call()

  // Return p1 * w1 * 2
  // const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))

  const poolWeightInfo = await getPoolWeight(masterChefContract, pid);

  return {
    portionLp,
    tokenAmount,
    wethAmount,
    totalWethValue: sashimiPlateTotalStableEthValue ||totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: sashimiPlateStablePirceInEthValue || lpWethWorth.div(tokenAmountWholeLP),
    poolWeight: poolWeightInfo.poolWeight,
    allocPoint: poolWeightInfo.allocPoint,
    totalAllocPoint: poolWeightInfo.totalAllocPoint,
  }
}

// tokenInfo: {
//   mainTokenIndex: 0, // DAI-ETH, DAI-> 0, ETH-DAI, DAI-> 1
//   tokensDecimal: [18, 6],
//   type: 3, // for normal pool. not required
// },
export const getTokenPriceInWeth = async (uniV2LPContract, tokenInfo) => {
  const {mainTokenIndex, tokensDecimal} = tokenInfo;
  const ethIndex = 1 - mainTokenIndex;
  const reserves = await uniV2LPContract.methods.getReserves().call();
  const ethBalance = new BigNumber(reserves[ethIndex]); //.div(10 ** tokensDecimal[ethIndex]);
  const stableBalance = new BigNumber(reserves[mainTokenIndex]); //.div(10 ** tokensDecimal[mainTokenIndex]);
  return ethBalance.div(stableBalance);
};

// like ELF-USDT
export const getTotalLPWethValueNormalPool = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
  routerContract,
  sashimiPlateInfo,
  uniV2LPContract
) => {
  let tokenAmountWholeLP;
  let lpContractWeth;
  if (routerContract) {
    tokenAmountWholeLP = await routerContract.methods
      .getTokenInPair(
        lpContract.options.address,
        tokenContract.options.address
      ).call()
  } else {
    tokenAmountWholeLP = await tokenContract.methods
      .balanceOf(lpContract.options.address)
      .call()
  }

  const tokenPriceInEthValue = await getTokenPriceInWeth(uniV2LPContract, sashimiPlateInfo);
  lpContractWeth = tokenPriceInEthValue.times(tokenAmountWholeLP);

  // Get the share of lpContract that masterChefContract owns
  // When use LPBar insteadof LP, xLP:LP = 1:1;
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))

  const tokenDecimals = await tokenContract.methods.decimals().call()

  // Return p1 * w1 * 2
  // const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))

  const poolWeightInfo = await getPoolWeight(masterChefContract, pid);

  return {
    portionLp,
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: lpWethWorth.div(tokenAmountWholeLP),
    poolWeight: poolWeightInfo.poolWeight,
    allocPoint: poolWeightInfo.allocPoint,
    totalAllocPoint: poolWeightInfo.totalAllocPoint,
  }
};

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

//

export const getPoolStartTime = async (masterChefContract) => {
  return await masterChefContract.methods.starttime().call()
}

export const getDecimalFromSupportedPools = (pid) => {
  const supportedPool = supportedPools.find(supportedPool => {
    return supportedPool.pid === pid;
  });
  if (supportedPool.decimal === 0) {
    return 0;
  }
  return supportedPool.decimal || 18;
};

export const getDecimalByTokenName = (tokenName) => {
  if (tokensDecimal[tokenName.toUpperCase()] === 0) {
    return 0;
  }
  return tokensDecimal[tokenName.toUpperCase()] || 18;

};

export const stake = async (masterChefContract, pid, amount, account) => {
  const decimal = getDecimalFromSupportedPools(pid);

  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  const decimal = getDecimalFromSupportedPools(pid);

  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter((c) => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

// export const getStaked = async (yam, pool, account) => {
//   return yam.toBigN(await pool.methods.balanceOf(account).call())
// }

export const getCurrentPrice = async (yam) => {
  // FORBROCK: get current YAM price
  return yam.toBigN(await yam.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2)
}

export const getCirculatingSupply = async (yam) => {
  let now = await yam.web3.eth.getBlock('latest')
  let scalingFactor = yam.toBigN(
    await yam.contracts.yam.methods.yamsScalingFactor().call(),
  )
  let starttime = yam
    .toBigN(await yam.contracts.eth_pool.methods.starttime().call())
    .toNumber()
  let timePassed = now['timestamp'] - starttime
  if (timePassed < 0) {
    return 0
  }
  let yamsDistributed = yam.toBigN((8 * timePassed * 250000) / 625000) //yams from first 8 pools
  let starttimePool2 = yam
    .toBigN(await yam.contracts.ycrv_pool.methods.starttime().call())
    .toNumber()
  timePassed = now['timestamp'] - starttime
  let pool2Yams = yam.toBigN((timePassed * 1500000) / 625000) // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams
    .plus(yamsDistributed)
    .times(scalingFactor)
    .div(10 ** 36)
    .toFixed(2)
  return circulating
}

export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then((res) => res.timestamp)
    let interval = 43200 // 12 hours
    let offset = 28800 // 8am/8pm utc
    let secondsToRebase = 0
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
        secondsToRebase = interval - (now % interval) + offset
      } else {
        secondsToRebase = offset - (now % interval)
      }
    } else {
      let twap_init = yam
        .toBigN(await yam.contracts.rebaser.methods.timeOfTWAPInit().call())
        .toNumber()
      if (twap_init > 0) {
        let delay = yam
          .toBigN(await yam.contracts.rebaser.methods.rebaseDelay().call())
          .toNumber()
        let endTime = twap_init + delay
        if (endTime % interval > offset) {
          secondsToRebase = interval - (endTime % interval) + offset
        } else {
          secondsToRebase = offset - (endTime % interval)
        }
        return endTime + secondsToRebase
      } else {
        return now + 13 * 60 * 60 // just know that its greater than 12 hours away
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  return await yam.contracts.yam.methods.totalSupply().call()
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
  }
}

export const vote = async (yam, account) => {
  return yam.contracts.gov.methods.castVote(0, true).send({ from: account })
}

export const delegate = async (yam, account) => {
  return yam.contracts.yam.methods
    .delegate('0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84')
    .send({ from: account })
}

export const didDelegate = async (yam, account) => {
  return (
    (await yam.contracts.yam.methods.delegates(account).call()) ===
    '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84'
  )
}

export const getVotes = async (yam) => {
  const votesRaw = new BigNumber(
    await yam.contracts.yam.methods
      .getCurrentVotes('0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84')
      .call(),
  ).div(10 ** 24)
  return votesRaw
}

export const getScalingFactor = async (yam) => {
  return new BigNumber(
    await yam.contracts.yam.methods.yamsScalingFactor().call(),
  )
}

export const getDelegatedBalance = async (yam, account) => {
  return new BigNumber(
    await yam.contracts.yam.methods.balanceOfUnderlying(account).call(),
  ).div(10 ** 24)
}

export const migrate = async (yam, account) => {
  return yam.contracts.yamV2migration.methods.migrate().send({ from: account })
}

export const getMigrationEndTime = async (yam) => {
  return yam
    .toBigN(await yam.contracts.yamV2migration.methods.startTime().call())
    .plus(yam.toBigN(86400 * 3))
    .toNumber()
}
