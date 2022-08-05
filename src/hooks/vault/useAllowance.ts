import {Contract} from "web3-eth-contract";
import {useCallback, useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";

const useAllowance = (tokenContract: Contract, targetAddress: string) => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account }: { account: string; ethereum: provider } = useWallet();

  const fetchAllowance = useCallback(async () => {
    const allowance: string = await tokenContract.methods
      .allowance(account, targetAddress)
      .call();
    console.log('allowance: ', allowance);
    setAllowance(new BigNumber(allowance))
  }, [account, targetAddress, tokenContract]);

  useEffect(() => {
    if (account && targetAddress && tokenContract) {
      fetchAllowance()
    }
  }, [account, targetAddress, tokenContract]);

  return allowance
};

export default useAllowance;
