import {Contract} from "web3-eth-contract";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {useCallback} from "react";

const useHarvest = (strategyContract: Contract) => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet();

  const handleHarvest = useCallback(async () => {
    try {
      return await strategyContract.methods
        .harvest()
        .send({ from: account });
    } catch (e) {
      return false
    }
  }, [account, ethereum, strategyContract]);

  return { onHarvest: handleHarvest }
}

export default useHarvest;
