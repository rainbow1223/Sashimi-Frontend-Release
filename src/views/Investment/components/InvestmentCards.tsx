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
  getInvestments,
  getSashimiRouterAddress, getDecimalByTokenName
} from '../../../sushi/utils';

import {getBalanceNumber} from "../../../utils/formatBalance";
import {Yam} from "../../../sushi";
import {Contract} from "web3-eth-contract";
import {useWallet} from "use-wallet";
import {useInvestmentAPYs} from "../../../hooks/useInvestmentAPYs";
import {getBalance} from "../../../utils/erc20";
import { contractAddresses } from "../../../sushi/lib/constants";

interface Investment {
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  pivotLpAddress: string
  pivotLpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
  depositAddress: string
  depositTokenSymbol: string
  sashimiIndex: number
  pivotTokenIndex: number
  providerAddress: string
  hasRegularProfit?: boolean
}

interface InvestmentRow extends Investment {

}

const InvestmentCards: React.FC = () => {

  const yam = useYam();
  const {account} = useWallet();
  const investmentContract = yam && getInvestmentContract(yam);
  const sashimiContract = yam && getSushiContract(yam);
  const investments: Investment[] = yam && getInvestments(yam) || [];

  const newInvestmentRows = investments.reduce<InvestmentRow[][]>((investmentRows, investment, i) => {
    const newInvestmentRows = [...investmentRows];
    if (newInvestmentRows[newInvestmentRows.length - 1].length === 3) {
      newInvestmentRows.push([investment])
    } else {
      newInvestmentRows[newInvestmentRows.length - 1].push(investment)
    }
    return newInvestmentRows;
  }, [[]]);

  return (
    <StyledCards>
      <StyleSubTitle>
        <a
          target="_blank"
          href={`https://etherscan.io/address/${contractAddresses.investment[1]}`}>
          Click To Review The Contract
        </a>
        <ValueETH>
          <div>Tip: The profit will enter staking pool when harvest, not your personal account.</div>
        </ValueETH>
      </StyleSubTitle>
      {!!newInvestmentRows[0].length ? (
        newInvestmentRows.map((investmentRow, i) => (
          <StyledRow key={i}>
            {investmentRow.map((investment, j) => (
              <React.Fragment key={j}>
                <InvestmentCard
                  investment={investment}
                  yam={yam}
                  investmentContract={investmentContract}
                  sashimiContract={sashimiContract}
                  account={account}
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
  investment: InvestmentRow,
  yam: typeof Yam,
  investmentContract: any,
  sashimiContract: any,
  account: any
}

const InvestmentCard: React.FC<InvestmentCardProps> = (
  {investment, yam, investmentContract, sashimiContract, account}) => {

  const [reservesRatio, setReservesRatio] = useState('-');
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [profitSashimiValued, setProfitSashimiValued] = useState(new BigNumber(0));
  const [profitEthValued, setProfitEthValued] = useState(new BigNumber(0));
  const [regularProfitEthValued, setRegularProfitEthValued] = useState(new BigNumber(0));
  const [actualFundUsed, setActualFundUsed] = useState('-%');
  const [depositTokenDecimal, setDepositTokenDecimal] = useState(18);

  const investmentAPYs = useInvestmentAPYs();
  const { ethereum }: { ethereum: any } = useWallet()
  const apyInfo = investmentAPYs.find(apyInfo => {
    const key = apyInfo.key.toUpperCase();
    if (key.includes(investment.tokenSymbol.toUpperCase()) && key.includes(investment.depositTokenSymbol.toUpperCase())) {
      return true;
    }
  });

  const fetchData = useCallback(() => {
    if (yam && investmentContract) {
      (async () => {
        try {
          const result = await investmentContract.methods.earned(investment.depositAddress).call();
          const reservesPoints = await investmentContract.methods.reservesRatios(investment.depositAddress).call();
          const depositAmount = await investmentContract.methods.deposits(investment.depositAddress).call();
          const depositAmountBN = new BigNumber(depositAmount);

          const {amount} = result; // profit is token address;
          const profit = new BigNumber(amount);
          setReservesRatio(`${reservesPoints / 100}%`);
          setDepositAmount(depositAmountBN);

          const depositTokenBalanceInRouter = await getBalance(ethereum, investment.depositAddress, getSashimiRouterAddress(yam));
          const depositTokenBalanceInRouterBN = new BigNumber(depositTokenBalanceInRouter);
          const actualFundPoolBN = depositTokenBalanceInRouterBN.plus(depositAmountBN);
          const actualFundUsed = `${(new BigNumber(100)).minus(depositAmountBN.div(actualFundPoolBN).times(100)).toFixed(2)}%`;
          setActualFundUsed(actualFundUsed);

          const lpInfo = await investment.lpContract.methods.getReserves().call();
          const sashimiBalance = new BigNumber(lpInfo[investment.sashimiIndex]);
          const lpEthTokenBalance = new BigNumber(lpInfo[1 - investment.sashimiIndex]);
          const sashimiETHPrice = lpEthTokenBalance.div(sashimiBalance);

          const pivotLpInfo = await investment.pivotLpContract.methods.getReserves().call();

          const pivotTokenDecimal = getDecimalByTokenName(investment.depositTokenSymbol);
          setDepositTokenDecimal(pivotTokenDecimal);
          const profitTokenBalance = new BigNumber(pivotLpInfo[investment.pivotTokenIndex]).div(10 ** pivotTokenDecimal);
          const pivotEthTokenBalance = new BigNumber(pivotLpInfo[1 - investment.pivotTokenIndex]).div(10 ** 18);
          const pivotTokenPrice = pivotEthTokenBalance.div(profitTokenBalance);

          const sashimiValued = pivotTokenPrice.times(profit).div(sashimiETHPrice).times(0.25);
          const pivotEthProfit = pivotTokenPrice.times(profit); //.times(0.75);
          // const sashimiValued = pivotTokenPrice.times(profit).div(sashimiETHPrice).times(0.25);

          if (apyInfo && apyInfo.earn && apyInfo.earn.amount) {
            setRegularProfitEthValued(pivotTokenPrice.times(apyInfo.earn.amount));
          }

          setProfitEthValued(pivotEthProfit);
          setProfitSashimiValued(sashimiValued);
        } catch(e) {
          console.log('investment: ', e);
        }
      })();
    }
  }, [investment, yam, investmentContract, sashimiContract, apyInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{investment.icon}</CardIcon>
            <StyledTitle>Invest {investment.depositTokenSymbol.toUpperCase()}</StyledTitle>
            { investment.providerAddress ? <a
              target="_blank"
              href={`https://etherscan.io/address/${investment.providerAddress}`}>
              Click To Review The Contract
            </a> : <StyledComing>Coming Soon</StyledComing>}
            <Spacer/>
            <ButtonContainer>
              <Col span={11}>
                <Button
                  size="large"
                  type="primary"
                  block
                  disabled={profitSashimiValued.isEqualTo(0)}
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
                  disabled={profitSashimiValued.isEqualTo(0)}
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
                {getBalanceNumber(depositAmount, depositTokenDecimal).toFixed(2)} {investment.depositTokenSymbol}
              </span>
            </StyledInsight>
            {/*<StyledInsight>*/}
            {/*  <span>Demand Profit</span>*/}
            {/*  /!*<span>*!/*/}
            {/*  /!*  {getBalanceNumber(profitSashimiValued).toFixed(3) || '-'} Sashimi*!/*/}
            {/*  /!*</span>*!/*/}
            {/*</StyledInsight>*/}
            <StyledInsight>
              <span>Harvest Profit</span>
              <span>
                {getBalanceNumber(profitEthValued).toFixed(8) || '-'} ETH
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>Reserved Profit</span>
              <span>
                 {/*{apyInfo ? apyInfo.earn.amount != '0' ? parseFloat(apyInfo.earn.amount).toFixed(2) + `${apyInfo.earn.symbol}`: '-' : '-'}*/}
                 {apyInfo ? (apyInfo.earn.amount != '0' && investment.hasRegularProfit) ? `${regularProfitEthValued.toFixed(8)} ETH`: '-' : '-'}
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
                {apyInfo ? parseFloat(apyInfo.APY).toFixed(2) : '-'} %
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
