import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from './useBlock'

// demo
// {
//   "msg": "success",
//   "code": 0,
//   "data": [
//   {
//     "lpAddress": "0x490ccb3c835597ff31e525262235487f9426312b",
//     "pair": "ETH-USDT",
//     "sashimiPrice": "0.00013906611636393596",
//     "totalEth": "123.3544836734356838",
//     "poolWeight": "0.00083393098387177477",
//     "masterChefWeight": "1",
//     "isUni": false,
//     "isPlate": false,
//     "pid": 0,
//     "dailyROI": "0.060169509421123776",
//     "weeklyROI": "0.421186565947866432",
//     "monthlyROI": "1.80508528263371328",
//     "yearlyROI": "21.96187093871017824"
//   },
// }
interface farmAPY {
    lpAddress: string,
    pair: string,
    sashimiPrice: string,
    totalEth: string,
    poolWeight: string,
    masterChefWeight: string,
    isUni?: boolean,
    isPlate?: boolean,
    isStable?: boolean,
    pid: number,
    dailyROI: string,
    weeklyROI: string,
    monthlyROI: string,
    yearlyROI: string,
}
export const useFarmsAPY = () => {
  const [farmsAPY, setFarmsAPY] = useState([] as farmAPY[]);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get('/api/farms/getFarmAPY');
        if (result.data && result.data.data && Array.isArray(result.data.data)) {
          setFarmsAPY(result.data && result.data.data);
        }
      } catch(e) {
        console.log('fetchAPY error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchAPY()
  }, [fetchAPY]);

  return farmsAPY
};
