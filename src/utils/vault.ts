import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import vaultABI from '../constants/abi/vault/vaultABI.json'
import strategyABI from '../constants/abi/vault/strategyABI.json'
import controllerABI from '../constants/abi/vault/controllerABI.json'
import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js";

const getValidNumberString = (value: BigNumber) => {
  let vaultValid = value.toString();
  if (vaultValid.includes('.')) {
    vaultValid = vaultValid.substring(0, vaultValid.indexOf('.'));
  }
  return vaultValid;
};

export const getVaultContract = (provider: provider, vaultContractAddress: string) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(
    (vaultABI as unknown) as AbiItem,
    vaultContractAddress,
  );
};

export const getStrategyContract = (provider: provider, strategyContractAddress: string) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(
    (strategyABI as unknown) as AbiItem,
    strategyContractAddress,
  );
};

export const getControllerContract = (provider: provider, controllerContractAddress: string) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(
    (controllerABI as unknown) as AbiItem,
    controllerContractAddress,
  );
};

export const vaultDeposit = (vaultContract: Contract, account: string, value: BigNumber) => {
  const valueValid = getValidNumberString(value);
  return vaultContract.methods
    .deposit(valueValid)
    .send({from: account})
    .on('transactionHash', (tx: any) => {
      console.log('vaultDeposit', tx);
      return tx.transactionHash;
    })
    .on('error', function (err: any) {
      return err;
    });
};

export const vaultWithdraw = (vaultContract: Contract, account: string, value: BigNumber) => {
  const valueValid = getValidNumberString(value);
  return vaultContract.methods
    .withdraw(valueValid)
    .send({from: account})
    .on('transactionHash', (tx: any) => {
      console.log('vaultWithdraw', tx);
      return tx.transactionHash;
    })
    .on('error', function (err: any) {
      return err;
    });
};

// balanceOf -> get Withdraw token, like svUNI-V2
export const getVaultUserBalance = async function (vaultContract: Contract, account: string) {
  return await vaultContract.methods
    .balanceOf(account)
    .call({from: account});
};

// balance -> get Deposit token number, like UNI-V2 LP
export const getVaultTotalBalance = async function (vaultContract: Contract, account: string) {
  return await vaultContract.methods
    .balance()
    .call({from: account});
};

export const getVaultTotalSupply = async function (vaultContract: Contract, account: string) {
  return await vaultContract.methods
    .totalSupply()
    .call({from: account});
};
