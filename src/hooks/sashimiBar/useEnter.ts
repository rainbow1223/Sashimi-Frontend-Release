import { useCallback } from 'react'

import useYam from '../useYam'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js";

const useEnter = (barContract: Contract) => {
  const { account } = useWallet();
  const yam = useYam();

  const handleEnter = useCallback(async (amount = 0, decimal = 18) => {
    try {
      return await barContract.methods.enter(
        new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString()
      ).send({ from: account });
    } catch(e) {
      console.log('use Enter e', e);
      return '0'
    }
  }, [account, yam, barContract]);

  return { onEnter: handleEnter };
};

export default useEnter;
