import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';

import useBlock from '../useBlock';
import { tokenPriceAPI } from '../../sushi/lib/constants';

// {
//   "USD": 366.93,
//   "symbol": "ETH"
// }
// https://wallet-test.aelf.io/api/token/price?fsym=ETH&tsyms=USD

export const useTokenPrice = (symbolA: string, symbolB: string) => {
  const [tokenPrice, setTokenPrice] = useState({
    [symbolA]: 0
  } as any);

  const block = useBlock();

  const fetchTokenPrice = useCallback(async () => {
    if (block % 6 === 0) {
      try {
        const result: any = await axios.get(`${tokenPriceAPI}?fsym=${symbolA}&tsyms=${symbolB}`);
        if (result.data) {
          setTokenPrice(result.data.USD);
        }
        console.log('useTokenPrice: ', result.data);
      } catch(e) {
        console.log('useTokenPrice error: ', e);
      }
    }
  }, [block]);

  useEffect(() => {
    fetchTokenPrice()
  }, [fetchTokenPrice, block]);

  return tokenPrice
};
