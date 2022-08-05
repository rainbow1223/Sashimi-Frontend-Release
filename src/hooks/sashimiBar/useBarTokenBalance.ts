import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import useBlock from '../useBlock'

// const balanceTypes = ['lpBalance', 'xLPBalance', 'balanceOf'];
//
// enum BalanceTypes {
//   lpBalance = 'lpBalance',
//   xLPBalance = 'xLPBalance',
//   balanceOf = 'balanceOf'
// }

const useBarTokenBalance = (lpBarContract: Contract, balanceType: string): BigNumber => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet();
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    if (lpBarContract && balanceType) {
      const balance = await lpBarContract.methods[balanceType](account).call();
      setBalance(new BigNumber(balance))
    }
  }, [account, ethereum, lpBarContract, balanceType, block]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [fetchBalance]);

  return balance;
};

export default useBarTokenBalance;
