import React, {useCallback, useEffect, useState} from 'react'
import {
  Button,
  Divider,
  Row,
  Col
} from 'antd';
import styled from 'styled-components'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'

import useYam from '../../../hooks/useYam'
import BigNumber from 'bignumber.js'

import {
  getInvestmentContract,
  getSushiContract,
  getSashimiRouterAddress, getSashimiRouterContract
} from '../../../sushi/utils';

import {getBalanceNumber} from "../../../utils/formatBalance";
import {Yam} from "../../../sushi";
import {Contract} from "web3-eth-contract";
import {useWallet} from "use-wallet";
import {ILendingInvestmentAPY, useInvestmentAPYs, useLendingInvestmentAPYs} from "../../../hooks/useInvestmentAPYs";
import {getBalance, getContract} from "../../../utils/erc20";
import { contractAddresses, supportedLendingInvestmentPools, sashimiAddress, wethAddress, wethSashimiLpPAddress } from "../../../sushi/lib/constants";
import {getEthChainInfo} from "../../../utils/getEthChainInfo";
import {getInvestmentLendingContract} from "../../../utils/investmentLending";
import {useTokenWethPriceByRouter} from "../../../hooks/useTokenWethPriceByRouter";

const {
  ethscanType
} = getEthChainInfo();

type IInvestment = {
  lpAddress: string
  providerAddress: string
  depositAddress: string
  depositTokenDecimal: number
  depositTokenSymbol: string
  tokenSymbol: string
  sashimiWethPrice: BigNumber
  icon: string
}

const InvestmentCards: React.FC = () => {

  const yam = useYam();
  const {account} = useWallet();
  const investmentContract = yam && getInvestmentContract(yam);
  const sashimiContract = yam && getSushiContract(yam);
  const sashimiRouterContract = yam && getSashimiRouterContract(yam);
  const investmentAPYs = useLendingInvestmentAPYs();

  const tokenWethPrice = useTokenWethPriceByRouter(sashimiRouterContract, wethSashimiLpPAddress, sashimiAddress);

  const newLendingInvestmentRows: IInvestment[][]  = supportedLendingInvestmentPools.reduce((investmentRows: IInvestment[][], investment: IInvestment) => {
    const newLendingInvestmentRows = [...investmentRows];
    if (newLendingInvestmentRows[newLendingInvestmentRows.length - 1].length === 3) {
      newLendingInvestmentRows.push([investment])
    } else {
      newLendingInvestmentRows[newLendingInvestmentRows.length - 1].push(investment)
    }
    return newLendingInvestmentRows;
  }, [[]]);

  return (
    <StyledCards>
      <StyleSubTitle>
        <a
          target="_blank"
          href={`https://${ethscanType}etherscan.io/address/${contractAddresses.investment[1]}`}>
          Click To Review The Contract
        </a>
        <ValueETH>
          <div>Tip: The profit will enter staking pool when harvest, not your personal account.</div>
        </ValueETH>
      </StyleSubTitle>
      {!!newLendingInvestmentRows.length ? (
        newLendingInvestmentRows.map((investmentRow, i) => (
          <StyledRow key={i}>
            {investmentRow.map((investment, j) => (
              <React.Fragment key={j}>
                <InvestmentCard
                  investment={investment}
                  yam={yam}
                  investmentContract={investmentContract}
                  sashimiContract={sashimiContract}
                  sashimiRouterContract={sashimiRouterContract}
                  sashimiWethPrice={tokenWethPrice}
                  account={account}
                  apyInfo={investmentAPYs.find(investmentAPY => {
                    const symbol = investmentAPY.symbol.toLowerCase();
                    const symbolPivot = investment.tokenSymbol.toLowerCase();
                    if (['eth','weth'].includes(symbol) && ['eth','weth'].includes(symbolPivot)) {
                      return true;
                    }
                    return symbol === symbolPivot;
                  })}
                />
                {(j === 0 || j === 1) && <StyledSpacer/>}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..."/>
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface InvestmentCardProps {
  investment: IInvestment,
  yam: typeof Yam,
  investmentContract: any,
  sashimiContract: any,
  sashimiRouterContract: any,
  sashimiWethPrice: BigNumber
  account: any
  apyInfo: ILendingInvestmentAPY
}

const InvestmentCard: React.FC<InvestmentCardProps> = (
  {
    investment, yam, investmentContract,
    sashimiRouterContract,  sashimiContract,
    apyInfo,
    sashimiWethPrice, account
  }) => {

  const [reservesRatio, setReservesRatio] = useState('-');
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [supplyProfitEthValued, setSupplyProfitEthValued] = useState(new BigNumber(0));
  const [farmProfitEthValued, setFarmProfitEthValued] = useState(new BigNumber(0));
  const [actualFundUsed, setActualFundUsed] = useState('-%');

  const tokenWethPrice = useTokenWethPriceByRouter(sashimiRouterContract, investment.lpAddress, investment.depositAddress);

  const { ethereum }: { ethereum: any } = useWallet()

  const fetchData = useCallback(async () => {
    if (!yam || !ethereum || !investmentContract || !sashimiRouterContract || sashimiWethPrice.eq(0) || tokenWethPrice.eq(0)) {
      return;
    }
    const investmentLendingContract = getInvestmentLendingContract(ethereum, investment.providerAddress);

    const [
      reservesPoints,
      depositAmount, depositTokenBalanceInRouter,
      earnedCurrent, sashimiBalanceOfProvider
    ] = await Promise.all([
      // TODO: catch -> request log for monitor
      investmentContract.methods.reservesRatios(investment.depositAddress).call().catch(() => 0),
      investmentContract.methods.deposits(investment.depositAddress).call().catch(() => 0),
      getBalance(ethereum, investment.depositAddress, getSashimiRouterAddress(yam)).catch(() => 0),
      investmentLendingContract.methods.earnedCurrent().call().catch(() => [0, 0]),
      sashimiContract.methods.balanceOf(investment.providerAddress).call().catch(() => 0),
    ]);

    const depositAmountBN = new BigNumber(depositAmount);

    setReservesRatio(`${reservesPoints / 100}%`);
    setDepositAmount(depositAmountBN);

    const depositTokenBalanceInRouterBN = new BigNumber(depositTokenBalanceInRouter);
    const actualFundPoolBN = depositTokenBalanceInRouterBN.plus(depositAmountBN);
    const actualFundUsed = `${(new BigNumber(100)).minus(depositAmountBN.div(actualFundPoolBN).times(100)).toFixed(2)}%`;
    setActualFundUsed(actualFundUsed);

    setSupplyProfitEthValued(new BigNumber(earnedCurrent[0]).times(tokenWethPrice));
    setFarmProfitEthValued(new BigNumber(earnedCurrent[1]).plus(sashimiBalanceOfProvider).times(sashimiWethPrice));

  }, [investment, yam, investmentContract, sashimiContract, sashimiRouterContract, sashimiWethPrice, tokenWethPrice]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <img src={investment.icon} alt="token-icon" style={{width: '80px', height: '80px'}}/>
            <StyledTitle>Invest {investment.depositTokenSymbol.toUpperCase()}</StyledTitle>
            { investment.providerAddress ? <a
              target="_blank"
              href={`https://${ethscanType}etherscan.io/address/${investment.providerAddress}`}>
              Click To Review The Contract
            </a> : <StyledComing>Coming Soon</StyledComing>}
            <Spacer/>
            <ButtonContainer>
              <Col span={11}>
                <Button
                  size="large"
                  type="primary"
                  block
                  disabled={supplyProfitEthValued.isEqualTo(0) && farmProfitEthValued.isEqualTo(0)}
                  onClick={async () => {
                    if (investmentContract) {
                      investmentContract.methods.harvest(investment.depositAddress).send({from: account});
                    }
                  }}
                >
                  Harvest
                </Button>
              </Col>
              <Col span={11} offset={2}>
                <Button
                  size="large"
                  type="primary"
                  block
                  onClick={async () => {
                    if (investmentContract) {
                      investmentContract.methods.reBalance(investment.depositAddress).send({from: account});
                    }
                  }}
                >
                  ReBalance
                </Button>
              </Col>
            </ButtonContainer>
            <StyledDivider />
            <StyledInsight>
              <span>Deposit</span>
              <span>
                {getBalanceNumber(depositAmount, investment.depositTokenDecimal).toFixed(2)} {investment.depositTokenSymbol}
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Supply Profit</span>
              <span>
                {getBalanceNumber(supplyProfitEthValued, 18).toFixed(8) || '-'} ETH
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Farm Profit</span>
              <span>
                {getBalanceNumber(farmProfitEthValued, 18).toFixed(8) || '-'} ETH
              </span>
            </StyledInsight>

            <StyledInsight>
              <span>Basic Reserves Ratio</span>
              <span>
                {reservesRatio}
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Actual Reserves Ratio</span>
              <span>
                {actualFundUsed}
              </span>
            </StyledInsight>

            <StyledInsight>
              <span>APY</span>
              <span>
                {apyInfo ? parseFloat(apyInfo.apy).toFixed(2) : '-'} %
              </span>
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const ValueETH = styled.div`
  color: #aa9585;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const ButtonContainer = styled(Row)`
  width: 100%;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  display: flex;
  align-items: center;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${(props) => props.theme.color.grey[400]};
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  padding: 0 12px;
`

const StyledComing = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`

const StyledDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom:  7px;
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


export default InvestmentCards
