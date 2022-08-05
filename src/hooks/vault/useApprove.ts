import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";
import {ethers} from "ethers";

const useApprove = (tokenContract: Contract, targetAddress: string) => {
  const { account }: { account: string; ethereum: provider } = useWallet();

  const handleApprove = useCallback(async () => {
    try {
      return await tokenContract.methods
        .approve(targetAddress, ethers.constants.MaxUint256)
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, tokenContract, targetAddress]);

  return { onApprove: handleApprove }
}

export default useApprove;
