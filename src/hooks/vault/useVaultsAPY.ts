import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from '../useBlock';

// demo
// {
//   "USDT": "0",
//   "USDC": "0",
//   "DAI": "52.19636365587544286",
//   "WBTC": "0"
// }

export const useVaultsAPY = () => {
  const [vaultsAPY, setVaultsAPYs] = useState({
    "DAI-ETH": "0",
    "USDC-ETH": "0",
    "ETH-USDT": "0",
    "WBTC-ETH": "0"
  } as any);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get('/api/farms/getUNIV2APY');
        if (result.data && result.data.data) {
          const apys = {} as any;
          result.data.data.forEach((apyInfo: any) => {
            apys[apyInfo.pair] = apyInfo.yearlyROI
          });
          setVaultsAPYs(apys);
        }
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
