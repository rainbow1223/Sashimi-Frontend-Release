import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import PageHeader from '../../../components/PageHeader'
import Spacer from '../../../components/Spacer'

import useFarm from '../../../hooks/useFarm'
import { getContract } from '../../../utils/erc20'

import Harvest from './components/Harvest'
import Stake from './components/Stake'

const DoubleFarm: React.FC = () => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    lpBarContract,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    lpBarAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={`${name} (Beta)`}
      />
      <StyledFarm>
        <h1>This project is in beta. Use at your own risk.
          <a href={`https://etherscan.io/address/${lpBarContract && lpBarContract.options.address}`} target="_blank">Click to review Contract</a>
        </h1>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest
              pid={pid}
              lpBarContract={lpBarContract}
            />
          </StyledCardWrapper>
          <StyledCardWrapper>
            <Stake
              lpBarContract={lpBarContract}
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake LP tokens, the contract will
          automagically harvest SASHIMI rewards for you!
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
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
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

export default DoubleFarm
