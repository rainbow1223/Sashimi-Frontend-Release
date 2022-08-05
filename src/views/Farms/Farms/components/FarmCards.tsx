import React from 'react'
import {
  Button,
  Divider,
  Row,
  Col
} from 'antd';
import {
  Link
} from 'react-router-dom';
import styled, {keyframes} from 'styled-components'
import Countdown, {CountdownRenderProps} from 'react-countdown'
import {useWallet} from 'use-wallet'

import Card from '../../../../components/Card'
import CardContent from '../../../../components/CardContent'
import CardIcon from '../../../../components/CardIcon'
import Loader from '../../../../components/Loader'
import Spacer from '../../../../components/Spacer'

import useFarms from '../../../../hooks/useFarms'
import BigNumber from 'bignumber.js'

import {Farm} from '../../../../contexts/Farms'

import useAllStakedValue, {
  StakedValue,
} from '../../../../hooks/useAllStakedValue'

import {BASIC_TOKEN} from '../../../../constants/config';
import {
  notETHPairPools, unStakeOnlyPools, hiddenPools, doublePools,
  waitingInfo
} from '../../../../sushi/lib/constants';
import sashimiLog from '../../../../assets/img/logo_sashimi.png';

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber,
  allocPoint: BigNumber
  totalAllocPoint: BigNumber
}

const SashimiLogo = () => (
  <StyledLogo src={sashimiLog} />
)

function setFarmRows(farmRows: FarmWithStakedValue[][], rowsValue: FarmWithStakedValue): void {
  if (farmRows[farmRows.length - 1].length === 3) {
    farmRows.push([rowsValue])
  } else {
    farmRows[farmRows.length - 1].push(rowsValue)
  }
}

const StyledLogo = styled.img`
  height: 16px;
  margin-top: -4px;
  margin-right: 2px;
`

let burnPoolPercent: BigNumber = new BigNumber(0);
const {
  waitingPool,
  startTime
} = waitingInfo;
const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const {account} = useWallet()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({tokenSymbol}) => tokenSymbol === BASIC_TOKEN,
  )

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SASHIMI_PER_BLOCK = new BigNumber(100)

  let ethValueInSashimiNoWeight = new BigNumber(0);
  const unStakeOnlyPoolsRows: FarmWithStakedValue[][] = [[]];
  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const newFarmRows = [...farmRows]
      // Do not show burn pool
      if (farm.pid === 11) {
        if (stakedValue[i] && !stakedValue[i].totalAllocPoint.isEqualTo(0)) {
          burnPoolPercent = stakedValue[i].allocPoint.div(stakedValue[i].totalAllocPoint);
        }
        return newFarmRows;
      }

      // No hidden Pool
      if (hiddenPools.includes(farm.pid) || doublePools.includes(farm.pid)) {
        return newFarmRows;
      }

      const notETHTokenPair = notETHPairPools.includes(farm.pid);
      // TODO: Better code to get weth value of tokenNotEth-tokenNotEth
      if (stakedValue[i] && !notETHTokenPair ) {
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(stakedValue[i].totalWethValue);
      }

      let stakedValueCurrentTotalWethValue = stakedValue[i] && stakedValue[i].totalWethValue;
      if (stakedValue[i] && notETHTokenPair && stakedValue[i].totalWethValue.toNumber() === 0) {
        stakedValueCurrentTotalWethValue = stakedValue[i].tokenAmount.times(sushiPrice).times(new BigNumber(2)) || new BigNumber(0);
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(stakedValueCurrentTotalWethValue);
      }

      let farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
            .times(SASHIMI_PER_BLOCK)
            .times(BLOCKS_PER_YEAR)
            .times(stakedValue[i].poolWeight)
            .div(stakedValueCurrentTotalWethValue.isNaN() || stakedValueCurrentTotalWethValue.eq(0)
              ? new BigNumber(0.01) : stakedValueCurrentTotalWethValue)
          : null,
      }

      if (unStakeOnlyPools.includes(farm.pid)) {
        setFarmRows(unStakeOnlyPoolsRows, farmWithStakedValue);
        return newFarmRows;
      }

      setFarmRows(newFarmRows, farmWithStakedValue);
      return newFarmRows
    },
    [[]],
  )

  function getStyleRow(farmRow: FarmWithStakedValue[], i: number, unStakeOnly?: boolean) {
    return <StyledRow key={`${Math.random()}${i}`}>
      {farmRow.map((farm, j) => (
        <React.Fragment key={`${farm.id}${j}`}>
          <FarmCard farm={farm} unStakeOnly={unStakeOnly}/>
          {(j === 0 || j === 1) && <StyledSpacer/>}
        </React.Fragment>
      ))}
    </StyledRow>;
  }

  return (
    <StyledCards>
      <ValueETH>&nbsp;</ValueETH>
      {!!rows[0].length ? rows.map((farmRow, i) => getStyleRow(farmRow, i, false))
      : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..."/>
        </StyledLoadingWrapper>
      )}

      <Line />
      <ValueETH>Pools with no profit of sashimi temporarily</ValueETH>

      {!!unStakeOnlyPoolsRows[0].length && (
        unStakeOnlyPoolsRows.map((farmRow, i) => getStyleRow(farmRow, i, true))
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue,
  unStakeOnly?: Boolean
}

const FarmCard: React.FC<FarmCardProps> = ({farm, unStakeOnly = false}) => {

  const renderer = (countdownProps: CountdownRenderProps) => {
    const {hours, minutes, seconds, days} = countdownProps;
    const hoursTemp = hours + days * 24;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hoursTemp < 10 ? `0${hoursTemp}` : hoursTemp
    return (
      <span style={{width: '100%'}}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  let poolActive = true // startTime * 1000 - Date.now() <= 0
  if (waitingPool.includes(farm.pid)) {
    poolActive = startTime - Date.now() <= 0;
  }

  let farmApy: any;
  if (farm.apy && farm.apy.isNaN()) {
    farmApy = '- %';
  } else {
    farmApy = farm.apy
      ? `${farm.apy
        .times(new BigNumber(100))
        .toNumber()
        .toLocaleString('en-US')
        .slice(0, -1) || '-'}%`
      : 'Loading ...';
  }

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'SASHIMI' && <StyledCardAccent/>}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>
            <Spacer/>
            <ButtonContainer>
              <Col span={11}>
                <Button
                  size="large"
                  type="primary"
                  disabled={!poolActive}
                  block
                >
                  <Link to={`/farms/${farm.id}`}>
                    {
                      poolActive ? 'Select' : (
                        <Countdown
                          date={new Date(startTime)}
                          renderer={renderer}
                        />
                      )
                    }
                  </Link>
                </Button>
              </Col>
              <Col span={11} offset={2}>
                {farm.isSashimiPlate ? <Button
                    size="large"
                    type="primary"
                    href="/vault"
                    target="_blank"
                    block
                  >
                    <SashimiLogo /> GET SV
                  </Button> :  <Button
                    size="large"
                    type="primary"
                    href={`https://info.sashimi.cool/pair/${farm.lpTokenAddress}`}
                    target="_blank"
                    block
                  >
                    <SashimiLogo /> GET LP
                  </Button>}
              </Col>
            </ButtonContainer>
            <StyledDivider />
            <StyledInsight>
              <span>APY</span>
              <span>
                {farmApy}
              </span>
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const ValueETH = styled.div`
  color: #aa9585;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
`

const Line = styled.div`
    border-bottom: 1px solid #aa9585;
    width: 100%;
    height: 1px;
    opacity: 0.3;
    margin: 32px 0 16px 0;
`

const ButtonContainer = styled(Row)`
  width: 100%;
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: 0;
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

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
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

const StyledDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom:  7px;
`

export default FarmCards
