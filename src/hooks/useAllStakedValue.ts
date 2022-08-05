import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
  getSashimiRouterContract
} from '../sushi/utils'
import { SashimiPlateInfo } from '../contexts/Farms/types';
import {doublePools} from '../sushi/lib/constants';
import useYam from './useYam'
import useBlock from './useBlock'


export interface StakedValue {
  portionLp: BigNumber
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  allocPoint: BigNumber
  totalAllocPoint: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const yam = useYam()
  const farms = getFarms(yam)
  const masterChefContract = getMasterChefContract(yam)
  const wethContact = getWethContract(yam)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          lpBarContract,
          isSashimiPlate,
          sashimiPlateInfo,
          sashimiPlateContract,
          uniV2LPContract
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          lpBarContract?: Contract
          isSashimiPlate?: boolean
          sashimiPlateInfo?: SashimiPlateInfo
          sashimiPlateContract?: Contract
          uniV2LPContract?: Contract
        }) =>
        {
          return getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
            lpBarContract,
            doublePools.includes(pid) ? null : getSashimiRouterContract(yam),
            isSashimiPlate,
            sashimiPlateInfo,
            sashimiPlateContract,
            uniV2LPContract
          )},
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, yam])

  useEffect(() => {
    if (account && masterChefContract && yam) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, yam])

  return balances
}

export default useAllStakedValue
