import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";

const useEarn = (vaultContract: Contract) => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet();

  const handleEarn = useCallback(async () => {
    try {
      return await vaultContract.methods
        .earn()
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, ethereum, vaultContract]);

  return { onEarn: handleEarn }
}

export default useEarn;
