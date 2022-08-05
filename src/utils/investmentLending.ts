import Web3 from 'web3'
import {provider} from 'web3-core'
import {AbiItem} from 'web3-utils'

import investmentLendingABI from '../constants/abi/investmentLending.json'

export const getInvestmentLendingContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(
    (investmentLendingABI as unknown) as AbiItem,
    address,
  )
};
