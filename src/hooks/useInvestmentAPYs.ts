import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from './useBlock'

// demo
// {
//     "msg": "success",
//     "code": 0,
//     "data": [
//         {
//             "APY": "1769.40",
//             "key": "WETH-Candy"
//         },
//         {
//             "APY": "7464032960289.86",
//             "key": "XYZ-GOLFF"
//         }
//     ]
// }
interface Earn {
  symbol: string,
  amount: string,
  address: string,
}
interface investmentAPY {
  APY: string,
  key: string,
  earn: Earn
}
export const useInvestmentAPYs = () => {
  const [investmentAPYs, setInvestmentAPYs] = useState([] as investmentAPY[]);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get('/api/farms/getInvestmentAPY');
        if (result.data && result.data.data && Array.isArray(result.data.data)) {
          setInvestmentAPYs(result.data && result.data.data);
        }
      } catch(e) {
        console.log('fetchAPY error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchAPY()
  }, [fetchAPY]);

  return investmentAPYs
};

export type ILendingInvestmentAPY = {
  price: string
  apy: string
  symbol: string
}

export const useLendingInvestmentAPYs = () => {
  const [investmentAPYs, setInvestmentAPYs] = useState<ILendingInvestmentAPY[]>([]);

  const block = useBlock();

  const fetchAPY = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get('/api/farms/getLendingAPY');
        if (result.data && result.data.data && Array.isArray(result.data.data.list)) {
          setInvestmentAPYs(result.data && result.data.data && result.data.data.list);
        }
      } catch(e) {
        console.log('fetchAPY error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchAPY()
  }, [fetchAPY]);

  return investmentAPYs
};

