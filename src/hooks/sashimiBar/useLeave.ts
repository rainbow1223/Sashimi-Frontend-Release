import { useCallback } from 'react'

import useYam from '../useYam'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js";

const useLeave = (barContract: Contract) => {
  const { account } = useWallet();
  const yam = useYam();

  const handleLeave = useCallback(async (amount = 0, decimal = 18) => {
    try {
      return await barContract.methods.leave(
        new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString()
      ).send({ from: account });
    } catch {
      return '0'
    }
  }, [account, yam, barContract]);

  return { onLeave: handleLeave };
};

export default useLeave;
