import React, {useMemo, useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import chef from '../../assets/img/chef.png'

import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useYam from '../../hooks/useYam'
import {getSashimiBarContract, getSushiContract} from '../../sushi/utils'

import Harvest from './components/Harvest'
import Stake from './components/Stake'
import {Button} from "antd";
import {getBalanceNumber} from "../../utils/formatBalance";
import BigNumber from "bignumber.js";
import useTokenBalance from "../../hooks/useTokenBalance";
import useBlock from "../../hooks/useBlock";
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../../components/WalletProviderModal";

// 0928 21:00 GMT+8
const stakingStartTime = (new Date(Date.UTC(2020, 8, 28 ,13, 0, 0))).getTime();
const timeADay = 86400000;
const Staking: React.FC = () => {
  const yam = useYam();
  const block = useBlock();

  const [xSashimiBalanceOfSashimiBar, setXSashimiBalanceOfSashimiBar] = useState(new BigNumber(0));

  const { ethereum } = useWallet();
  const sashimiBarContract: Contract = useMemo(() => getSashimiBarContract(yam), [ethereum, yam]);
  const sushiContract: Contract = useMemo(() => getSushiContract(yam), [ethereum, yam]);

  const getXSashimiBalanceOfSashimiBar = useCallback(() => {
    if (sashimiBarContract) {
      sashimiBarContract.methods.totalSupply().call().then((totalSupply: any) => {
        setXSashimiBalanceOfSashimiBar(new BigNumber(totalSupply));
      }).catch((error: any) => {
        console.log('error: ', error);
      });
    }
  }, [sashimiBarContract, block]);

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getXSashimiBalanceOfSashimiBar();
  }, [getXSashimiBalanceOfSashimiBar]);

  const sushiContractAddress = sushiContract ? sushiContract.options.address : '';
  const sashimiBarContractAddress = sashimiBarContract ? sashimiBarContract.options.address : '';
  const sashimiBalanceOfSashimiBar: BigNumber = useTokenBalance(sushiContractAddress, sashimiBarContractAddress);

  const walletLocked = <Button
    onClick={onPresentWalletProviderModal}
    type="primary"
    size="large"
    block
  >Unlock Wallet</Button>;

  const apyTimePivot = (Date.now() - stakingStartTime) / timeADay;
  const exchangeratio = sashimiBalanceOfSashimiBar.div(xSashimiBalanceOfSashimiBar);

  return (
    <>
      <PageHeader
        icon={<img src={chef} height="120" alt="Sashimi" />}
        subtitle={'Welcome to the Sashimi Bar, stake Sashimi to earn Sashimi.'}
        title='Sashimi Staking(Beta)'
      />
      <StyleSubTitle>
        <a
          target="_blank"
          href="https://etherscan.io/address/0x6ed306DbA10E6c6B20BBa693892Fac21f3B91977">
          Click To Review The Contract
        </a>
        <div>{getBalanceNumber(sashimiBalanceOfSashimiBar).toFixed(2)} Sashimi in the whole pool.</div>
        <div>{getBalanceNumber(xSashimiBalanceOfSashimiBar).toFixed(2)} xSashimi in the whole pool.</div>
        <div>
          <div>APY {sashimiBalanceOfSashimiBar.isEqualTo(0) ? '-'
          : sashimiBalanceOfSashimiBar.minus(xSashimiBalanceOfSashimiBar).div(xSashimiBalanceOfSashimiBar)
              .div(apyTimePivot).times(365 * 100).toFixed(2) } %</div>
          <div>
             1 xSashimi = {exchangeratio.isNaN() ? '-' : exchangeratio.toFixed(3)} Sashimi
          </div>
        </div>
      </StyleSubTitle>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest
              walletLocked={walletLocked}
              sashimiBarContract={sashimiBarContract}
              exchangeratio={exchangeratio}
            />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              sashimiBarContract={sashimiBarContract}
              sushiContract={sushiContract}
              walletLocked={walletLocked}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ You will earn a portion of the swaps fees based on the amount of xSashimi held relative the weight of the staking.
        </StyledInfo>
        <StyledInfo>
          xSashimi can be minted by staking Sashimi. To redeem Sashimi staked plus swap fees convert xSashimi back to Sashimi.
        </StyledInfo>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyleSubTitle = styled.div`
  color: #aa9585;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
`

export default Staking
