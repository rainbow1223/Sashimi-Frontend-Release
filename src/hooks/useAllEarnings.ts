import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { getEarned, getMasterChefContract, getFarms } from '../sushi/utils'
import useYam from './useYam'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const yam = useYam()
  const farms = getFarms(yam)
  const masterChefContract = getMasterChefContract(yam)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid, lpBarContract }: { pid: number, lpBarContract?: Contract }) => {
        if (lpBarContract) {
          // return lpBarContract.methods.earned(account).call();
          return lpBarContract.methods.earnedFromChef(account).call();
        } else {
          return getEarned(masterChefContract, pid, account).catch(() => new BigNumber(0));
        }
      }),
    )
    setBalance(balances)
  }, [account, masterChefContract, yam])

  useEffect(() => {
    if (account && masterChefContract && yam) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, yam])

  return balances
}

export default useAllEarnings
