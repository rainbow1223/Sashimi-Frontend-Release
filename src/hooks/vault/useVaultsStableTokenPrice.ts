import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from '../useBlock';
import { vaultStableTokenPriceAPI } from '../../sushi/lib/constants';

// demo
// {
//   "USDT": 1.00046754063038,
//   "USDC": 1.00080182624136,
//   "DAI": 1.01288411839589,
//   "WBTC": 10614.472882728587
// }

export const useVaultsStableTokenPrice = () => {
  const [vaultsAPY, setVaultsAPYs] = useState({
    "USDT": 1,
    "USDC": 1,
    "DAI": 1,
    "WBTC": 11000
  } as any);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get(vaultStableTokenPriceAPI);
        if (result.data) {
          setVaultsAPYs(result.data);
        }
        console.log('vaultsAPY time: ', result.data);
      } catch(e) {
        console.log('fetchAPY error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchAPY()
  }, [fetchAPY, block]);

  return vaultsAPY
};
